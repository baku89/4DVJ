/* global THREE, Kontrol */

import Config from '../config'

export default class DeformPass extends THREE.ShaderPass {
	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2(Config.RENDER_WIDTH, Config.RENDER_HEIGHT)},
				intensity: {type: 'f', value: 1.0},
				time: {type: 'f', value: 0.0},
				turbulanceAmp: {type: 'f', value: 0},
				radius: {type: 'f', value: 100.0},
				isRepeat: {type: 'i', value: 0},
				tDiffuse: {type: 't', value: null},
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/deform.frag'),
		})

		Kontrol.on('makeTurbulance', this.makeTurbulance.bind(this))
		Kontrol.on('toggleRepeat', this.toggleRepeat.bind(this))

		this.enabled = true
	}

	toggleRepeat() {
		this.uniforms.isRepeat.value = (this.uniforms.isRepeat.value == 0) ? 1 : 0
	}

	makeTurbulance() {
		this.uniforms.turbulanceAmp.value = 150.0
	}

	update(elapsed) {
		this.uniforms.time.value += elapsed * 10

		this.uniforms.turbulanceAmp.value *= 0.96
	}
}
