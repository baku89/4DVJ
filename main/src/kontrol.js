/* global THREE, GUI */

import EventEmitter from 'eventemitter3'
import _ from 'lodash'
import $ from 'jquery'
import osc from 'node-osc'
import Config from './config'

let KEY_MAP = {
	'A': {keydown: 'makeTurbulance', keyup: null},
	'Z': {keydown: 'changePolytope', keyup: null},
	'S': {keydown: 'changeRotate', keyup: null},
	'D': {keydown: 'enableSlitscan', keyup: 'disableSlitscan'},
	'F': {keydown: 'overlayAttack', keyup: null},

	'\n': {keydown: 'magnifyCamera', keyup: 'unmagnifyCamera'},

	// effects
	'Q': {keydown: 'toggleNone', keyup: null},
	'W': {keydown: 'toggleRepeat', keyup: null},
	'E': {keydown: 'toggleMirror', keyup: null},

	// util
	'M': {keydown: 'toggleGuide', keyup: null},
}

let DECORATIVE_KEY = {
	'13': '\n'
}

class Kontrol extends EventEmitter{

	constructor() {
		super()

		this.midi = null
		this.inputs = []
		
		// osc
		this.oscServer = new osc.Server(Config.OSC_PORT, '0,0,0,0')
		this.oscServer.on('message', this.onReceiveOsc.bind(this))

		// midi
		navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this), this.onMidiFailure.bind(this))


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

	onMidiSuccess(m) {
		console.log('Midi device detected', m)
		this.midi = m

		let it = this.midi.inputs.values()
		for (let o = it.next(); !o.done; o = it.next()) {
			this.inputs.push(o.value)
		}

		this.inputs.forEach((input, i) => {
			input.onmidimessage = this.onMidiEvent.bind(this)
		})
	}

	onMidiFailure() {
		console.error('Could not init midi devices')
	}

	onMidiEvent(evt) {
		console.log(evt.data)
		let type = evt.data[0]
		let name = evt.data[1]
		let value = evt.data[2] / 127.0

		if (type == 0xb0) {
			if (name == 0) {
				this.emit('changeDistance4dInfluence', value)
			} else if (name == 16) { // camera zoom
				this.emit('zoomCamera', value)
			}
			//  else if (name == 45 && value > .5) {
			// 	this.emit('changePolytope')
			// }
		}
	}


	onReceiveOsc(msg, info) {

		// console.log(msg)

		if (msg[0] == '/audio/attack') {
			console.log('attack')
			this.emit('changeRotate', _.random(0.5, 1.0, true))

		} else if (msg[0] == '/audio/loud') {
			this.emit('changeDistance4d', msg[1])
		}
	}

	onKeydown(evt) {
		console.log(evt.keyCode)
		let key = DECORATIVE_KEY[evt.keyCode] || String.fromCharCode(evt.keyCode)
		if (KEY_MAP[key] && KEY_MAP[key].keydown) {
			this.emit(KEY_MAP[key].keydown, 1.0)
		}
	}

	onKeyup(evt) {
		let key = DECORATIVE_KEY[evt.keyCode] || String.fromCharCode(evt.keyCode)
		if (KEY_MAP[key] && KEY_MAP[key].keyup) {
			this.emit(KEY_MAP[key].keyup, 1.0)
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
