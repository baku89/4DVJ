/* global $, app */

export default class Display {

	constructor() {
		this.$root = $('.display')

		this.$about = this.$root.find('.display__about')

		this.$about.find('a').attr('target', '_blank')
		this.$about.on('click', () => {
			if (app.state == 'about') {
				app.state = 'vjing'
			}
		})
	}
}
