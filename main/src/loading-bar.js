/* global $ */
import EventEmitter from 'eventemitter3'

class LoadingBar extends EventEmitter {

	constructor() {
		super()
		// this.canvas = document.querySelector('canvas.loading')
		// this.canvas.width = 400
		// this.canvas.height = 400
		// this.context = this.canvas.getContext('2d')

		// this.current = 0
		// this.dest = 0

		// this.animate = this.animate.bind(this)
		// this.animate()

		this.$bar = $('.loading__bar')
	}

	update(rate) {
		// this.dest = rate
		console.log('loadingbar..', rate)
		let scale = `${rate}`.substr(0, 5)
		this.$bar.css('transform', `scaleX(${scale})`)

		if (rate >= 1) {
			console.log('loadingbar complere')
			$('.display-wrapper').removeClass('hidden')

			setTimeout(() => {
				this.emit('complete')
			}, 1000)
		}
	}

	animate() {
	}
}

export default new LoadingBar()
