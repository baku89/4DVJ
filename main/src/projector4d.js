/* global THREE, app */

import {lerp} from 'interpolation'
import _ from 'lodash'
import radians from 'degrees-radians'
// import Config from './config'

const MAX_DISTNACE = 5

export default class Projector4D {

	constructor() {

		this.translate = new THREE.Vector4()
		this.quaternion = new THREE.Quaternion()
		this.matrix = new THREE.Matrix4()

		// distance
		this.distance = new THREE.Vector2(MAX_DISTNACE, 0)

		app.ui.distance.on('change', (value) => {
			this.distance.x = lerp(1.0, MAX_DISTNACE, Math.pow(value, 3))
		})

		// rotate
		this.rotateAxis = new THREE.Vector3(1, 0, 0)
		this.rotateBase = new THREE.Quaternion()
		this.rotate = new THREE.Quaternion()
		this.rotateMultiplied = new THREE.Quaternion()
		this.rotateZero = new THREE.Quaternion()
		this.rotateSpeedLerp = 0.1
		this.changeRotate(1)

		app.ui.rotation.on('change', this.changeRotate.bind(this))
		// this.rotateSpeed = Config.INIT_ROTATE_SPEED
		// this.targetRotateSpeed = Config.INIT_ROTATE_SPEED
		app.ui.rotateSpeed.on('change', (value) => {
			this.rotateSpeed = lerp(0.04, 1, value)
		})
	}

	changeRotate() {
		let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		let angle = lerp(0.7, 1.3, Math.random()) * Math.PI
		this.rotateAxis.applyAxisAngle(axis, angle)
		this.rotateAxis.normalize()
		this.rotate.setFromAxisAngle(this.rotateAxis, radians(12))
		this.rotateBase.setFromAxisAngle(this.rotateAxis, radians(2))
	}

	update() {

		this.updateMatrix()

		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.rotateMultiplied.copy(this.rotateZero)
		this.rotateMultiplied.slerp(this.rotate, this.rotateSpeed)
		this.quaternion.multiply(this.rotateMultiplied)
		this.rotate.slerp(this.rotateBase, this.rotateSpeedLerp)
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

		// normalize
		// let e = this.matrix.elements

		// for (let i = 0; i < 16; i += 4) {
		// 	let length = _.reduce([e[i], e[i + 1], e[i + 2], e[i + 3]], (sum, val) => {
		// 		return val * val
		// 	})
		// 	length = Math.sqrt(length)
		// 	e[i] /= length
		// 	e[i + 1] /= length
		// 	e[i + 2] /= length
		// 	e[i + 3] /= length
		// }

	}

}
