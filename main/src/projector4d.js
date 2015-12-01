/* global THREE, Kontrol, GUI */

import {lerp} from 'interpolation'
import _ from 'lodash'
import radians from 'degrees-radians'

export default class Projector4D {

	constructor() {
		this.distance = new THREE.Vector2(1, 0)
		this.vibratingDistance = 1
		this.distanceTarget = 1
		this.distanceInfluence = 0
		this.baseDistance = 1

		this.translate = new THREE.Vector4()
		this.quaternion = new THREE.Quaternion()
		this.matrix = new THREE.Matrix4()

		Kontrol.on('changeDistance4d', (value) => {
			this.distanceTarget = value * 3
		})
		Kontrol.on('changeDistance4dInfluence', (value) => {
			this.distanceInfluence = value
		})

		this.rotateAxis = new THREE.Vector3(1, 0, 0)
		this.rotateBase = new THREE.Quaternion()
		this.rotate = new THREE.Quaternion()
		Kontrol.on('changeRotate', this.changeRotate.bind(this))
	}

	changeRotate(value) {
		let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		let angle = lerp(0.7, 1.3, Math.random()) * Math.PI
		this.rotateAxis.applyAxisAngle(axis, angle)
		this.rotateAxis.normalize()
		this.rotate.setFromAxisAngle(this.rotateAxis, radians(8))
		this.rotateBase.setFromAxisAngle(this.rotateAxis, radians(1))
	}

	update(elapsed) {

		this.vibratingDistance =  lerp(this.vibratingDistance, this.distanceTarget, 0.1)
		this.distance.x = lerp(this.baseDistance, this.vibratingDistance, this.distanceInfluence)
		this.updateMatrix()

		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.quaternion.multiply(this.rotate)
		this.rotate.slerp(this.rotateBase, 0.1)

		// console.log(this.distance.x)
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
