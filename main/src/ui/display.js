import $ from 'jquery'

export default class Display {

	constructor() {
		this.$root = $('.display')
	}

	set mode(value) {
		this.$root.attr('data-mode', value)
	}

	get mode() {
		return this.$root.attr('data-mode')
	}
}
