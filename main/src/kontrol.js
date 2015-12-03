import EventEmitter from 'eventemitter3'
// import _ from 'lodash'
import $ from 'jquery'
// import Config from './config'


const DECORATIVE_KEY = {
	'13': '\n',
	'32': ' ',
	'16': 'shift'
}

const KEY_MAP = {
	'A': {keydown: 'makeTurbulance', keyup: null},
	'S': {keydown: 'changeRotate', keyup: null},
	'D': {keydown: 'toggleSlitscan', keyup: null},
	'F': {keydown: 'overlayAttack', keyup: null},
	'G': {keydown: 'toggleZfighting', keyup: null},
	'V': {keydown: 'enableDandruffWiggle', keyup: null},
	'B': {keydown: 'toggleDandruffTexture', keyup: 'toggleDandruffTexture'},

	// '\n': {keydown: 'magnifyCamera', keyup: 'unmagnifyCamera'},
	'1': {keydown: 'toggleMagnifyCamera', keyup: null},

	// 
	' ': {keydown: 'changePolytope', keyup: null},
	'shift': {keydown: 'forceDollyOut', keyup: 'forceDollyIn'},

	// effects
	'Q': {keydown: 'toggleNone', keyup: null},
	'W': {keydown: 'toggleRepeat', keyup: null},
	'E': {keydown: 'toggleMirror', keyup: null},

	// util
	'M': {keydown: 'toggleGuide', keyup: null},
}

class Kontrol extends EventEmitter {

	constructor() {
		super()

		// this.midi = null
		// this.inputs = []

		// midi
		// navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this), this.onMidiFailure.bind(this))


		this.initDom()
	}

	initDom() {
		$('.control').on('mousedown mouseup', () => {
			return false
		})

		let self = this

		$('.exclusion-color button').on('click', function() {
			let color = $(this).css('background-color')
			self.emit('changeExclusionColor', color)
		})

		// keyboard
		$(window).on('keydown', this.onKeydown.bind(this))
		$(window).on('keyup', this.onKeyup.bind(this))
		$(window).on('mousedown', this.onMousedown.bind(this))
		$(window).on('mouseup', this.onMouseup.bind(this))

	}

	// onMidiSuccess(m) {
	// 	console.log('Midi device detected', m)
	// 	this.midi = m

	// 	let it = this.midi.inputs.values()
	// 	for (let o = it.next(); !o.done; o = it.next()) {
	// 		this.inputs.push(o.value)
	// 	}

	// 	this.inputs.forEach((input) => {
	// 		input.onmidimessage = this.onMidiEvent.bind(this)
	// 	})
	// }

	// onMidiFailure() {
	// 	console.error('Could not init midi devices')
	// }

	onMidiEvent(evt) {
		// console.log(evt.data)
		let type = evt.data[0]
		let name = evt.data[1]
		let value = evt.data[2] / 127.0

		if (type == 176) {
			if (name == 0) {
				this.emit('changeDistance', value)
			} else if (name == 1) {
				this.emit('changePolytopeScale', value)
			} else if (name == 2) {
				this.emit('changeDandruffDrawRange', value)
			} else if (name == 3) {
				this.emit('changeFibrationCount', value)
				
			} else if (name == 16) { // camera zoom
				this.emit('changeRotateSpeed', value)
			} else if (name == 17 ) {
				this.emit('changeLensRadius', value)
			
			} else if (name == 65) { // simple polytope
				this.emit('changePolytopeVariation', 0, evt.data[2] == 127)
			} else if (name == 49) { // mid polytope
				this.emit('changePolytopeVariation', 1, evt.data[2] == 127)
			} else if (name == 33) { // complex polytope
				this.emit('changePolytopeVariation', 2, evt.data[2] == 127)
			
			} else if (name == 21) {
				this.emit('fadeHue', value)
			} else if (name == 22) {
				this.emit('fadeSaturation', value)
			} else if (name == 23) {
				this.emit('fadeBrightness', value)
			}
		}
	}

	onKeydown(evt) {
		// console.log(evt.keyCode)
		let key = DECORATIVE_KEY[evt.keyCode] || String.fromCharCode(evt.keyCode)
		if (KEY_MAP[key] && KEY_MAP[key].keydown) {
			this.emit(KEY_MAP[key].keydown)
		}
	}

	onKeyup(evt) {
		let key = DECORATIVE_KEY[evt.keyCode] || String.fromCharCode(evt.keyCode)
		if (KEY_MAP[key] && KEY_MAP[key].keyup) {
			this.emit(KEY_MAP[key].keyup)
		}
	}

	onMousedown() {
		// this.emit('magnifyCamera')
	}
	onMouseup() {
		// this.emit('unmagnifyCamera')
	}


}


export default new Kontrol()
