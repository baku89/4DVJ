/* global THREE */
import Graph from './graph.js'
import Projector4D from './projector4d.js'
import {Noise} from 'noisejs'
const noise = new Noise(Math.random())

export default class Polytope extends THREE.Object3D {

	constructor(name, parameters) {
		super()

		this.name = name
		this.graph = new Graph(this.name)

		this.projector4d = parameters.projector4d || new Projector4D()

		this.uniforms = {
			matrix4d: {type: 'm4', value: this.projector4d.matrix},
			distance4d: {type: 'f', value: this.projector4d.distance}
		}

		this.geometry = new THREE.BufferGeometry()
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			side: THREE.DoubleSide,
			transparent: true,
			wireframe: true,

			vertexShader: require('./shaders/polytope.vert'),
			fragmentShader: require('./shaders/polytope.frag')
		})

		this.mesh = new THREE.Mesh(this.geometry, this.material)

		// calc subdivision amplify
		let subdivisionCoef = 0
		this.graph.faces.forEach((face) => {
			subdivisionCoef += face.length - 2
		})

		console.log(subdivisionCoef)
		let subdivision = subdivisionCoef

		this.subdivide(5)//#subdivision)

		let positions = this.geometry.getAttribute('position')
		console.log('Polyhedron:', name, 'vertex=', positions.length / positions.itemSize)

		this.add(this.mesh)
	}

	generateVertexColor() {

	}

	subdivide(subdivision) {
		this.subdivision = subdivision

		let vertices = []	// array of THREE.Vector4
		let faces = []	// array of THREE.Face3

		let v0, v1, v2, v3 = null

		//subdivide each faces
		this.graph.faces.forEach((face, i) => {
			let offset = vertices.length

			switch (face.length) {
				case 3:
					// triangle
					
					// calc basis vectors
					v0 = this.graph.vertices[face[0]]
					v1 = this.graph.vertices[face[1]]
					v2 = this.graph.vertices[face[2]]

					let ev = new THREE.Vector4()
					ev.subVectors(v1, v0)
					ev.divideScalar(subdivision)
					let eu = new THREE.Vector4()
					eu.subVectors(v2, v0)
					eu.divideScalar(subdivision)

					// if ( needGenerateUv ) {
					// 	uv0.set( 0.5, 0 )
					// 	uvV = (new THREE.Vector2( -0.5, 1 )).divideScalar( subdivision )
					// 	uvU = (new THREE.Vector2(  0.5, 1 )).divideScalar( subdivision )
					// }

					// j = sum of eu, uv
					for (let j = 0; j <= subdivision; j++) {
						for (let v = j; v >= 0; v--) {
							let u = j - v

							// add new vertex
							let nv = v0.clone()
							nv.add(ev.clone().multiplyScalar(v))
							nv.add(eu.clone().multiplyScalar(u))
							vertices.push(nv)

							// TODO: add new uv
							// if ( needGenerateUv ) {
							// 	// add new vertex uv
							// 	nuv = new THREE.Vector2();
							// 	nuv.add( uvV.clone().multiplyScalar( v ) );
							// 	nuv.add( uvU.clone().multiplyScalar( u ) );
							// 	scope.uvs.push( nuv );
							// }

							// add polygon
							if (j < subdivision) {
								let fa = offset + j * (j+1) / 2 + u
								let fb = fa + 1
								let fc = offset + (j+1) * (j+2) / 2 + u
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
					break
				case 4:
					// convert to THREE.Vector4
					v0 = this.graph.vertices[face[0]]
					v1 = this.graph.vertices[face[1]]
					v2 = this.graph.vertices[face[2]]
					v3 = this.graph.vertices[face[3]]
			
					// if ( needGenerateUv ) {
					// 	// calc uv basis
					// 	uvV = (new THREE.Vector2( 0, 1 )).divideScalar( subdivision );
					// 	uvU = (new THREE.Vector2( 1, 0 )).divideScalar( subdivision );
					// }
			
					for (let v = 0; v <= subdivision; v++) {
						for (let u = 0; u <= subdivision; u++) {
			
							// calc internal division points of m: v0-v1, n: v3-v2, then nv: m-n
							let m = v0.clone()
							m.lerp(v1, v / subdivision)
			
							let n = v3.clone()
							n.lerp(v2, v / subdivision)
			
							let nv = m.clone()
							nv.lerp(n, u / subdivision)
			
							vertices.push(nv)
			
							// if ( needGenerateUv ) {
							// 	// add new vertex uv
							// 	nuv = new THREE.Vector2();
							// 	nuv.add( uvV.clone().multiplyScalar( v ) );
							// 	nuv.add( uvU.clone().multiplyScalar( u ) );
							// 	scope.uvs.push( nuv );
							// }
							
							// add polygon
							if (u < subdivision && v < subdivision) {
								let fa = offset + (subdivision+1) * v + u
								let fb = fa + 1
								let fc = fa + (subdivision+1)
								let fd = fc + 1
								
								faces.push( new THREE.Face3( fa, fc, fd ) )
								faces.push( new THREE.Face3( fd, fb, fa ) )
							}
						}
					}
					break
			}
		})

		let positionArray = []
		let positionWArray = []

		vertices.forEach((vertex, i) => {
			positionArray.push(vertex.x, vertex.y, vertex.z)
			positionWArray.push(vertex.w)
		})

		let indexArray = []
		faces.forEach((face, i) => {
			indexArray.push(face.a, face.b, face.c)
		})

		let positionBuffer = new Float32Array(positionArray)
		let positionWBuffer = new Float32Array(positionWArray)
		let indexBuffer 	 = new Uint32Array(indexArray)

		this.geometry.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3))
		this.geometry.addAttribute('positionW', new THREE.BufferAttribute(positionWBuffer, 1))
		this.geometry.setIndex(new THREE.BufferAttribute(indexBuffer, 3))
	}
}
