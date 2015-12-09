import $ from 'jquery'
import EventEmitter from 'eventemitter3'

export default class Keybind extends EventEmitter {

	constructor(parameters) {
		super()

		let html = require('./keybind.jade')()
		this.$root = $(html)
		this.$label = this.$root.find('.keybind__label')
		this.$name = this.$root.find('.keybind__name')
		this.$key = this.$root.find('.keybind__key')

		this.id = parameters.id
		this.key = parameters.key
		this.toggle = parameters.toggle

		this.value = false

		this.$root.css({
			'margin-left': parameters.margin != undefined ? parameters.margin : 8,
			'width': parameters.width || 56
		})
		this.$name.html(parameters.name)
		this.$key.html(parameters.keyIcon || parameters.key)
	}

	forceUpdate() {}

	onKeydown() {
		if (this.toggle) {
			this.value = !this.value
		} else {
			this.value = true
		}
		this.emit('change', this.value)

		console.log(this.key, 'down')
	}

	onKeyup() {
		if (!this.toggle) {
			this.value = false
		}

		if (this.pressing) {
			this.emit('change', this.value)
		}
	}

	update() {}



}
