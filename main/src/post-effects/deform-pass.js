/* global THREE */

export default class DeformPass extends THREE.ShaderPass {
	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
				intensity: {type: 'f', value: 1.0},
				time: {type: 'f', value: 0.0},
				tDiffuse: {type: 't', value: null}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/deform.frag'),
		})

		this.enabled = true
	}


	update(elapsed) {
		this.uniforms.time.value += elapsed
	}
}
