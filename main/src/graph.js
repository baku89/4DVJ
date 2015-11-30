/* global THREE */
export default class Graph {

	constructor(name) {
		let path = `./data/${name}.json`
		let data = require(path)

		this.vertices = data.vertices.map((v) => new THREE.Vector4(v[0], v[1], v[2], v[3]))
		this.faces = []

		// subdivide n-gon to face 3 or 4
		data.faces.forEach(this.subdivideNgon.bind(this))

		// data.faces.forEach((face, i) => {
		// 	this.subdivideNgon(face, i == 0)
		// 	return false
		// 	// if (face.length == 3 || face.length == 4) {
		// 	// 	this.faces.push(face)

		// 	// } else if (face.length == 5) {
		// 	// 	this.faces.push(
		// 	// 		[face[0], face[1], face[2]],
		// 	// 		[face[2], face[3], face[4], face[0]])

		// 	// } else if (face.length == 6) {
		// 	// 	this.faces.push(
		// 	// 		[face[0], face[1], face[2]],
		// 	// 		[face[0], face[2], face[3]],
		// 	// 		[face[0], face[3], face[5]],
		// 	// 		[face[3], face[4], face[5]])
		// 	// } else {
		// 	// 	this.subdivideNgon(face)
		// 	// }
		// })
	}

	subdivideNgon(face, log) {
		
		if (face.length < 3) {
			return
		} if (face.length == 3) {
			this.faces.push(face)
			return
		}

		// 外周から順番に3角形をつくる
		let i = 0
		let length = face.length
		while (i <= length - 2) {
			this.faces.push([face[i], face[i+1], face[i+2]])
			i += 2
		}

		// 奇数個目を間引く
		let reducedFace = []
		face.forEach((index, i) => {
			if (i % 2 == 0) {
				reducedFace.push(index)
			}
		})

		this.subdivideNgon(reducedFace)
	}
}
