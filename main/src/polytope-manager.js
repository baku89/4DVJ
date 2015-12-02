/* global THREE, loader, GUI, Kontrol */

import $ from 'jquery'
import _ from 'lodash'
import Polytope from './polytope'
import Projector4D from './projector4d'
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

export default class PolytopeManager extends THREE.Object3D  {

	constructor(parameters) {
		super()

		this.projector4d = parameters.projector4d
		this.polytopes = []

		this.$currentPolytope = $('.current-polytope')

		console.time('generate polytope')

		graphList.forEach((graph) => {
			// console.log(loader.graphs)
			// console.log(loader.graphs[graph.name])
			console.log(graph.name)
			let polytope = new Polytope(
				loader.graphs[graph.name],
				{
					projector4d: this.projector4d,
					subdivision: graph.subdivision
				})
			polytope.name = graph.name
			this.polytopes.push(polytope)
			this.add(polytope)
		})

		console.timeEnd('generate polytope')

		// set range
		this.variationMap = [
			_.range(0, 9),
			_.range(9, 19),
			_.range(9, this.polytopes.length)
		]

		this.variationStatus = [true, false, false]
		this.variationList = this.variationMap[0].concat([])

		this.changePolytope(2)// 16-cell

		// bind
		Kontrol.on('changePolytope', this.changePolytope.bind(this))
		Kontrol.on('undoPolytope', this.undoPolytope.bind(this))
		Kontrol.on('changePolytopeVariation', this.changePolytopeVariation.bind(this))


		// scale
		this.targetPolytopeScale = 1
		this.currrentPolytopeScale = 1
		Kontrol.on('changePolytopeScale', (value) => {
			this.targetPolytopeScale = value
		}) 
	}

	undoPolytope() {

	}

	// for debug
	changePolytope(index) {
		if (this.variationList.length == 0) {
			return
		}

		if (index) {
			this.currentIndex = index
		} else {
			this.currentIndex = this.variationList[_.random(this.variationList.length-1)]

			// in order
			// this.currentIndex = (this.currentIndex + 1) % this.polytopes.length
		}

		this.updateStage()
		this.updateVariationList()
	}

	updateStage() {

		this.polytopes.forEach((polytope, i) => {
			polytope.visible = this.currentIndex == i
		})
		this.$currentPolytope.html(this.polytopes[this.currentIndex].name)
	}

	changePolytopeVariation(pass, toggle) {
		this.variationStatus[pass] = toggle
		this.updateVariationList()
	}

	updateVariationList() {
		this.variationList = []
		this.variationStatus.forEach((status, i) => {
			if (status) {
				this.variationList = this.variationList.concat(this.variationMap[i])
			}
		})

		// delete current index from list
		let indexInList = this.variationList.indexOf(this.currentIndex)
		if (indexInList != -1) {
			this.variationList.splice(indexInList, 1)
		}
	}


	update(elapsed) {
		this.currrentPolytopeScale = lerp(this.currrentPolytopeScale, this.targetPolytopeScale, 0.1)
		this.scale.set(this.currrentPolytopeScale, this.currrentPolytopeScale, this.currrentPolytopeScale)
	}
}
