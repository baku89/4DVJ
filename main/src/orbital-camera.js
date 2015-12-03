/* global THREE, Kontrol */

import _ from 'lodash'
import {lerp} from 'interpolation'
import radians from 'degrees-radians'
import Config from './config'


const MAGNIFY_Z = 0.5
const NORMAL_Z = 3

const NORMAL_FOV = 40//55
const MAGNIFY_FOV = 90

const DOLLY_FAR_Z = 5

export default class OrbitalCamera extends THREE.Object3D {

	constructor() {
		super()

		// rotate
		this.rotate = new THREE.Quaternion()
		this.rotateMultiplied = new THREE.Quaternion()
		this.rotateZero = new THREE.Quaternion()
		this.rotateSpeed = Config.INIT_ROTATE_SPEED

		this.changeRotate()
		Kontrol.on('changeRotate', this.changeRotate.bind(this))

		Kontrol.on('changeRotateSpeed', (value) => {
			this.rotateSpeed = lerp(0.1, 1, value)
		})

		// camera settings
		this.camera = new THREE.PerspectiveCamera(60, Config.RENDER_WIDTH / Config.RENDER_HEIGHT, .1, 1000)
		this.camera.position.set(0, 0, NORMAL_Z)
		this.isMagnify = false

		this.dolly = new THREE.Object3D()
		this.dolly.position.set(0, 0, DOLLY_FAR_Z)

		this.dolly.add(this.camera)
		this.add(this.dolly)

		this.targetDollyZ = this.dolly.position.z
		this.dollyLerp = Config.DOLLY_SLIDER_LERP

		Kontrol.on('changeDistance', (value) => {
			this.targetDollyZ = lerp(0, DOLLY_FAR_Z, value)
			this.dollyLerp = Config.DOLLY_SLIDER_LERP
		})

		Kontrol.on('forceDollyOut', () => {
			this.targetDollyZ = 3
			this.dollyLerp = Config.DOLLY_OUT_LERP
		})

		Kontrol.on('forceDollyIn', () => {
			this.targetDollyZ = 0
			this.dollyLerp = Config.DOLLY_IN_LERP
		})

		// magnify
		Kontrol.on('magnifyCamera', () => {
			this.isMagnify = true
		})

		Kontrol.on('unmagnifyCamera', () => {
			this.isMagnify = false
		})

		Kontrol.on('toggleMagnifyCamera', () => {
			this.isMagnify = !this.isMagnify
		})
	}

	changeRotate() {
		let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		this.rotate.setFromAxisAngle(axis, _.random(.5, 1, true) * radians(2))
	}

	update() {
		// rotate
		this.rotateMultiplied.copy(this.rotateZero)
		this.rotateMultiplied.slerp(this.rotate, this.rotateSpeed)
		this.quaternion.multiply(this.rotateMultiplied)

		// camera z (magnify)
		let lerpIntensity = this.isMagnify ? 0.4 : 0.03
		let targetZ = this.isMagnify ? MAGNIFY_Z : NORMAL_Z
		this.camera.position.z = lerp(this.camera.position.z, targetZ, lerpIntensity)

		// fov
		let targetFov = this.isMagnify ? MAGNIFY_FOV : NORMAL_FOV
		this.camera.fov = lerp(this.camera.fov, targetFov, lerpIntensity)
		this.camera.updateProjectionMatrix()

		// doply z
		this.dolly.position.z = lerp(this.dolly.position.z, this.targetDollyZ, this.dollyLerp)

	}
}
