/* global $ */

import * as loader from './loader'
import LoadingBar from './loading-bar'
import Detector from 'Detector'

window.LoadingBar = LoadingBar

// Delector
if (!Detector.canvas || !Detector.webgl
	|| /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	// No supported devices
	$('body').attr('data-state', 'unsupported')

} else {

	console.time('load assets')

	$.when(
		loader.loadJSON('graphs', './data/graphs.json'),
		loader.loadVideo('overlay_flash', './texture/overlay_flash.mp4'),
		loader.loadVideo('overlay_flicker', './texture/overlay_flicker.mp4'),
		loader.loadObj('dandruff_small_obj', './data/dandruff_small.obj'),
		loader.loadObj('dandruff_large_obj', './data/dandruff_large.obj'),
		loader.loadTexture('dandruff_small_tex', './texture/dandruff_small.png')
	).then(() => {
		console.timeEnd('load assets')
		require('bundle?name=app!./app.js')
	})

}
