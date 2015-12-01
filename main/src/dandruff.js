/* global THREE, Kontrol */

import _ from 'lodash'
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
			let geometry = window.loader.dandruff_small_obj.children[0].geometry

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
					let x = position[i*3]
					let y = position[i*3 + 1]
					let z = position[i*3 + 2]
					let w = noise.perlin3(x * scale, y * scale, z * scale)
					w = w * 70

					let nx = x + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let ny = y + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let nz = z + noise.perlin3(x * waveScale, y * waveScale, z * waveScale) * waveAmp
					let nw = w + noise.perlin3(z * waveScale, y * waveScale, (w+1000) * waveScale) * waveAmp

					// xmin = Math.min(nx, xmin)
					// xmax = Math.max(ny, xmax)
					// ymin = Math.min(nz, ymin)
					// ymax = Math.max(nx, ymax)
					// zmin = Math.min(ny, zmin)
					// zmax = Math.max(nz, zmax)
					// wmin = Math.min(nw, wmin)
					// wmax = Math.max(nw, wmax)

					position[i*3] 	   = nx
					position[i*3 + 1]  = ny
					position[i*3 + 2]  = nz
					positionWBuffer[i] = nw
				}
				// console.log(xmin, xmax)
				// console.log(ymin, ymax)
				// console.log(zmin, zmax)
				// console.log(wmin, wmax)

				let uv = geometry.attributes.uv
				for (let i = 0; i < uv.count; i++) {
					uv.array[i*2 + 1] *= -1
				}
				console.log(uv)
				uv.needsUpdate = true

				console.log(geometry)
				geometry.addAttribute('positionW', new THREE.BufferAttribute(positionWBuffer, 1))
			}

			// create material
			let material = new THREE.ShaderMaterial({
				uniforms: {
					matrix4d: {type: 'm4', value: this.projector4d.matrix},
					distance4d: {type: 'v2', value: this.projector4d.distance},
					// texture: {type: 't', value: window.loader.dandruff_small_tex}
				},
				side: THREE.DoubleSide,
				blendEquation: THREE.MaxEquation,
				vertexShader: require('./shaders/dandruff.vert'),
				fragmentShader: require('./shaders/dandruff.frag')
			})

			this.small = new THREE.Mesh(geometry, material)
			this.small.scale.set(3, 3, 3)
			this.add(this.small)
		}
	}

	update(elapsed) {

	}

}
