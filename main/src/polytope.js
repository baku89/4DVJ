/* global THREE */
import Graph from './graph.js'
import Projector4D from './projector4d.js'
import {Noise} from 'noisejs'
const noise = new Noise(Math.random())


export default class Polytope extends THREE.Object3D {

	constructor(graph, parameters) {
		super()

		this.graph = new Graph(graph)

		this.projector4d = parameters.projector4d || new Projector4D()

		this.uniforms = {
			matrix4d: {type: 'm4', value: this.projector4d.matrix},
			distance4d: {type: 'v2', value: this.projector4d.distance},
			surfaceColor: {type: 'c', value: new THREE.Color(0xff2299)},
			opacity: {type: 'f', value: 0.8}
		}

		this.geometry = new THREE.BufferGeometry()
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			side: THREE.DoubleSide,
			transparent: true,
			wireframe: true,
			// depthTest: false,
			// depthWrite: false,
			blendEquation: THREE.MaxEquation,

			vertexShader: require('./shaders/polytope.vert'),
			fragmentShader: require('./shaders/polytope.frag')
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)

		// generate custom attribute
		this.generateVertexColor()

		this.subdivide(parameters.subdivision || 5)

		this.add(this.mesh)
	}

	mapRange(value, low1, high1, low2, high2) {
		return low2 + (high2 - low2) * (value - low1) / (high1 - low1)
	}

	generateVertexColor() {
		let scale = 8
		this.vertexColors = this.graph.vertices.map((vertex) => {
			let r = noise.perlin2(vertex.x * scale, vertex.y * scale)
			let g = noise.perlin2(vertex.z * scale, vertex.w * scale)
			let b = noise.perlin2(vertex.y * scale, vertex.x * scale)

			r = Math.sin(r * Math.PI / 2)
			g = Math.sin(g * Math.PI / 2)
			b = Math.sin(b * Math.PI / 2)

			r = r / 2 + 0.5
			g = g / 2 + 0.5
			b = b / 2 + 0.5

			r = Math.pow(r, 0.65)
			// g = Math.pow(g, 0) 
			b = Math.pow(b, 0.75)

			// b = mapRange(r, )

			return new THREE.Vector3(r, g, b)
		})
	}

	subdivide(subdivision) {
		this.subdivision = subdivision

		let vertices = []	// array of THREE.Vector4
		let vertexColors  = [] // array of THREE.Vector3
		let faces = []	// array of THREE.Face3

		let v0, v1, v2 = null
		let eu = new THREE.Vector4(),
			ev = new THREE.Vector4()
		let c0, c1, c2 = null
		let ceu = new THREE.Vector3(),
			cev = new THREE.Vector3()

		//subdivide each faces

		this.graph.faces.forEach((face) => {

			let offset = vertices.length
			
			// calc basis vectors
			v0 = this.graph.vertices[face[0]]
			v1 = this.graph.vertices[face[1]]
			v2 = this.graph.vertices[face[2]]

			ev.subVectors(v1, v0)
			ev.divideScalar(subdivision)
			eu.subVectors(v2, v0)
			eu.divideScalar(subdivision)

			c0 = this.vertexColors[face[0]]
			c1 = this.vertexColors[face[1]]
			c2 = this.vertexColors[face[2]]

			cev.subVectors(c1, c0)
			cev.divideScalar(subdivision)
			ceu.subVectors(c2, c0)
			ceu.divideScalar(subdivision)

			// j = sum of eu, uv
			for (let j = 0; j <= subdivision; j++) {
				for (let v = j; v >= 0; v--) {
					let u = j - v

					// add new vertex
					let nv = v0.clone()
					nv.add(ev.clone().multiplyScalar(v))
					nv.add(eu.clone().multiplyScalar(u))
					vertices.push(nv)

					let nc = c0.clone()
					nc.add(cev.clone().multiplyScalar(v))
					nc.add(ceu.clone().multiplyScalar(u))
					vertexColors.push(nc)

					// add polygon
					if (j < subdivision) {
						let fa = offset + j * (j + 1) / 2 + u
						let fb = fa + 1
						let fc = offset + (j + 1) * (j + 2) / 2 + u
						let fd = fc + 1

						// type '△'
						faces.push(new THREE.Face3(fa, fc, fd))

						// type '▽'
						if (v > 0) {
							faces.push(new THREE.Face3(fd, fb, fa))
						}
					}
				}
			}
		})

		let positionArray = []
		let positionWArray = []
		vertices.forEach((vertex) => {
			positionArray.push(vertex.x, vertex.y, vertex.z)
			positionWArray.push(vertex.w)
		})

		let colorArray = []
		vertexColors.forEach((color) => {
			// console.log(color)
			colorArray.push(color.x, color.y, color.z)
		})

		let indexArray = []
		faces.forEach((face) => {
			indexArray.push(face.a, face.b, face.c)
		})

		let positionBuffer = new Float32Array(positionArray)
		let positionWBuffer = new Float32Array(positionWArray)
		let colorBuffer  = new Float32Array(colorArray)
		let indexBuffer 	 = new Uint32Array(indexArray)

		this.geometry.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3))
		this.geometry.addAttribute('positionW', new THREE.BufferAttribute(positionWBuffer, 1))
		this.geometry.addAttribute('color', new THREE.BufferAttribute(colorBuffer, 3))
		this.geometry.setIndex(new THREE.BufferAttribute(indexBuffer, 3))
	}
}
