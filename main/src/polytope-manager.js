/* global THREE, Kontrol, LoadingBar, app */

import $ from 'jquery'
import _ from 'lodash'
import Polytope from './polytope'
import {lerp} from 'interpolation'

let graphList = [
	{name: '5-cell',          	subdivision: 60}, // basic
	{name: 'duoprisms-3x3',   	subdivision: 60},
	{name: '16-cell',         	subdivision: 30},
	{name: '2-2-7-1-3',       	subdivision: 30},
	{name: 'torus',							subdivision: 7},
	{name: 'solid-8-hedra',   	subdivision: 20},
	{name: '8-cell',          	subdivision: 40},
	{name: '2-2-7',							subdivision: 12},
	{name: 'cayley-2-2-9',			subdivision: 12},
	{name: '3-3-3-3-4',       	subdivision: 40}, // complex
	{name: 'maze-3-5',					subdivision: 8},
	{name: '24-cell',         	subdivision: 30},
	{name: 'truncated-8-cell',	subdivision: 20},
	{name: '2-3-4',							subdivision: 12},
	{name: 'edget-8-cell',			subdivision: 10},
	{name: 'duoprisms-12x12',		subdivision: 10},
	{name: 'y-y',								subdivision: 10},
	{name: 'solid-8-prisms',    subdivision: 10},
	{name: 'maze-3-3-4',   			subdivision: 8},
	{name: '120-cell',        	subdivision: 8}, // strange
	{name: 'solid-20-hedra',  	subdivision: 8},
	{name: 'solid-6-prisms', 		subdivision: 8},
	{name: 'solid-20-hedra', 		subdivision: 8},
	{name: 'solid-12-hedra', 		subdivision: 5},
	{name: 'solid-4-hedra', 		subdivision: 5},
	{name: '600-cell',        	subdivision: 10}
]

let loaderPercentage = 0.2

export default class PolytopeManager extends THREE.Object3D  {

	constructor(parameters) {
		super()
 
		this.projector4d = parameters.projector4d

		// bind
		Kontrol.on('changePolytope', this.changePolytope.bind(this))

		// scale
		this.currrentPolytopeScale = 1
		app.ui.polytopeScale.on('change', (value) => {
			this.scale.set(value, value, value)
		}) 

		// generate polytopes
		this.polytopes = []

		let generatePolytope = (i) => {

			if (i == graphList.length) {
				this.changePolytope(2)// 16-cell
				return
			}

			let graph = graphList[i]
			let polytope = new Polytope(
				window.assets.graphs[graph.name],
				{
					projector4d: this.projector4d,
					subdivision: graph.subdivision
				})
			polytope.name = graph.name
			this.polytopes.push(polytope)
			this.add(polytope)

			LoadingBar.update(loaderPercentage + ((i + 1) / graphList.length) * (1 - loaderPercentage))

			setTimeout(() => generatePolytope(i + 1), 1)
		}

		setTimeout(() => generatePolytope(0), 1)

	}

	// for debug
	changePolytope(index) {

		if (!index) {
			index = _.random(this.polytopes.length - 2)
			if (this.currentIndex <= index) {
				index += 1
			}
		}

		this.currentIndex = index
		this.updateStage()

		app.ui.title.value = graphList[this.currentIndex].name
	}

	updateStage() {
		this.polytopes.forEach((polytope, i) => {
			polytope.visible = this.currentIndex == i
		})
	}

	update() {
	}
}
