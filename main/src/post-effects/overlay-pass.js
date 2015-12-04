/* global THREE, Kontrol, app */

import _ from 'lodash'

export default class OverlayPass extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2()},
				attack: {type: 't', value: null},
				zfighting: {type: 't', value: null},
				zfightingEnabled: {type: 'f', value: 0},
				tDiffuse: {type: 't', value: null}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/overlay.frag'),
		})
		this.enabled = true

		{
			this.attackVideo = window.assets.overlay_attack
			this.attackVideo.width = this.attackVideo.videoWidth
			this.attackVideo.height = this.attackVideo.videoHeight
			// this.attackVideo.defaultPlaybackRate = 0.5
			this.attackVideo.currentTime = this.attackVideo.duration - 0.05

			this.attackTexture = new THREE.VideoTexture(this.attackVideo)
			this.attackTexture.minFilter = THREE.LinearFilter
			this.attackTexture.magFilter = THREE.LinearFilter
			this.attackTexture.format = THREE.RGBFormat
			this.uniforms.attack.value = this.attackTexture

			this.attackRequestId = null
			Kontrol.on('overlayAttack', this.overlayAttack.bind(this))
		}

		{
			this.zfightingVideo = window.assets.overlay_zfighting
			this.zfightingVideo.width = this.zfightingVideo.videoWidth
			this.zfightingVideo.height = this.zfightingVideo.videoHeight
			this.zfightingVideo.loop = true
			// this.zfightingVideo.play()

			this.zfightingTexture = new THREE.VideoTexture(this.zfightingVideo)
			this.zfightingTexture.minFilter = THREE.NearestFilter
			this.zfightingTexture.magFilter = THREE.NearestFilter
			this.zfightingTexture.format = THREE.RGBFormat
			this.uniforms.zfighting.value = this.zfightingTexture

			this.zfightingVideoEnabled = false
			Kontrol.on('toggleZfighting', () => {
				this.zfightingVideoEnabled = !this.zfightingVideoEnabled
				if (this.zfightingVideoEnabled) {
					this.zfightingVideo.play()
				} else {
					this.zfightingVideo.pause()
					this.zfightingVideo.currentTime = 0
				}
			})
		}

		app.on('resize', this.onResize.bind(this))
	}

	onResize(width, height) { 
		console.log('overlay resize')
		this.uniforms.resolution.value.set(width, height)
	}

	overlayAttack() {
		let index = _.random(0, 2)
		this.attackIndex = (this.attackIndex <= index) ? index + 1 : index
		// console.log('overlayAttack', this.attackIndex)
		this.attackVideo.currentTime = this.attackIndex * 3.0
		this.attackVideo.play()
		clearTimeout(this.attackRequestId)
		this.attackRequestId = setTimeout(() => {
			this.attackVideo.pause()
			this.attackRequestId = null
		}, 2850)
	}



	update() {
		if (this.attackRequestId != null) {
			this.attackTexture.needsUpdate = true
		}

		if (this.zfightingEnabled) {
			this.zfightingVideo.needsUpdate = true
		}
		
	}
}

