/* global app, $ */

export default class Title {

	constructor() {
		this.$root = $('.title')
		this.$current = $('.title__textA')
		this.$next = $('.title__textB')
		this.$about = $('.title__about')

		this.$next.css({top: '100%'})

		this.$current.html('4DVJ')

		this.$about.on('click', this.onClickAbout.bind(this))

		app.on('resize', this.onResize.bind(this))

		app.on('changeState', this.onChangeState.bind(this))
	}

	onResize(w, h) {
		// let height = (window.innerHeight - h) / 2
		// this.$root.height(height)
		let marginHeight = (window.innerHeight - h) / 2
		let bottom = (marginHeight - this.$root.height()) / 2
		this.$root.css({y: bottom})
	}

	onChangeState(state, prevState) {
		if (this.timerId) {
			clearTimeout(this.timerId)
		}

		if (prevState == 'loading' && state == 'vjing') { // on loading
			this.timerId = setTimeout(() => {
				this.value = app.polytopeManager.polytopeName
			}, 3000)
		} else if (prevState == 'vjing' && state == 'about') {
			this.force = true
			this.value = '4DVJ'
			this.force = false
		} else if (prevState == 'about' && state == 'vjing') {
			this.value = app.polytopeManager.polytopeName
		}
	}

	onClickAbout() {
		switch (app.state) {
			case 'vjing':
				app.ui.rotateSpeed.target = 0
				app.state = 'about'
				break
			case 'about':
				app.state = 'vjing'
				break
		}
	}

	set value(value) {
		if (app.state == 'vjing' || this.force) {
			// this.$current.html(value)
			this.$next
				.finish()
				.html(value)
				.css({top: '100%'})
				.animate({top: 0}, 500, 'easeOutExpo')
			this.$current
				.finish()
				.css({top: 0})
				.animate({top: '-100%'}, 500, 'easeOutExpo')

			let $swap = this.$current
			this.$current = this.$next
			this.$next = $swap
		}
	}

	get value() {
		return this.current.html()
	}
}
