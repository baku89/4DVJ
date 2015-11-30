/* global THREE */

export default class CompositePass extends THREE.ShaderPass {
	constructor() {
		super({
			uniforms: {
				resolution: {type: 'v2', value: new THREE.Vector2(window.innerWidth, window.innerHeight)},
				tDiffuse: {type: 't', value: null}
			},
			vertexShader: require('../shaders/basic-transform.vert'),
			fragmentShader: require('../shaders/composite.frag'),
		})
		this.enabled = false
	}
}
