/* global THREE $ */
import _ from 'lodash'
import dat from 'dat-gui'

import radians from 'degrees-radians'
import degrees from 'radians-degrees'
import Kontrol from './kontrol'
import Polychoron from './polychoron'
import Projector4D from './projector4d'
import Ticker from './ticker'

import '../web_modules/OrbitControls.js'

export default class App {

	constructor() {
		this.initScene()
		this.initObject()
		
		Ticker.on('update', this.animate.bind(this))
		Ticker.start()
	}

	initScene() {
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.getElementById('main')
		})
		this.renderer.setSize(window.innerWidth, window.innerHeight)


		// this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000)
		// this.camera.position.set(4, 3, 5)
		// this.camera.lookAt(new THREE.Vector3(0, 0, 0))
		// this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, .1, 1000)
		this.camera.position.set(0, 0, 5)
		this.cameraRig = new THREE.Object3D()
		this.cameraRig.add(this.camera)
		this.scene.add(this.cameraRig)
		
		

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		this.projector4d = new Projector4D()

		let diffEuler = new THREE.Euler(radians(1), 0, 0)
		this.rotate4dVelocity = new THREE.Quaternion()
		this.rotate4dVelocity.setFromEuler(diffEuler)

		Kontrol.on('down.36', this.changeRotate4d.bind(this))

		let polychoron = new Polychoron(
			'16-cell',
			{
				projector4d: this.projector4d
			})
		this.scene.add(polychoron)

		{
			// generate helper
			this.scene.add(new THREE.GridHelper(100, 2))
			this.scene.add(new THREE.AxisHelper(20))
		}
	}

	changeRotate4d(value) {
		let axis = new THREE.Vector3(
			Math.random() * 2 - 1,
			Math.random() * 2 - 1,
			Math.random() * 2 - 1)
		axis.normalize()
		// TODO: make infection point clearer
		this.rotate4dVelocity.setFromAxisAngle(axis, value * radians(1))
	}

	animate(elapsed) {
		// TODO: based on elapsed
		// TODO: make rotation ease-out
		this.projector4d.quaternion.multiply(this.rotate4dVelocity)
		this.projector4d.updateMatrix()

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
