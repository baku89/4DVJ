/* global createjs */

let loader = new createjs.LoadQueue()
loader.setMaxConnections(10)


let manifest = [
	{src: 'lib/three.min.js', weight: 1},
	{id: 'graphs', src: 'data/graphs.json', weight: 1}
]

manifest.forEach((item) => {
	item.progress = 0
})

loader.on('fileload', (e) => {
	e.item.progress = 1
})

let interval = setInterval(() => {
	let loaded = 0
	let total = 0
	manifest.forEach((item) => {
		loaded += item.progress * item.weight
		total += item.weight
	})
	console.log(loaded, total)

	let event = new createjs.Event('weighted progress')
	event.progress = loaded
	event.total = total
	loader.dispatchEvent(event)
	if (loaded == total) {
		clearInterval(interval)
	}
}, 200)

loader.loadManifest(manifest, false)

export default loader
