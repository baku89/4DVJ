/* global THREE, GUI */

import EventEmitter from 'eventemitter3'
import _ from 'lodash'
import $ from 'jquery'
import osc from 'node-osc'
import Config from './config'

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

		// keyboard
		$(window).on('keydown', this.onKeydown.bind(this))
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

		switch (evt.keyCode) {
			case 65: // 'A'
				this.emit('makeTurbulance')
				break
			case 32: // space
				this.emit('changePolytope')
				break
			case 83: // 'S'
				this.emit('toggleRepeat')
				break
			case 'Q'.charCodeAt():
				this.emit('changeRotate', _.random(0.5, 1.0, true))
				break
			case 'W'.charCodeAt():
				this.emit('overlayAttack')
		}
	}


}


export default new Kontrol()
