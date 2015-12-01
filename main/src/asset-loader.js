/* global createjs */

import _ from 'lodash'

let manifest = [
	{id: 'graphs', src: './data/graphs.json'}
]

let loader = new createjs.LoadQueue()
loader.onComplete = (evt) => {
	console.log('test')
}
loader.onProgress = function(e) {
	console.log('onProgress', e.loaded, loader.progress)
}
loader.loadManifest(manifest)

console.log(loader, manifest)

setInterval(() => {
	manifest.forEach((item) => {
		console.log(item.progress)
	})
})

export default loader
