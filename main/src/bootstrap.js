import $ from 'jquery'
import * as loader from './loader'
import LoadingBar from './loading-bar'
window.LoadingBar = LoadingBar

import 'OBJLoader'

console.time('load assets')

$.when(
	loader.loadJSON('graphs', './data/graphs.json'),
	loader.loadVideo('overlay_attack', './texture/overlay_attack.mp4'),
	loader.loadVideo('overlay_zfighting', './texture/overlay_zfighting.mp4'),
	loader.loadObj('dandruff_small_obj', './data/dandruff_small.obj'),
	loader.loadObj('dandruff_large_obj', './data/dandruff_large.obj'),
	loader.loadTexture('dandruff_small_tex', './texture/dandruff_small.png')
).then(() => {
	console.timeEnd('load assets')
	$.getScript('./app.js')
})
