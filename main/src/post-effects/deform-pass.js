/* global THREE, app */

import {lerp} from 'interpolation'

const EFFECT = {
	none: 0,
	repeat: 1,
	mirrorRight: 2,
	mirrorLeft: 3
}

export default class DeformPass extends THREE.ShaderPass {
	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2()},
				intensity: {type: 'f', value: 1.0},
				time: {type: 'f', value: 0.0},
				turbulanceAmp: {type: 'f', value: 0},
				lensRadius: {type: 'f', value: 150.0},
				lensIntensity: {type: 'f', value: 0.0},
				slitscanIntensity: {type: 'f', value: 0.0},
				effectKind: {type: 'i', value: 0},
				tDiffuse: {type: 't', value: null},
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/deform.frag'),
		})

		this.enabled = true

		// turbulance
		app.ui.turbulance.on('change', () => {
			this.uniforms.turbulanceAmp.value = 150
		})

		// slitscan
		this.targetSlitscanIntensity = 0
		app.ui.slitscan.on('change', (value) => {
			this.slitscanEnabled = value
		})

		// lens
		this.lensRadius = 0
		app.ui.lensRadius.on('change', (value) => {
			this.lensRadius = lerp(200, 800, value)
		})

		app.ui.magnify.on('change', (value) => {
			this.isMagnify = value
		})

		// effects
		app.ui.effectReset.on('change', () => {
			this.uniforms.effectKind.value = EFFECT.none
		})
		app.ui.effectRepeat.on('change', (value) => {
			this.uniforms.effectKind.value = value ? EFFECT.repeat : EFFECT.none
		})
		app.ui.effectMirror.on('change', () => {
			if (this.uniforms.effectKind.value == EFFECT.mirrorRight) {
				this.uniforms.effectKind.value = EFFECT.mirrorLeft
			} else if (this.uniforms.effectKind.value == EFFECT.mirrorLeft) {
				this.uniforms.effectKind.value = EFFECT.mirrorRight
			} else {
				this.uniforms.effectKind.value = Math.random() > .5 ? EFFECT.mirrorRight : EFFECT.mirrorLeft
			}
		})

		app.on('resize', this.onResize.bind(this))

	}

	onResize(width, height) {
		console.log('deformpass.resize')
		this.uniforms.resolution.value.set(width, height)
	}

	update(elapsed) {
		this.uniforms.time.value += elapsed * 10
		this.uniforms.turbulanceAmp.value *= 0.96

		// slitscan
		let slitscanIntensity = this.slitscanEnabled ? 1.0 : 0.0
		this.uniforms.slitscanIntensity.value =
			lerp(this.uniforms.slitscanIntensity.value, slitscanIntensity, this.slitscanEnabled ? 0.7 : 0.3)

		// lens
		let target = this.isMagnify ? 1.0 : 0.0
		this.uniforms.lensIntensity.value = lerp(this.uniforms.lensIntensity.value, target, 0.2)

		let lensRadius = this.isMagnify ? this.lensRadius : this.lensRadius / 2.5
		this.uniforms.lensRadius.value = lerp(this.uniforms.lensRadius.value, lensRadius, 0.2)
	}
}
