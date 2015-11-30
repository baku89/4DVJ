const _ = require('lodash')


class Kontrol {

	constructor() {
		this.midi = null
		this.inputs = []

		navigator.requestMIDIAccess().then(this.onMidiSuccess.bind(this), this.onMidiFailure.bind(this))
	}

	onMidiSuccess(m) {
		this.midi = m

		let it = this.midi.inputs.values()
		for (let o = it.next(); !o.done; o = it.next()) {
			this.inputs.push(o.value)
		}

		this.inputs.forEach((input, i) => {
			input.onmidimessage = this.onMidiEvent
		})
	}

	onMidiFailure() {
		console.error('could not init midi devices')
	}

	onMidiEvent(evt) {
		
	}

}


export default new Kontrol()
