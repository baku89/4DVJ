/* global $ */

import EventEmitter from 'eventemitter3'

export default class Keybind extends EventEmitter {

	constructor(parameters) {
		super()

		let html = require('./keybind.pug')()
		this.$root = $(html)
		this.$label = this.$root.find('.keybind__label')
		this.$name = this.$root.find('.keybind__name')
		this.$key = this.$root.find('.keybind__key')

		this.id = parameters.id
		this.key = parameters.key
		this.toggle = parameters.toggle || false
		this.still = parameters.still || false
		this.pressing = parameters.pressing || false
		this.value = false

		// setup dom
		this.$root.css({
			'margin-left': parameters.margin != undefined ? parameters.margin : 8,
			'width': parameters.width || 56
		})

		this.$root.toggleClass('continuous', parameters.continuous || false)
		this.$name.html(parameters.name)
		this.$key.html(parameters.keyIcon || parameters.key)
	}

	forceUpdate() {
		// this.emit('change', this.value)
	}

	onKeydown() {
		if (this.toggle) {
			this.value = !this.value
		} else {
			this.value = true
		}
		this.$root.toggleClass('active', this.value)
		this.emit('change', this.value)

		// console.log(this.key, 'down')
	}

	toggleHighlight(value) {
		this.value = value
		this.$root.toggleClass('active', this.value)
	}

	onKeyup() {
		if (!this.toggle) {
			this.value = false
		}
		if (!this.still) {
			this.$root.toggleClass('active', this.value)
		}
		if (this.pressing) {
			this.emit('change', this.value)
		}
	}

	update() {}



}
