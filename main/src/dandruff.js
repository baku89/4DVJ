/* global THREE, Kontrol, app */

// import _ from 'lodash'
import {Noise} from 'noisejs'
const noise = new Noise(Math.random())

export default class Dandruff extends THREE.Object3D {

	constructor(parameters) {
		super()

		this.projector4d = parameters.projector4d

		this.uniforms = {
			matrix4d: {type: 'm4', value: this.projector4d.matrix},
			distance4d: {type: 'v2', value: this.projector4d.distance},
		}

		{
			let geometry = window.assets.dandruff_small_obj.children[0].geometry

			// generate 4D

			// let xmin = Number.MAX_VALUE
			// let xmax = Number.MIN_VALUE
			// let ymin = Number.MAX_VALUE
			// let ymax = Number.MIN_VALUE
			// let zmin = Number.MAX_VALUE
			// let zmax = Number.MIN_VALUE
			// let wmin = Number.MAX_VALUE
			// let wmax = Number.MIN_VALUE

			{
				let positionWBuffer = new Float32Array(geometry.attributes.position.count)
				let scale = 0.04
				let waveScale = 0.5
				let waveAmp = 4
				let position = geometry.attributes.position.array

				for (let i = 0; i < positionWBuffer.length; i++) {
					let x = position[i * 3]
					let y = position[i * 3 + 1]
					let z = position[i * 3 + 2]
					let w = noise.perlin3(x * scale, y * scale, z * scale)
					w = w * 70

					let nx = x + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let ny = y + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let nz = z + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let nw = w + noise.perlin3(z * waveScale, y * waveScale, (w + 1000) * waveScale) * waveAmp

					// xmin = Math.min(nx, xmin)
					// xmax = Math.max(ny, xmax)
					// ymin = Math.min(nz, ymin)
					// ymax = Math.max(nx, ymax)
					// zmin = Math.min(ny, zmin)
					// zmax = Math.max(nz, zmax)
					// wmin = Math.min(nw, wmin)
					// wmax = Math.max(nw, wmax)

					position[i * 3] 	   = nx
					position[i * 3 + 1]  = ny
					position[i * 3 + 2]  = nz
					positionWBuffer[i] = nw
				}
				// console.log(xmin, xmax)
				// console.log(ymin, ymax)
				// console.log(zmin, zmax)
				// console.log(wmin, wmax)

				let uv = geometry.attributes.uv
				for (let i = 0; i < uv.count; i++) {
					uv.array[i * 2 + 1] *= -1
				}
				uv.needsUpdate = true

				geometry.addAttribute('positionW', new THREE.BufferAttribute(positionWBuffer, 1))
			}

			// create material
			let material = new THREE.ShaderMaterial({
				uniforms: {
					matrix4d: {type: 'm4', value: this.projector4d.matrix},
					distance4d: {type: 'v2', value: this.projector4d.distance},
					time: {type: 'f', value: 0},
					wiggleAmp: {type: 'f', value: 0.7},
					wiggleIntensity: {type: 'f', value: 0},
					texture: {type: 't', value: null}
				},
				side: THREE.DoubleSide,
				blendEquation: THREE.MaxEquation,
				// wireframe: true,
				vertexShader: require('./shaders/dandruff-small.vert'),
				fragmentShader: require('./shaders/dandruff.frag')
			})

			this.small = new THREE.Mesh(geometry, material)
			this.small.scale.set(3, 3, 3)
			this.add(this.small)
		}

		{
			let geometry = window.assets.dandruff_large_obj.children[0].geometry
			let material = new THREE.ShaderMaterial({
				uniforms: {
					time: {type: 'f', value: 0},
					wiggleAmp: {type: 'f', value: 0.7},
					wiggleIntensity: {type: 'f', value: 0},
					texture: {type: 't', value: null}
				},
				side: THREE.DoubleSide,
				blendEquation: THREE.MaxEquation,
				// wireframe: true,
				vertexShader: require('./shaders/dandruff-large.vert'),
				fragmentShader: require('./shaders/dandruff.frag')
			})

			let uv = geometry.attributes.uv
			for (let i = 0; i < uv.count; i++) {
				uv.array[i * 2 + 1] *= -1
			}
			uv.needsUpdate = true

			this.large = new THREE.Mesh(geometry, material)
			this.large.scale.set(0.5, 0.5, 0.5)
			this.add(this.large)
		}

		app.ui.polygonCount.on('change', (value) => {
			this.small.geometry.drawRange.count = Math.floor(value * this.small.geometry.attributes.position.count)
			this.large.geometry.drawRange.count = Math.floor(value * this.large.geometry.attributes.position.count)
		})

		

		this.wiggleEnabled = false
		Kontrol.on('enableDandruffWiggle', () => {
			this.wiggleEnabled = !this.wiggleEnabled
		})

		this.smallTexture = window.assets.dandruff_small_tex
		Kontrol.on('toggleDandruffTexture', () => {
			// console.log('toggle')
			let textureEnabled = this.small.material.uniforms.texture.value != null
			this.small.material.uniforms.texture.value = textureEnabled ? null : this.smallTexture
			this.large.material.uniforms.texture.value = textureEnabled ? null : this.smallTexture
		})
	}

	update(elapsed) {
		this.small.material.uniforms.wiggleIntensity.value = this.wiggleEnabled ? 1 : 0
		this.small.material.uniforms.time.value += elapsed
		this.large.material.uniforms.wiggleIntensity.value = this.wiggleEnabled ? 1 : 0
		this.large.material.uniforms.time.value += elapsed
	}

}
