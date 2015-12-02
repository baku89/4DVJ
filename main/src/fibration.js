/* global THREE, GUI, Kontrol */

export default class Fibration extends THREE.Line {

	constructor(parameters) {

		let geometry = new THREE.BufferGeometry()
		let vertices = []

		let division = 100

		for (let i = 0; i <= division; i++) {
			let angle = (i / division) * (Math.PI * 2)
			let x = Math.cos(angle) * 1.1
			let y = Math.sin(angle) * 1.1
			vertices.push(new THREE.Vector3(x, y, x))
		}

		let positionBuffer = new Float32Array(vertices.length * 3)
		vertices.forEach((vertex, i) => {
			positionBuffer[i*3] = vertex.x
			positionBuffer[i*3 + 1] = vertex.y
			positionBuffer[i*3 + 2] = vertex.z
		})

		geometry.addAttribute('position', new THREE.BufferAttribute(positionBuffer, 3))

		let material = new THREE.ShaderMaterial({
			uniforms: {
				matrix4d: 			{type: 'm4', value: null},
				localMatrix4d: 	{type: 'm4', value: null},
				translate4d: 		{type: 'v4', value: null},
				ringMatrix4d: 	{type: 'm4', value: null},
				distance4d: 		{type: 'v2', value: null},
				color: 					{type: 'c', value: null}
			},
			linewidth: 1.5,
			vertexShader: require('./shaders/fibration.vert'),
			fragmentShader: require('./shaders/fibration.frag')
		})

		super(geometry, material)

		this.projector4d = parameters.projector4d
		this.color = new THREE.Color(parameters.color)
		this.localMatrix4d = this.eulerToMatrix4d(parameters.localEuler4d)
		this.translate4d = parameters.translate4d
		this.ringMatrix4d = this.eulerToMatrix4d(parameters.ringEuler4d)

		this.material.uniforms.matrix4d.value = this.projector4d.matrix
		this.material.uniforms.localMatrix4d.value = this.localMatrix4d
		this.material.uniforms.translate4d.value = this.translate4d
		this.material.uniforms.ringMatrix4d.value = this.ringMatrix4d
		this.material.uniforms.distance4d.value = this.projector4d.distance
		this.material.uniforms.color.value = this.color

		// this.scale.set(2, 2, 2)
	}

	eulerToMatrix4d(euler4d) {
		let c, s

		c = Math.cos( euler4d.x )
		s = Math.sin( euler4d.x )
		let Rxw = new THREE.Matrix4()
		Rxw.set(
			c, 0, 0,-s,
			0, 1, 0, 0,
			0, 0, 1, 0,
			s, 0, 0, c
		)

		c = Math.cos( euler4d.y )
		s = Math.sin( euler4d.y )
		let Ryw = new THREE.Matrix4()
		Ryw.set(
			1, 0, 0, 0,
			0, c, 0,-s,
			0, 0, 1, 0,
			0, s, 0, c
		)

		c = Math.cos( euler4d.z )
		s = Math.sin( euler4d.z )
		let Rzw = new THREE.Matrix4()
		Rzw.set(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, c,-s,
			0, 0, s, c
		)

		let matrix4d = new THREE.Matrix4()
		matrix4d.multiplyMatrices( Ryw, Rxw )
		matrix4d.multiplyMatrices( Rzw, matrix4d)
		return matrix4d
	}

	update(elapsed) {

	}
}
