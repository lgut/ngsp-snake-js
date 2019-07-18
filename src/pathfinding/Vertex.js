export default class Vertex {
	constructor(data) {
		// Vertex data
		this.data = data;
		this.index = -1;

		// search related information
		this.reset();
	}

	reset() {
		this.parent = null;
		this.visited = false;
		this.distance = 0;
	}
}