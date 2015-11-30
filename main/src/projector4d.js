/* global THREE */

export default class Projector4D {

	constructor() {
		this.distance = 1
		this.translate = new THREE.Vector4()
		this.quaternion = new THREE.Quaternion()
		this.matrix = new THREE.Matrix4()
	}

	updateMatrix() {
		// calc D-W rotation matrix
		let euler = new THREE.Euler()
		euler.setFromQuaternion( this.quaternion, 'XYZ' )

		let c, s

		c = Math.cos( euler.x )
		s = Math.sin( euler.x )
		let Rxw = new THREE.Matrix4()
		Rxw.set(
			c, 0, 0,-s,
			0, 1, 0, 0,
			0, 0, 1, 0,
			s, 0, 0, c
		)

		c = Math.cos( euler.y )
		s = Math.sin( euler.y )
		let Ryw = new THREE.Matrix4()
		Ryw.set(
			1, 0, 0, 0,
			0, c, 0,-s,
			0, 0, 1, 0,
			0, s, 0, c
		)

		c = Math.cos( euler.z )
		s = Math.sin( euler.z )
		let Rzw = new THREE.Matrix4()
		Rzw.set(
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, c,-s,
			0, 0, s, c
		)

		this.matrix.multiplyMatrices( Ryw, Rxw )
		this.matrix.multiplyMatrices( Rzw, this.matrix)
	}

}
