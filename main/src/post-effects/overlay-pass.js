/* global THREE, app */

import _ from 'lodash'

export default class OverlayPass extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2()},
				flash: {type: 't', value: null},
				flicker: {type: 't', value: null},
				flickerEnabled: {type: 'f', value: 0},
				tDiffuse: {type: 't', value: null}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/overlay.frag'),
		})
		this.enabled = true

		{
			this.flashVideo = window.assets.overlay_flash
			this.flashVideo.width = this.flashVideo.videoWidth
			this.flashVideo.height = this.flashVideo.videoHeight
			// this.flashVideo.defaultPlaybackRate = 0.5
			this.flashVideo.currentTime = this.flashVideo.duration - 0.05

			this.flashTexture = new THREE.VideoTexture(this.flashVideo)
			this.flashTexture.minFilter = THREE.LinearFilter
			this.flashTexture.magFilter = THREE.LinearFilter
			this.flashTexture.format = THREE.RGBFormat
			this.uniforms.flash.value = this.flashTexture

			this.flashRequestId = null
			app.ui.flash.on('change', this.overlayAttack.bind(this))
		}

		{
			this.flickerVideo = window.assets.overlay_flicker
			this.flickerVideo.width = this.flickerVideo.videoWidth
			this.flickerVideo.height = this.flickerVideo.videoHeight
			this.flickerVideo.loop = true
			// this.flickerVideo.play()

			this.flickerTexture = new THREE.VideoTexture(this.flickerVideo)
			this.flickerTexture.minFilter = THREE.NearestFilter
			this.flickerTexture.magFilter = THREE.NearestFilter
			this.flickerTexture.format = THREE.RGBFormat
			this.uniforms.flicker.value = this.flickerTexture

			this.flickerVideoEnabled = false
			app.ui.flicker.on('change', (value) => {
				this.flickerVideoEnabled = value
				if (this.flickerVideoEnabled) {
					this.flickerVideo.play()
				} else {
					this.flickerVideo.pause()
					this.flickerVideo.currentTime = 0
				}
			})
		}

		app.on('resize', this.onResize.bind(this))
	}

	onResize(width, height) { 
		// console.log('overlay.resize')
		this.uniforms.resolution.value.set(width, height)
	}

	overlayAttack() {
		let index = _.random(0, 2)
		this.flashIndex = (this.flashIndex <= index) ? index + 1 : index
		// console.log('overlayAttack', this.flashIndex)
		this.flashVideo.currentTime = this.flashIndex * 3.0
		this.flashVideo.play()
		clearTimeout(this.flashRequestId)
		this.flashRequestId = setTimeout(() => {
			this.flashVideo.pause()
			this.flashRequestId = null
		}, 2850)
	}



	update() {
		if (this.flashRequestId != null) {
			this.flashTexture.needsUpdate = true
		}

		if (this.flickerEnabled) {
			this.flickerVideo.needsUpdate = true
		}
		
	}
}

