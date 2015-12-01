/* global THREE */
import $ from 'jquery'
import 'jquery.transit'
import _ from 'lodash'
import TWEEN from 'tween.js'
import {smoothstep, lerp} from 'interpolation' 

import radians from 'degrees-radians'
import degrees from 'radians-degrees'
import Kontrol from './kontrol'
import PolytopeManager from './polytope-manager'
import Projector4D from './projector4d'
import Ticker from './ticker'
import GUI from './gui'
import Config from './config'
window.GUI = GUI
window.Kontrol = Kontrol

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

		{
			this.camera = new THREE.PerspectiveCamera(60, Config.RENDER_WIDTH / Config.RENDER_HEIGHT, .1, 1000)
			this.camera.position.set(0, 0, 3)
			this.cameraRig = new THREE.Object3D()
			this.cameraRig.add(this.camera)
			this.scene.add(this.cameraRig)
			Kontrol.on('zoomCamera', (value) => {
				this.camera.fov = lerp(10, 120, value)
				console.log(this.camera.fov, value)
				this.camera.updateProjectionMatrix()
			})
		}

		// rotate
		this.rotateViewVelocity = new THREE.Quaternion()
		this.rotate4dAxis = new THREE.Vector3(1, 0, 0)
		this.rotate4dBase = new THREE.Quaternion()
		this.rotate4d = new THREE.Quaternion()
		Kontrol.on('changeRotate', this.changeRotate.bind(this))

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
		let axis = new THREE.Vector3(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		let angle = lerp(0.7, 1.3, Math.random()) * Math.PI
		this.rotate4dAxis.applyAxisAngle(axis, angle)
		this.rotate4dAxis.normalize()
		this.rotate4d.setFromAxisAngle(this.rotate4dAxis, radians(8))
		this.rotate4dBase.setFromAxisAngle(this.rotate4dAxis, radians(1))

		// view
		axis.set(_.random(-1, 1, true), _.random(-1, 1, true), _.random(-1, 1, true))
		this.rotateViewVelocity.setFromAxisAngle(axis, value * radians(0.5))
	}

	animate(elapsed, time) {
		this.renderer.setClearColor(this.config.clearColor)
		GUI.stats.begin()

		TWEEN.update()

		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.projector4d.quaternion.multiply(this.rotate4d)
		this.projector4d.update(elapsed)
		this.rotate4d.slerp(this.rotate4dBase, 0.1)

		this.cameraRig.quaternion.multiply(this.rotateViewVelocity)

		// update posteffects
		this.deformPass.update(elapsed)
		this.overlayPass.update(elapsed)

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


$.when(
	$.getJSON('./data/graphs.json', (data) => {window.loader.graphs = data}),
	loadVideo('overlay_attack', './texture/overlay_attack.mp4')
).then(() => {
	window.app = new App()
})

