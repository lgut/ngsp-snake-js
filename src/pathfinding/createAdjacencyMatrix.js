/**
 * Factory function for creating adjacency lists
 * @param {integer} size the size of the adjacency matrix
 */
export default function createAdjacencyMatrix(size) {
	const matrix = [];
	// fill matrix
	for (let i = 0; i < size; i++) {
		let temp = [];
		for (let j = 0; j < size; j++) {
			temp.push(0);
		}
		matrix.push(temp);
	}

	/**
	 * Create a one way edge between two vertices
	 * @param {integer} from index of Vertex A
	 * @param {integer} to index of Vertex B
	 * @param {number} weight the weight of this edge
	 */
	function addDirectedEdge(from, to, weight) {
		matrix[from][to] = weight;
	}
	/**
	 * Create a two-way edge between two vertices
	 * @param {integer} from index of Vertex A
	 * @param {integer} to index of Vertex B
	 * @param {number} weight the weight of this edge
	 */
	function addUndirectedEdge(from, to, weight) {
		addDirectedEdge(from, to, weight);
		addDirectedEdge(to, from, weight);
	}
	/**
	 * 
	 * @param {integer} x 
	 * @param {integer} y 
	 * @returns {number}
	 */
	function getEdgeWeight(x, y) {
		return matrix[x][y];
	}
	/**
	 * Returns a list of all index's adjacent to the source index
	 * @param {integer} sourceIndex 
	 * @returns {Array.<integer>}
	 */
	function getAdjacencyList(sourceIndex) {
		const list = [];
		for (let i = 0; i < size; i++) {
			if (matrix[sourceIndex][i] !== 0) {
				list.push(i);
			}
		}
		return list;
	}

	return {
		size,
		addDirectedEdge,
		addUndirectedEdge,
		getEdgeWeight,
		getAdjacencyList
	};

}