/* global THREE, loader */

import _ from 'lodash'
import Polytope from './polytope'
import Projector4D from './projector4d'

const graphList = [
	{
		name: '5-cell',
		subdivision: 60
	},
	{
		name: '8-cell',
		subdivision: 40,
	},
	{
		name: '16-cell',
		subdivision: 30,
	},
	{
		name: '24-cell',
		subdivision: 30
	},
	{
		name: '120-cell',
		subdivision: 10
	},
	{
		name: 'duoprisms-12x12',
		subdivision: 10
	}
]

export default class PolytopeManager extends THREE.Object3D  {

	constructor(parameters) {
		super()

		this.projector4d = parameters.projector4d
		this.polytopes = []

		graphList.forEach((graph) => {
			console.log(loader.graphs)
			console.log(loader.graphs[graph.name])
			let polytope = new Polytope(
				loader.graphs[graph.name],
				{
					projector4d: this.projector4d,
					subdivision: 10
				})
			polytope.visible = false
			this.polytopes.push(polytope)
			this.add(polytope)
		})

		this.currentIndex = 0
		this.polytopes[0].visible = true

		// bind
		window.Kontrol.on('changePolytope', this.changePolytope.bind(this))
	}

	changePolytope() {
		let index = _.random(this.polytopes.length - 2)
		if (this.currentIndex <= index) {
			index += 1
		}
		console.log('changed to ', index, this.polytopes[index].name)

		this.polytopes.forEach((polytope, i) => {
			polytope.visible = index == i
		})

		this.currentIndex = index
	}
}
