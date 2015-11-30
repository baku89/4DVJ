import EventEmitter from 'eventemitter3'


class Ticker extends EventEmitter {

	constructor() {
		super()
		this.update = this.update.bind(this)
		this.previousTime = 0
	}

	start() {
		this.update()
	}

	stop() {
		cancelAnimationFrame(this.requiestId)
	}

	update(t) {
		this.requestId = requestAnimationFrame(this.update)
		let elapsed = t - this.previousTime
		this.previousTime = t
		if (elapsed) {
			this.emit('update', elapsed)
		}
	}
}

export default new Ticker()
