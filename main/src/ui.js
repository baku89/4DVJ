import $ from 'jquery'

import Title from './ui/title'
import Display from './ui/display'
import Control from './ui/control'
import Slider from './ui/slider'
import Keybind from './ui/keybind'

const leftSliderData = [
	{id: 'polytopeScale', name: 'Polytope Size', lerp: 0.04, value: 1},
	{id: 'polygonCount', name: 'Polygon Num', value: 1},
	{id: 'fibrationCount', name: 'Fibration Num', lerp: 0.05, value: 0}
]


const rightSliderData = [
	{id: 'distance', name: 'Distance', lerp: 0.03, value: 0},
	{id: 'rotateSpeed', name: 'Rotation Vel.', value: 0.3},
	{id: 'lensRadius', name: 'Wormhole Size', lerp: 0.15, value: 0.3}
]

const decorativeKey = {
	'32': 'space',
	'16': 'shift'
}

let keybindData = [
	[
		{id: 'effectReset', key: 'Q', name: 'Reset', margin: 32},
		{id: 'effectRepeat', key: 'W', name: 'Rep'},
		{id: 'effectMirror', key: 'E', name: 'Sym'},
		{id: 'slitscan', key: 'R', name: 'Line', toggle: true},
		{id: 'magnify', key: 'T', name: 'WH', toggle: true},
	],
	[
		{id: 'turbulance', key: 'A', name: 'Wave', margin: 60},
		{id: 'changeRotation', key: 'S', name: 'Rot'},
		{id: 'attack', key: 'D', name: 'Flash'},
		{id: 'bright', key: 'F', name: 'White', pressing: true}
	],
	[
		{id: 'zoom', key: 'shift', name: 'Zoom', margin: 0, width: 80},
		{id: 'bg', key: 'Z', name: 'bg'},
		{id: 'wiggle', key: 'X', name: 'Wig'},
		{id: 'zfighting', key: 'C', name: 'Flickr'},
		{id: 'polytope', key: 'space', name: 'Polytope', margin: 38, width: 105}
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
