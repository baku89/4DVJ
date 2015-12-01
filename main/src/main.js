/* global THREE */
import $ from 'jquery'
import _ from 'lodash'

import radians from 'degrees-radians'
import degrees from 'radians-degrees'
import Kontrol from './kontrol'
import PolytopeManager from './polytope-manager'
import Projector4D from './projector4d'
import Ticker from './ticker'
import GUI from './gui'
window.GUI = GUI
window.Kontrol = Kontrol

// TODO: resolve web_modules
import '../web_modules/shaders/CopyShader'
import '../web_modules/shaders/FXAAShader'
import '../web_modules/postprocessing/ShaderPass'
import '../web_modules/postprocessing/MaskPass'
import '../web_modules/postprocessing/RenderPass'
import '../web_modules/postprocessing/EffectComposer'

import CompositePass from './post-effects/composite-pass'

import '../web_modules/OrbitControls'

export default class App {

	constructor() {
		this.config = {
			clearColor: 0x112130
		}
		// GUI.add('')

		this.initScene()
		this.initObject()
		this.initPostprocessing()

		this.changeRotate(.20)
		
		Ticker.on('update', this.animate.bind(this))
		Ticker.start()
	}

	initScene() {
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('main')
			// antialias: true
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)


		// this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000)
		// this.camera.position.set(4, 3, 5)
		// this.camera.lookAt(new THREE.Vector3(0, 0, 0))
		// this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
		this.camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, .1, 1000)
		this.camera.position.set(0, 0, 3)
		this.cameraRig = new THREE.Object3D()
		this.cameraRig.add(this.camera)
		this.scene.add(this.cameraRig)

		this.rotateViewVelocity = new THREE.Quaternion()
		this.rotate4dVelocity = new THREE.Quaternion()

		Kontrol.on('down.36', this.changeRotate.bind(this))

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		this.projector4d = new Projector4D()

		this.polytopeManager = new PolytopeManager({
			projector4d: this.projector4d
		})

		this.scene.add(this.polytopeManager)

		// {
		// 	// generate helper
		// 	this.scene.add(new THREE.GridHelper(100, 2))
		// 	this.scene.add(new THREE.AxisHelper(20))
		// }
	}


	initPostprocessing() {
		this.composer = new THREE.EffectComposer(this.renderer)
		this.composer.addPass(new THREE.RenderPass(this.scene, this.camera))

		{
			this.compositePass = new CompositePass()
			this.composer.addPass(this.compositePass)
		}
		// {
		// 	this.fxaaPass = new THREE.ShaderPass(THREE.FXAAShader)
		// 	this.fxaaPass.uniforms.tDiffuse.value.set(1/window.innerWidth, 1/window.innerHeight)
		// 	this.composer.addPass(this.fxaaPass)
		// }
		{
			let toScreen = new THREE.ShaderPass(THREE.CopyShader)
			this.composer.addPass(toScreen)
		}

		// console.log

		this.composer.passes[this.composer.passes.length - 1].renderToScreen = true
	}

	changeRotate(value) {
		// 4d
		let axis = new THREE.Vector3(
			Math.random() * 2 - 1,
			Math.random() * 2 - 1,
			Math.random() * 2 - 1)
		axis.normalize()
		// TODO: make infection point clearer
		this.rotate4dVelocity.setFromAxisAngle(axis, value * radians(1))

		// view
		axis.set(
			Math.random() *2 - 1,
			Math.random() *2 - 1,
			Math.random() *2 - 1)
		this.rotateViewVelocity.setFromAxisAngle(axis, value * radians(1))
	}

	animate(elapsed) {
		this.renderer.setClearColor(this.config.clearColor)


		GUI.stats.begin()
		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.projector4d.quaternion.multiply(this.rotate4dVelocity)
		this.projector4d.updateMatrix()

		this.cameraRig.quaternion.multiply(this.rotateViewVelocity)

		// this.renderer.render(this.scene, this.camera)
		this.composer.render()

		GUI.stats.end()

	}

	onResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(window.innerWidth, window.innerHeight)
	}

	onClick() {
	}
}

// load main
window.loader = {}

$.when(
	$.getJSON('./data/graphs.json', (data) => {window.loader.graphs = data})
).then(() => {
	console.log('Unco')
	window.app = new App()
})

