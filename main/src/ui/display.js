/* global LoadingBar */

import $ from 'jquery'

export default class Display {

	constructor() {
		this.$root = $('.display')

		LoadingBar.on('complete', () => {
			console.log('UncoUnco')
			this.mode = 'full'
		})
	}

	set mode(value) {
		this.$root.attr('data-mode', value)
	}

	get mode() {
		return this.$root.attr('data-mode')
	}
}
