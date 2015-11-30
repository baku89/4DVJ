const THREE = require('three.js')
window.THREE = THREE
const $ = require('jquery')
const _ = require('lodash')
const Kontrol = require('./kontrol')

require('../web_modules/OrbitControls.js')

class App {

	constructor() {
		this.initScene()
		this.initObject()
		this.animate()
	}

	initScene() {
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000)
		this.camera.position.z = 300
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('main')
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)

		this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		let geometry = new THREE.BoxGeometry(100, 100, 100)
		let material = new THREE.ShaderMaterial({
			uniforms: {},
			vertexShader: require('./shaders/basic.vert'),
			fragmentShader: require('./shaders/basic.frag')
		})

		let cube = new THREE.Mesh(geometry, material)
		this.scene.add(cube)

		{
			// generate helper
			this.scene.add(new THREE.GridHelper(1000, 20))
			this.scene.add(new THREE.AxisHelper(200))

		}
	}

	animate() {
		requestAnimationFrame(this.animate.bind(this))
		this.renderer.render(this.scene, this.camera)
	}

	onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	onClick() {
	}
}

window.app = new App()
