/* global THREE, LoadingBar */
import $ from 'jquery'
import 'jquery.transit'
import EventEmitter from 'eventemitter3'
// import _ from 'lodash'

import GUI from './gui'
import Config from './config'
window.GUI = GUI
window.Kontrol = Kontrol

import Kontrol from './kontrol'
import Ticker from './ticker'

import PolytopeManager from './polytope-manager'
import Projector4D from './projector4d'
import OrbitalCamera from './orbital-camera'
import Dandruff from './dandruff'
import FibrationManager from './fibration-manager'


// TODO: resolve web_modules
import 'shaders/CopyShader'
import 'shaders/FXAAShader'
import 'postprocessing/ShaderPass'
import 'postprocessing/MaskPass'
import 'postprocessing/RenderPass'
import 'postprocessing/EffectComposer'

import DeformPass from './post-effects/deform-pass'
import CompositePass from './post-effects/composite-pass'
import OverlayPass from './post-effects/overlay-pass'


export default class App extends EventEmitter {

	constructor() {
		super()
	}

	init() {

		this.config = {
			clearColor: 0x112130
		}

		this.$displayWrapper = $('.display-wrapper')

		this.initScene()
		this.initObject()
		this.initPostprocessing()

		this.onResize()

		LoadingBar.on('complete', this.onCompleteLoadingBar.bind(this))
	}

	initScene() {
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: $('.display')[0],
			antialias: true
		})
		// this.renderer.setSize(1920, 814)

		this.orbitalCamera = new OrbitalCamera()
		this.scene.add(this.orbitalCamera)

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		this.projector4d = new Projector4D()

		console.log('aaaslkdjas')
		this.polytopeManager = new PolytopeManager({
			projector4d: this.projector4d
		})
		this.scene.add(this.polytopeManager)

		this.dandruff = new Dandruff({
			projector4d: this.projector4d
		})
		this.scene.add(this.dandruff)

		this.fibrationManager = new FibrationManager({
			projector4d: this.projector4d
		})
		this.scene.add(this.fibrationManager)

		{
			// generate helper
			this.guide = new THREE.Object3D()
			this.guide.visible = false
			this.guide.add(new THREE.GridHelper(100, 2))
			this.guide.add(new THREE.AxisHelper(20))
			this.scene.add(this.guide)
			Kontrol.on('toggleGuide', () => {this.guide.visible = !this.guide.visible})
		}
	}


	initPostprocessing() {
		this.composer = new THREE.EffectComposer(this.renderer)
		this.composer.addPass(new THREE.RenderPass(this.scene, this.orbitalCamera.camera))

		{
			this.deformPass = new DeformPass()
			this.composer.addPass(this.deformPass)
		}
		{
			this.compositePass = new CompositePass()
			this.composer.addPass(this.compositePass)
		}
		{
			this.overlayPass = new OverlayPass()
			this.composer.addPass(this.overlayPass)
		}
		{
			let toScreen = new THREE.ShaderPass(THREE.CopyShader)
			this.composer.addPass(toScreen)
		}

		// console.log

		this.composer.passes[this.composer.passes.length - 1].renderToScreen = true
	}

	onCompleteLoadingBar() {
		console.log('complete!!!!! and start!!!!')
		Ticker.on('update', this.animate.bind(this))
		Ticker.start()
	}

	animate(elapsed) {
		this.renderer.setClearColor(this.config.clearColor)
		GUI.stats.begin()

		this.polytopeManager.update(elapsed)
		this.projector4d.update(elapsed)
		this.orbitalCamera.update(elapsed)
		this.dandruff.update(elapsed)
		this.fibrationManager.update(elapsed)

		// update posteffects
		this.deformPass.update(elapsed)
		this.overlayPass.update(elapsed)
		this.compositePass.update(elapsed)

		// this.renderer.render(this.scene, this.camera)
		this.composer.render()

		GUI.stats.end()
	}

	onResize() {

		console.log(this.$displayWrapper.outerHeight(), 'height')

		// let width = this.$displayWrapper.width()
		// let height = this.$displayWrapper.outerHeight()

		let width = window.innerWidth
		let height = (width / 1920) * 814

		// this.renderer.setSize(1920, 814)
		this.renderer.setSize(width, height)
		this.composer.setSize(width, height)

		this.emit('resize', width, height)
	}

	onClick() {
	}
}

window.app = new App()
window.app.init()
