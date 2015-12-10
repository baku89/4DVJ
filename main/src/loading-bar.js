/* global $ */
import EventEmitter from 'eventemitter3'


class LoadingBar extends EventEmitter {

	constructor() {
		super()

		this.$root = $('.loading')
		this.$bar = $('.loading__bar')
		this.$dot = $('.loading__dot')
	}

	update(rate) {
		// console.log('loadingbar..', rate)
		let scale = rate
		this.$bar.css('transform', `scaleX(${scale})`)

		if (rate >= 1) {

			setTimeout(() => {
				this.emit('complete')
			}, 1000)
		}
	}

	animate() {
	}
}

export default new LoadingBar()
