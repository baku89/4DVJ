/* global THREE, Kontrol */

import _ from 'lodash'
import {lerp} from 'interpolation'
import radians from 'degrees-radians'
import Config from './config'

const MAGNIFY_Z = 0.5
const NORMAL_Z = 3

const NORMAL_FOV = 55
const MAGNIFY_FOV = 90

export default class OrbitalCamera extends THREE.Object3D{

	constructor() {
		super()

		// camera
		this.rotateViewVelocity = new THREE.Quaternion()

		// camera settings
		this.camera = new THREE.PerspectiveCamera(60, Config.RENDER_WIDTH / Config.RENDER_HEIGHT, .1, 1000)
		this.camera.position.set(0, 0, NORMAL_Z)
		this.isMagnify = false

		this.add(this.camera)

		Kontrol.on('zoomCamera', (value) => {
			// this.camera.fov = lerp(10, 120, value)
			// console.log(this.camera.fov, value)
			// this.camera.updateProjectionMatrix()
		})

		Kontrol.on('changeRotate', () => {
			let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
			this.rotateViewVelocity.setFromAxisAngle(axis, _.random(.5, 1, true) * radians(0.5))
		})

		Kontrol.on('magnifyCamera', () => {
			this.isMagnify = true
		})

		Kontrol.on('unmagnifyCamera', () => {
			this.isMagnify = false
		})
	}

	update() {
		this.quaternion.multiply(this.rotateViewVelocity)

		let lerpIntensity = this.isMagnify ? 0.4 : 0.03
		let targetZ = this.isMagnify ? MAGNIFY_Z : NORMAL_Z
		this.camera.position.z = lerp(this.camera.position.z, targetZ, lerpIntensity)

		let targetFov = this.isMagnify ? MAGNIFY_FOV : NORMAL_FOV
		this.camera.fov = lerp(this.camera.fov, targetFov, lerpIntensity)
		this.camera.updateProjectionMatrix()

	}
}
