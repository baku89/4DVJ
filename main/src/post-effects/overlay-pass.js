/* global THREE, Kontrol */

import _ from 'lodash'
import Config from '../config'

export default class OverlayPass extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2(Config.RENDER_WIDTH, Config.RENDER_HEIGHT)},
				overlay: {type: 't', value: null},
				tDiffuse: {type: 't', value: null}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/overlay.frag'),
		})
		this.enabled = true

		this.video = window.loader.overlay_attack
		this.video.width = this.video.videoWidth
		this.video.height = this.video.videoHeight
		// this.video.defaultPlaybackRate = 0.5
		this.video.currentTime = this.video.duration - 0.05

		this.texture = new THREE.VideoTexture(this.video)
		this.texture.minFilter = THREE.LinearFilter
		this.texture.magFilter = THREE.LinearFilter
		this.texture.format = THREE.RGBFormat
		this.uniforms.overlay.value = this.texture

		this.requestId = null

		// event
		Kontrol.on('overlayAttack', this.overlayAttack.bind(this))
	}

	overlayAttack() {
		let index = _.random(0, 2)
		this.index = (this.index <= index) ? index + 1 : index
		console.log('overlayAttack', this.index)
		this.video.currentTime = this.index * 3.0
		this.video.play()
		clearTimeout(this.requestId)
		this.requestId = setTimeout(() => {
			this.video.pause()
		}, 2800)
	}

	update() {
		this.texture.needsUpdate = true
	}
}

