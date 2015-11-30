/* global THREE */
export default class Graph {

	constructor(name) {
		let path = `./data/${name}.json`
		let data = require(path)

		this.vertices = data.vertices.map((v) => new THREE.Vector4(v[0], v[1], v[2], v[3]))
		this.faces = data.faces
	}
}
