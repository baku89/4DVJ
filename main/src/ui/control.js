/* global app */
import $ from 'jquery'



export default class Control {

	constructor() {
		this.$root = $('.control')
		app.on('resize', this.resize.bind(this))
	}

	resize(w, h) {
		let lowerHeight = (window.innerHeight - h) / 2
		let bottom = (lowerHeight - this.$root.height()) / 2
		this.$root.css('bottom', bottom)
	}

	update() {}
	
}
