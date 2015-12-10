/* global $ */

import Config from './config'

import Title from './ui/title'
import Display from './ui/display'
import Control from './ui/control'
import Slider from './ui/slider'
import Keybind from './ui/keybind'

const leftSliderData = [
	{id: 'polytopeScale', name: 'Polytope Size', lerp: 0.04, value: 0.5},
	{id: 'polygonCount', name: 'Polygon Num', value: 0.4},
	{id: 'fibrationCount', name: 'Fibration Num', lerp: 0.05, value: 0}
]


const rightSliderData = [
	{id: 'distance', name: 'Distance', lerp: 0.02, value: 0, defaultLerp: 0.02},
	{id: 'rotateSpeed', name: 'Rotation Vel.', value: 0.3},
	{id: 'lensRadius', name: 'Wormhole Size', lerp: 0.15, value: 0.3}
]

const decorativeKey = {
	'32': 'space',
	'16': 'shift'
}

const keyIcon = {
	'shift': require('raw!./includes/keybind_shift.svg'),
	'space': require('raw!./includes/keybind_space.svg')
}

const keybindData = [
	[
		{id: 'effectReset', key: 'Q', name: 'Reset', margin: 32},
		{id: 'effectRepeat', key: 'W', name: 'Rep', toggle: true, continuous: true},
		{id: 'effectMirror', key: 'E', name: 'Sym', still: true, continuous: true},
		{id: 'slitscan', key: 'R', name: 'Line', toggle: true},
		{id: 'magnify', key: 'T', name: 'WH', toggle: true},
	],
	[
		{id: 'turbulance', key: 'A', name: 'Wave', margin: 60},
		{id: 'rotation', key: 'S', name: 'Rot'},
		{id: 'flash', key: 'D', name: 'Flash'},
		{id: 'white', key: 'F', name: 'White', pressing: true}
	],
	[
		{id: 'wide', key: 'shift', name: 'Wide', pressing: true, margin: 0, width: 80, keyIcon: keyIcon.shift},
		{id: 'invert', key: 'Z', name: 'Inv', toggle: true},
		{id: 'wiggle', key: 'X', name: 'Wig', toggle: true},
		{id: 'flicker', key: 'C', name: 'Flickr', toggle: true},
		{id: 'polytope', key: 'space', name: 'Polytope', margin: 38, width: 105, keyIcon: keyIcon.space}
	]
]


class UI {

	constructor() {
		this.title = new Title()
		this.display = new Display()
		this.control = new Control()

		this.sliderIds = []
		this.initSliders('.control__sliders--left', leftSliderData)
		this.initSliders('.control__sliders--right', rightSliderData)

		this.keyMap = {}
		keybindData.forEach((data, i) => {
			this.initKeybinds(`.control__keyboard-row--${i}`, data)
		})
		this.effectReset.on('change', () => {
			this.effectMirror.toggleHighlight(false)
			this.effectRepeat.toggleHighlight(false)
		})
		this.effectRepeat.on('change', () => {
			this.effectMirror.toggleHighlight(false)
		})
		this.effectMirror.on('change', () => {
			this.effectRepeat.toggleHighlight(false)
		})
		this.wide.on('change', (value) => {
			this.distance.target = value ? .5 : 0
			this.distance.lerp = value ? Config.WIDE_LERP : Config.TELE_LERP
		})

		// setup keyboards
		this.$keyboard = $('.control__keyboard')
		this.$keyboard.on({
			mouseenter: () => this.$keyboard.addClass('show-key'),
			mouseleave: () => this.$keyboard.removeClass('show-key')
		}) 

		$(window).on({
			keydown:this.onKeydown.bind(this),
			keyup:this.onKeyup.bind(this)
		})
	}

	initSliders(containerQuery, data) {
		let sliders = data.map((d) => {
			return new Slider(d)
		})

		let $column = $(containerQuery)

		sliders.forEach((slider) => {
			$column.append(slider.$root)
			this[slider.id] = slider
			this.sliderIds.push(slider.id)
		})
	}

	initKeybinds(containerQuery, data) {
		let keybinds = data.map((d) => new Keybind(d))
		let $row = $(containerQuery)

		keybinds.forEach((keybind) => {
			$row.append(keybind.$root)
			this[keybind.id] = keybind
			this.sliderIds.push(keybind.id)
			this.keyMap[keybind.key] = keybind
		})
	}

	onKeydown(e) {
		let key = decorativeKey[e.keyCode] || String.fromCharCode(e.keyCode)
		if (this.keyMap[key]) {
			this.keyMap[key].onKeydown()
		}
	}

	onKeyup(e) {
		let key = decorativeKey[e.keyCode] || String.fromCharCode(e.keyCode)
		if (this.keyMap[key]) {
			this.keyMap[key].onKeyup()
		}
	} 

	forceUpdate() {
		this.sliderIds.forEach((key) => this[key].forceUpdate())
	}

	update() {
		this.sliderIds.forEach((key) => this[key].update())
	}
}

export default new UI()
