/* global THREE, Kontrol */

import {lerp} from 'interpolation'
import _ from 'lodash'
import radians from 'degrees-radians'
import Config from './config'

const MAX_DISTNACE = 5

export default class Projector4D {

	constructor() {

		this.translate = new THREE.Vector4()
		this.quaternion = new THREE.Quaternion()
		this.matrix = new THREE.Matrix4()

		// distance

		this.distance = new THREE.Vector2(MAX_DISTNACE, 0)
		this.targetDistance = this.distance.x
		this.distanceLerp = Config.DOLLY_SLIDER_LERP

		Kontrol.on('changeDistance', (value) => {
			this.targetDistance = lerp(1.0, MAX_DISTNACE, value * value * value)
			// console.error(this.targetDistance)
		})

		Kontrol.on('forceDollyOut', () => {
			// console.log('aaaaa')
			this.targetDistance = 1.1
			this.distanceLerp = Config.DOLLY_OUT_LERP
		})

		Kontrol.on('forceDollyIn', () => {
			// console.log('oooo')
			this.targetDistance = 1.0
			this.distanceLerp = Config.DOLLY_IN_LERP
		})

		// rotate

		this.rotateAxis = new THREE.Vector3(1, 0, 0)
		this.rotateBase = new THREE.Quaternion()
		this.rotate = new THREE.Quaternion()
		this.rotateMultiplied = new THREE.Quaternion()
		this.rotateZero = new THREE.Quaternion()
		this.rotateFall = 0.1
		this.changeRotate(1)
		Kontrol.on('changeRotate', this.changeRotate.bind(this))

		this.rotateSpeed = Config.INIT_ROTATE_SPEED
		this.targetRotateSpeed = Config.INIT_ROTATE_SPEED
		Kontrol.on('changeRotateSpeed', (value) => {
			this.targetRotateSpeed = lerp(0.1, 1, value)
			this.rotateFall = lerp(0.1, 0.02, value)
		})
	}

	changeRotate() {
		let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		let angle = lerp(0.7, 1.3, Math.random()) * Math.PI
		this.rotateAxis.applyAxisAngle(axis, angle)
		this.rotateAxis.normalize()
		this.rotate.setFromAxisAngle(this.rotateAxis, radians(4))
		this.rotateBase.setFromAxisAngle(this.rotateAxis, radians(2))
	}

	update() {

		// console.log(this.distanceLerp)
		this.distance.x = lerp(this.distance.x, this.targetDistance, this.distanceLerp)
		this.updateMatrix()

		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.rotateSpeed = lerp(this.rotateSpeed, this.targetRotateSpeed, 0.2)
		this.rotateMultiplied.copy(this.rotateZero)
		this.rotateMultiplied.slerp(this.rotate, this.rotateSpeed)
		this.quaternion.multiply(this.rotateMultiplied)
		this.rotate.slerp(this.rotateBase, this.rotateFall)

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
