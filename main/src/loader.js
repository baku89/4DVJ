/* global THREE, LoadingBar */
import $ from 'jquery'

window.assets = {}

let totalWeight = 0
let loadedWeight = 0

let loaderPercentage = 0.2

export function loadJSON(id, url) {
	totalWeight += 1
	let d = new $.Deferred()
	$.getJSON(url, (data) => {
		window.assets[id] = data
		loadedWeight += 1
		LoadingBar.update((loadedWeight / totalWeight) * loaderPercentage)
		d.resolve()
	})
	return d.promise()
}

export function loadVideo(id, url) {
	totalWeight += 1
	let d = new $.Deferred()
	let video = document.createElement('video')
	video.src = `${url}?.jpg`

	let checkLoad = () => {
		if (video.readyState == 4) {
			window.assets[id] = video
			loadedWeight += 1
			LoadingBar.update((loadedWeight / totalWeight) * loaderPercentage)
			d.resolve()
		} else {
			setTimeout(checkLoad, 100)
		}
	}
	setTimeout(checkLoad, 100)
	return d.promise()
}

export function loadObj(id, url) {
	totalWeight += 1
	let d = new $.Deferred()
	let loader = new THREE.OBJLoader()
	loader.load(url, (obj) => {
		window.assets[id] = obj 
		loadedWeight += 1
		LoadingBar.update((loadedWeight / totalWeight) * loaderPercentage)
		d.resolve()
	})
	return d.promise()
}

export function loadTexture(id, url) {
	totalWeight += 1
	let d = $.Deferred()
	let loader = new THREE.TextureLoader()
	loader.load(url, (texture) => {
		window.assets[id] = texture
		loadedWeight += 1
		LoadingBar.update((loadedWeight / totalWeight) * loaderPercentage)
		d.resolve()
	})
	return d.promise()
}
