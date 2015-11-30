import EventEmitter from 'eventemitter3'

class Kontrol extends EventEmitter{

	constructor() {
		super()

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
			input.onmidimessage = this.onMidiEvent.bind(this)
		})
	}

	onMidiFailure() {
		console.error('Could not init midi devices')
	}

	onMidiEvent(evt) {
		// console.log(evt.data.toString('hex'))
		let type = evt.data[0]
		let name = evt.data[1]
		let value = evt.data[2] / 128.0

		if (type == 0x80) {
			// console.log('Note on', name, value)
			this.emit(`up.${name}`, value)
		} else if (type == 0x90) {
			// console.log('Note off', name, value)
			this.emit(`down.${name}`, value)
		} else if (type == 0xb0) {
			// console.log('Contorl')
		}
	}
}


export default new Kontrol()
