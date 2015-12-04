/* global THREE */
import EventEmitter from 'eventemitter3'
import $ from 'jquery'

window.assets = {}

class Loader extends EventEmitter {

	constructor() {
		super()

		this.totalWeight = 0
		this.loadedWeight = 0
	}

	load() {
		// 1. load script
		$.when(
			this.loadScript('./lib/three.min.js', 2),
		).when(
			this.loadJSON('graphs', './data/graphs.json', 1),
			this.loadVideo('overlay_attack', './texture/overlay_attack.mp4', 1),
			this.loadVideo('overlay_zfighting', './texture/overlay_zfighting.mp4', 1),
			this.loadObj('dandruff_small_obj', './data/dandruff_small.obj', 1),
			this.loadObj('dandruff_large_obj', './data/dandruff_large.obj', 1),
			this.loadTexture('dandruff_small_tex', './texture/dandruff_small.png', 1)
		).then(() => {
			// window.app = new App()
			this.emit('complete')
		})

	}

	loadScript(url, weight) {
		this.totalWeight += weight
		return $.getScript(url, ()=> {
			this.loadedWeight += weight
			this.emit('progress', this.loadedWeight / this.totalWeight)
		})
	}


	loadJSON(id, url, weight) {
		this.totalWeight += weight
		let d = new $.Deferred()
		$.getJSON(url, (data) => {
			window.assets[id] = data
			this.loadedWeight += weight
			this.emit('progress', this.loadedWeight / this.totalWeight)
			console.log('loaded', id)
			d.resolve()
		})
		return d.promise()
	}

	loadVideo(id, url, weight) {
		this.totalWeight += weight
		let d = new $.Deferred()
		let video = document.createElement('video')
		video.src = `${url}?.jpg`

		function checkLoad() {
			if (video.readyState == 4) {
				window.assets[id] = video
				this.loadedWeight += weight
				this.emit('progress', this.loadedWeight / this.totalWeight)
				console.log('loaded', id)
				d.resolve()
			} else {
				setTimeout(checkLoad, 100)
			}
		}
		setTimeout(checkLoad, 100)
		return d.promise()
	}

	loadObj(id, url, weight) {
		this.totalWeight += weight
		let d = new $.Deferred()
		let loader = new THREE.OBJLoader()
		loader.load(url, (obj) => {
			window.assets[id] = obj 
			this.loadedWeight += weight
			this.emit('progress', this.loadedWeight / this.totalWeight)
			console.log('loaded', id)
			d.resolve()
		})
		return d.promise()
	}

	loadTexture(id, url, weight) {
		this.totalWeight += weight
		let d = $.Deferred()
		let loader = new THREE.TextureLoader()
		loader.load(url, (texture) => {
			window.assets[id] = texture
			this.loadedWeight += weight
			this.emit('progress', this.loadedWeight / this.totalWeight)
			console.log('loaded', id)
			d.resolve()
		})
		return d.promise()
	}

}

export default new Loader()
