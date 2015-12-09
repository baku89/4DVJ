import $ from 'jquery'
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

		console.log('Uncon', parameters.value)

		this.id = parameters.id
		this._value = parameters.value != undefined ? parameters.value : 0.5
		this.target = this._value
		this.lerp = parameters.lerp || 0.1

		this.onMousedown = this.onMousedown.bind(this)
		this.onMouseup = this.onMouseup.bind(this)
		this.onDrag = this.onDrag.bind(this)

		this.$ui.on('mousedown', this.onMousedown)

		// initiate ui
		this.$target.css('left', `${this.target * 100}%`)
		this.$value.css('left', `${this._value * 100}%`)
		this.$left.css('width', `${this._value * 100}%`)
	}

	forceUpdate() {
		this.emit('change', this._value)
	}

	onMousedown(e) {
		this.onDrag(e)
		this.$ui.on('mousemove', this.onDrag)
		this.$ui.on('mouseup', this.onMouseup)
	}

	onMouseup() {
		// console.log('mouseup!!!')
		this.$ui.off('mousemove', this.onDrag)
		this.$ui.off('mouseup', this.onDrag)
	}

	onDrag(e) {
		const offset = this.$ui.offset()
		this.target = (e.pageX - offset.left) / this.$ui.width()
		this.target = clamp(this.target, 0, 1)

		this.$target.css('left', `${this.target * 100}%`)
	}

	set value(value) {
		if (Math.abs(value - this.target) < 0.001) {
			value = this.target
		}
		if (value != this._value) {
			this.emit('change', value)
			this.$value.css('left', `${value * 100}%`)
			this.$left.css('width', `${value * 100}%`)
		}
		this._value = value
	}

	get value() {
		return this._value
	}

	update() {
		this.value = lerp(this._value, this.target, this.lerp)
	}
}
