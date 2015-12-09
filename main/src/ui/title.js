/* global LoadingBar, app */
import $ from 'jquery'

export default class Title {

	constructor() {
		this.$root = $('.title')
		this.$default = $('.title__default')
		this.$custom = $('.title__custom')

		LoadingBar.on('complete', () => {
			this.visibleCustom = true
		})

		app.on('resize', (w, h) => {
			let height = (window.innerHeight - h) / 2
			this.$root.height(height)
		})
	}

	set visibleCustom(value) {
		this.$root.toggleClass('visible-custom', value)
	}

	set value(value) {
		this.$custom.html(value)
	}

	get value() {
		return this.$custom.html()
	}
}
