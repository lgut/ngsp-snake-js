import createAdjacencyMatrix from "./createAdjacencyMatrix";

/**
 * Factory function for creating a graph from a list of vertices
 * @param {Array.<Vertex>} vertices The vertices of this graph
 */
export default function createGraph(vertices) {
	// establish indices
	let index = 0;
	for (const vertex of vertices) {
		vertex.index = index;
		index++;
	}

	const matrix = createAdjacencyMatrix(vertices.length);

	/**
	 * Create a one-way edge between two vertices
	 * @function
	 * @param {Vertex | integer} from 
	 * @param {Vertex | integer} to 
	 * @param {number} weight 
	 */
	function createDirectedEdge(from, to, weight = 1) {
		if (Number.isInteger(from) && Number.isInteger(to)) {
			matrix.addDirectedEdge(from, to, weight);
		} else {
			// it's assumed that a Vertex is given, runtime error otherwise
			matrix.addDirectedEdge(from.index, to.index, weight);
		}
	}

	/**
	 * Create a two-way edge between two vertices
	 * @param {Vertex | integer} from 
	 * @param {Vertex | integer} to 
	 * @param {number} weight 
	 */
	function createUndirectedEdge(from, to, weight = 1) {
		if (Number.isInteger(from) && Number.isInteger(to)) {
			matrix.addUndirectedEdge(from, to, weight);
		} else {
			// it's assumed that a Vertex is given, runtime error otherwise
			matrix.addUndirectedEdge(from.index, to.index, weight);
		}
	}

	/**
	 * Returns a list of vertices adjacent to the source
	 * @param {Vertex | integer} source 
	 * @returns {Array.<Vertex>}
	 */
	function getAdjacentVertices(source) {
		if (Number.isInteger(source)) {
			const adjacentIndices = matrix.getAdjacencyList(source);
			const adjacentVertices = [];

			for (const index of adjacentIndices) {
				adjacentVertices.push(vertices[index]);
			}
			return adjacentVertices;
		} else {
			const adjacentIndices = matrix.getAdjacencyList(source.index);
			const adjacentVertices = [];

			for (const index of adjacentIndices) {
				adjacentVertices.push(vertices[index]);
			}
			return adjacentVertices;
		}
	}

	/**
	 * Returns the edge weight between two vertices
	 * @param {Vertex | integer} from A vertex or an vertex index
	 * @param {Vertex | integer} to A vertex or an vertex index
	 * @returns {number}
	 */
	function getEdgeWeight(from, to) {
		if (Number.isInteger(from) && Number.isInteger(to)) {
			return matrix.getEdgeWeight(from, to);
		} else {
			return matrix.getEdgeWeight(from.index, to.index);
		}
	}

	/**
	 * Returns the vertices of this graph 
	 * @param {boolean} clone 
	 * 	whether to return a shallow clone of the vertices array or the vertices proper
	 * @returns {Array.<Vertex>}
	 */
	function getVertices(clone = false) {
		if (clone) {
			return vertices.slice(0);
		} else {
			return vertices;
		}
	}

	const graph = {
		createDirectedEdge,
		createUndirectedEdge,
		getAdjacentVertices,
		getEdgeWeight,
		getVertices
	};
	
	return graph;
}