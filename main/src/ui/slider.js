/* global $ */

import {lerp} from 'interpolation'
import clamp from 'clamp'
import EventEmitter from 'eventemitter3'

export default class Slider extends EventEmitter {

	constructor(parameters) {
		super()

		let html = require('./slider.jade')()
		this.$root = $(html)
		this.$root.find('.slider__name').html(parameters.name)

		this.$ui = this.$root.find('.slider__ui')
		this.$left = this.$root.find('.slider__left')
		this.$right = this.$root.find('.slider__right')
		this.$value = this.$root.find('.slider__value')
		this.$target = this.$root.find('.slider__target')

		this.id = parameters.id
		this._value = parameters.value != undefined ? parameters.value : 0.5
		this._target = this._value
		this.lerp = parameters.lerp || 0.1
		this.defaultLerp = parameters.defaultLerp

		this.onMousedown = this.onMousedown.bind(this)
		this.onMouseup = this.onMouseup.bind(this)
		this.onDrag = this.onDrag.bind(this)

		this.$ui.on('mousedown', this.onMousedown)

		// initiate ui
		this.$target.css('left', `${this._target * 100}%`)
		this.$value.css('left', `${this._value * 100}%`)
		this.$left.css('width', `${this._value * 100}%`)
	}

	forceUpdate() {
		this.emit('change', this._value)
	}

	onMousedown(e) {
		this.onDrag(e)
		this.$ui.on('mousemove', this.onDrag)
		this.$ui.on('mouseup mouseleave', this.onMouseup)
	}

	onMouseup() {
		// console.log('mouseup!!!')
		this.$ui.off('mousemove mouseup', this.onDrag)
	}

	onDrag(e) {
		const offset = this.$ui.offset()
		this._target = (e.pageX - offset.left) / this.$ui.width()
		this._target = clamp(this._target, 0, 1)
		this.lerp = this.defaultLerp || this.lerp
		this.$target.css('left', `${this._target * 100}%`)
	}

	get value() {
		return this._value
	}

	set target(value) {
		this._target = value
		this.$target.css('left', `${this._target * 100}%`)
	}

	get target() {
		return this._target
	}

	update() {
		let value = lerp(this._value, this._target, this.lerp)

		// if (this.id == 'distance') {
		// 	console.log(this._value, this._target, value)
		// }

		if (Math.abs(value - this._target) < 0.001) {
			value = this._target
		}
		if (value != this._value) {
			this.emit('change', value)
			this.$value.css('left', `${value * 100}%`)
			this.$left.css('width', `${value * 100}%`)
		}
		this._value = value

	}
}
