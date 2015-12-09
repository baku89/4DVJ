/* global THREE */
export default class Graph {

	constructor(data) {

		this.vertices = data.vertices.map((v) => new THREE.Vector4(v[0], v[1], v[2], v[3]))
		this.faces = []

		// subdivide n-gon to face 3 or 4
		data.faces.forEach(this.subdivideNgon.bind(this))
	}

	subdivideNgon(face) {
		
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
			this.faces.push([face[i], face[i + 1], face[(i + 2) % length]])
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
