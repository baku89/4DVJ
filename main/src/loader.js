/* global THREE */
import $ from 'jquery'

window.assets = {}

export function loadJSON(id, url) {
	let d = new $.Deferred()
	$.getJSON(url, (data) => {
		window.assets[id] = data
		console.log('loaded', id)
		d.resolve()
	})
	return d.promise()
}

export function loadVideo(id, url) {
	let d = new $.Deferred()
	let video = document.createElement('video')
	video.src = `${url}?.jpg`
	video.addEventListener('loadeddata', () => {
		window.assets[id] = video
		console.log('loaded', id)
		d.resolve()
	})
	return d.promise()
}

export function loadObj(id, url) {
	let d = new $.Deferred()
	let loader = new THREE.OBJLoader()
	loader.load(url, (obj) => {
		window.assets[id] = obj 
		console.log('loaded', id)
		d.resolve()
	})
	return d.promise()
}

export function loadTexture(id, url) {
	let d = $.Deferred()
	let loader = new THREE.TextureLoader()
	loader.load(url, (texture) => {
		window.assets[id] = texture
		console.log('loaded', id)
		d.resolve()
	})
	return d.promise()
}
