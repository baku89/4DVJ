/* global THREE */

export default class OverlayPass extends THREE.ShaderPass {

	constructor() {
		super({
			uniforms: {
				// resolution: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
				tDiffuse: {type: 't', value: null} 
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/overlay.frag'),
		})
		this.enabled = true

		this.video = document.createElement('video')
		this.video.src = 'textures/overlay_'
	}
}
