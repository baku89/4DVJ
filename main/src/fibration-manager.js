/* global THREE, app */

import Fibration from './fibration'

export default class FibrationManager extends THREE.Object3D {

	constructor(parameters) {
		super()

		this.projector4d = parameters.projector4d

		this.fibrations = []

		this.count = 32

		for (let i = 0; i < this.count; i++) {
			let angle = (i / this.count) * (Math.PI * 2)

			let fibration = new Fibration({
				projector4d: this.projector4d,
				color: 0x8F9EAC,//0x8AABB9,
				localEuler4d: new THREE.Euler(angle, 0, 0),
				translate4d: new THREE.Vector4(0.8, 0, 0, 0),
				ringEuler4d: new THREE.Euler(0, Math.PI / 5, 0)
			})

			this.add(fibration)
			this.fibrations.push(fibration)
		}

		this.changeFibrationCount(0)

		app.ui.fibrationCount.on('change', this.changeFibrationCount.bind(this))
	}

	changeFibrationCount(value) {
		this.visibleCount = Math.floor(value * this.count)

		this.fibrations.forEach((fibration, i) => {
			fibration.visible = i < this.visibleCount
		})
	}

	update() {
	}


}

