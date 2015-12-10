/* global $, app */

export default class Control {

	constructor() {
		this.$root = $('.control')
		this.$keyboard = this.$root.find('.control__keyboard')
		app.on('resize', this.resize.bind(this))

		app.on('changeState', (state, prevState) => {
			if (prevState == 'loading' && state == 'vjing') {
				setTimeout(() => {
					this.$keyboard.removeClass('show-key')
				}, 2500)
			}
		})

	}

	resize(w, h) {
		let lowerHeight = (window.innerHeight - h) / 2
		let bottom = (lowerHeight - this.$root.height()) / 2
		this.$root.css({y: -bottom})
	}

	update() {}
	
}
