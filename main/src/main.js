/* global THREE */
import $ from 'jquery'
import 'jquery.transit'
// import _ from 'lodash'

import GUI from './gui'
import Config from './config'
import * as loader from './loader'
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
import '../web_modules/shaders/CopyShader'
import '../web_modules/shaders/FXAAShader'
import '../web_modules/postprocessing/ShaderPass'
import '../web_modules/postprocessing/MaskPass'
import '../web_modules/postprocessing/RenderPass'
import '../web_modules/postprocessing/EffectComposer'

import DeformPass from './post-effects/deform-pass'
import CompositePass from './post-effects/composite-pass'
import OverlayPass from './post-effects/overlay-pass'

import '../web_modules/OrbitControls'
import '../web_modules/OBJLoader'

export default class App {

	constructor() {
		this.config = {
			clearColor: 0x112130
		}
		GUI.gui.addColor(this.config, 'clearColor')

		this.initScene()
		this.initObject()
		this.initPostprocessing()

		
		Ticker.on('update', this.animate.bind(this))
		Ticker.start()
	}

	initScene() {
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('main'),
			antialias: true
		})
		this.renderer.setSize(Config.RENDER_WIDTH, Config.RENDER_HEIGHT)
		this.onResize()

		this.orbitalCamera = new OrbitalCamera()
		this.scene.add(this.orbitalCamera)

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		this.projector4d = new Projector4D()

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
		// console.log('test')

		let s = window.innerWidth / Config.RENDER_WIDTH
		let ty = (window.innerHeight - Config.RENDER_HEIGHT * s) / 2

		$(this.renderer.domElement).css({
			transformOrigin: 'top left',
			translate: [0, ty],
			scale: [s, s]
		})
	}

	onClick() {
	}
}

// load main

// window.app = new App()



$.when(
	loader.loadJSON('graphs', './data/graphs.json'),
	loader.loadVideo('overlay_attack', './texture/overlay_attack.mp4'),
	loader.loadVideo('overlay_zfighting', './texture/overlay_zfighting.mp4'),
	loader.loadObj('dandruff_small_obj', './data/dandruff_small.obj'),
	loader.loadObj('dandruff_large_obj', './data/dandruff_large.obj'),
	loader.loadTexture('dandruff_small_tex', './texture/dandruff_small.png')
).then(() => {
	console.log('aaaaasdjkfasdlkfjas;')
	window.app = new App()
})

