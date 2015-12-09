import dat from 'dat-gui'
import Stats from 'stats-js'

class GUI {

	constructor() {
		this.gui = new dat.GUI()
		// this.gui.toggleHide()
		this.add = this.gui.add.bind(this.gui)
		this.addColor = this.gui.addColor.bind(this.gui)

		this.stats = new Stats()
		this.stats.setMode(0)

		// this.stats.domElement.style.position = 'absolute'
		// this.stats.domElement.style.left = '0px'
		// this.stats.domElement.style.top = '0px'
		// document.body.appendChild( this.stats.domElement )
	}
}

export default new GUI()
