require('./common')

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

		window.addEventListener('resize', this.onResize.bind(this))
		window.addEventListener('click', this.onClick.bind(this))
	}

	initObject() {
		let geometry = new THREE.BoxGeometry(100, 100, 100)
		let material = new THREE.MeshBasicMaterial({color:0x00ff00})

		let cube = new THREE.Mesh(geometry, material)
		this.scene.add(cube)
	}


	animate() {
		requestAnimationFrame(this.animate.bind(this))
		this.renderer.render(this.scene, this.camera)
	}

	onResize() {

	}

	onClick() {

	}

}


window.app = new App()
