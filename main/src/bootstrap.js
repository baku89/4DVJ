import $ from 'jquery'

import App from './app'
import LoadingBar from './loading-bar'
import loader from './loader'

if (!Detector.canvas || !Detector.webgl || !Detector.workers || !Detector.fileapi
  || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // No supported devices
  location.href = 'sp'
}

loader.on('progress', (value) => {
	LoadingBar.update()
})

$.when(
	loader.loadJSON('graphs', './data/graphs.json'),
	loader.loadVideo('overlay_attack', './texture/overlay_attack.mp4'),
	loader.loadVideo('overlay_zfighting', './texture/overlay_zfighting.mp4'),
	loader.loadObj('dandruff_small_obj', './data/dandruff_small.obj'),
	loader.loadObj('dandruff_large_obj', './data/dandruff_large.obj'),
	loader.loadTexture('dandruff_small_tex', './texture/dandruff_small.png')
).then(() => {
	window.app = new App()
})
