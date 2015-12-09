/* global $ */
import EventEmitter from 'eventemitter3'

class LoadingBar extends EventEmitter {

	constructor() {
		super()

		this.$root = $('.loading')
		this.$bar = $('.loading__bar')
	}

	update(rate) {
		// this.dest = rate
		console.log('loadingbar..', rate)
		let scale = `${rate}`.substr(0, 5)
		this.$bar.css('transform', `scaleX(${scale})`)

		if (rate >= 1) {

			setTimeout(() => {
				this.emit('complete')
				this.$root.addClass('hidden')
			}, 1000)
		}
	}

	animate() {
	}
}

export default new LoadingBar()
