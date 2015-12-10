/* global THREE, LoadingBar, app */

import $ from 'jquery'
import _ from 'lodash'
import Polytope from './polytope'
import {lerp} from 'interpolation'

let graphList = [
	{name: 'Hypercube',          	subdivision: 40},
	{name: 'Pentatope',         subdivision: 60}, // basic
	{name: '3x3-Duoprism',   	subdivision: 60},
	{name: '16-Cell',         	subdivision: 30},
	{name: 'Flat Torus',							subdivision: 7},
	{name: '8-Hedra Solid',   	subdivision: 20},
	{name: '{2,2,7}',							subdivision: 12},
	{name: '{2,2,9}',			subdivision: 12},
	{name: '{3,3,3,3,4}',       	subdivision: 40}, // complex
	{name: '{3,5} Maze',					subdivision: 8},
	{name: '24-Cell',         	subdivision: 30},
	{name: 'Truncated Hypercube',	subdivision: 20},
	{name: '{2,3,4}',							subdivision: 12},
	{name: 'Edge-Truncated Hypercube',			subdivision: 10},
	{name: '12x12-Duoprism',		subdivision: 10},
	{name: 'Y',								subdivision: 10},
	{name: '8-Prisms Solid',    subdivision: 10},
	{name: '{3,3,4} Maze',   			subdivision: 8},
	{name: '120-Cell',        	subdivision: 8}, // strange
	{name: '20-Hedra Solid',  	subdivision: 8},
	{name: '6-Prisms Solid', 		subdivision: 8},
	{name: '20-Hedra Solid', 		subdivision: 8},
	{name: '4-Hedra Solid', 		subdivision: 5},
	{name: '600-Cell',        	subdivision: 10}
]

let loaderPercentage = 0.2

export default class PolytopeManager extends THREE.Object3D  {

	constructor(parameters) {
		super()
 
		this.projector4d = parameters.projector4d

		// bind
		app.ui.polytope.on('change', this.changePolytope.bind(this))

		// scale
		this.currrentPolytopeScale = 1
		app.ui.polytopeScale.on('change', (value) => {
			this.scale.set(value, value, value)
		}) 

		// generate polytopes
		this.polytopes = []

		let generatePolytope = (i) => {

			if (i == graphList.length) {
				this.changePolytope(0)// 16-cell
				return
			}

			let graph = graphList[i]
			console.log(graph.name)
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

		if (typeof index != 'number') {
			index = _.random(this.polytopes.length - 2)
			if (this.currentIndex <= index) {
				index += 1
			}
		}

		this.currentIndex = index
		this.updateStage()

		console.log(this.currentIndex)

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
