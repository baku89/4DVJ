/* global THREE */
import $ from 'jquery'
import 'jquery.transit'
import _ from 'lodash'
import TWEEN from 'tween.js'
import {smoothstep, lerp} from 'interpolation' 
import radians from 'degrees-radians'
import degrees from 'radians-degrees'

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
		// GUI.add('')

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

		// this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000)
		// this.camera.position.set(4, 3, 5)
		// this.camera.lookAt(new THREE.Vector3(0, 0, 0))
		// this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)

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

	animate(elapsed, time) {
		this.renderer.setClearColor(this.config.clearColor)
		GUI.stats.begin()

		// TWEEN.update()

		this.projector4d.update()
		this.orbitalCamera.update()
		this.dandruff.update()

		// update posteffects
		this.deformPass.update(elapsed)
		this.overlayPass.update(elapsed)
		this.compositePass.update(elapsed)

		// this.renderer.render(this.scene, this.camera)
		this.composer.render()

		GUI.stats.end()

	}

	onResize() {
		let s = window.innerWidth / Config.RENDER_WIDTH
		let ty = (window.innerHeight - Config.RENDER_HEIGHT * s) / 2

		$(this.renderer.domElement).css({
			transformOrigin: 'top left',
			translate: [0, ty],
			scale: [s, s]
		})

		// console.log(`scale3d(${s}, ${s}, 0) translate3d(${tx}px, ${ty}px, 0)`)
	}

	onClick() {
	}
}

// load main
window.loader = {}

function loadVideo(id, url) {
	let d = new $.Deferred()
	let video = document.createElement('video')
	video.src = url
	video.addEventListener('loadeddata', () => {
		window.loader[id] = video
		d.resolve()
	})
	return d.promise()
}

function loadObj(id, url) {
	let d = new $.Deferred()
	let loader = new THREE.OBJLoader()
	loader.load(url, (obj) => {
		window.loader[id] = obj 
		d.resolve()
	})
	return d.promise()
}

function loadTexture(id, url) {
	let d = $.Deferred()
	let loader = new THREE.TextureLoader()
	loader.load(url, (texture) => {
		window.loader[id] = texture
		d.resolve()
	})
	return d.promise()
}


$.when(
	$.getJSON('./data/graphs.json', (data) => {window.loader.graphs = data}),
	loadVideo('overlay_attack', './texture/overlay_attack.mp4'),
	loadObj('dandruff_small_obj', './data/dandruff_small.obj'),
	loadTexture('dandruff_small_tex', './texture/dandruff_small.png')
).then(() => {
	window.app = new App()
})

