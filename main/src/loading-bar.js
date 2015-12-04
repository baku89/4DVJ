
class LoadingBar {

	constructor() {
		this.canvas = document.querySelector('canvas.loading')
		this.canvas.width = 400
		this.canvas.height = 400
		this.context = this.canvas.getContext('2d')

		this.current = 0
		this.dest = 0

		this.animate = this.animate.bind(this)
		this.animate()
	}

	update(rate) {
		this.dest = rate
	}

	animate() {
	}
}

export default new LoadingBar()