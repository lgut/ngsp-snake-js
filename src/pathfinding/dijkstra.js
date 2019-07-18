import { Vertex } from ".";

/**
 * Finds the shortest path between two vertices in the given graph.
 * Returns a list of vertices, starting with the source vertex and ending with the goal vertex
 * @param {*} graph 
 * @param {Vertex} source 
 * @param {Vertex} goal 
 */
export default function dijkstra(graph, source, goal) {

	// if goal is the same as source
	if (source === goal) {
		return [source];
	}

	// otherwise look for the path
	/**@type {Vertex[]} */
	const unfinishesVertices = [];
	/**@type {Vertex[]} */
	const vertices = graph.getVertices();
	for (const vertex of vertices) {
		vertex.reset();
		vertex.distance = Infinity;
		unfinishesVertices.push(vertex);
	}
	source.distance = 0;

	while (unfinishesVertices.length > 0) {

		const vertex = getClosestVertex(unfinishesVertices);
		// remove vertex from unfinished vertices
		const indexToRemove = unfinishesVertices.indexOf(vertex);
		unfinishesVertices.splice(indexToRemove, 1);

		if (vertex === goal) {
			return getPathToSource(vertex);
		}

		for (const adjVertex of graph.getAdjacentVertices(vertex)) {
			const cost = vertex.distance + graph.getEdgeWeight(vertex, adjVertex);

			if (adjVertex.distance > cost) {
				adjVertex.distance = cost;
				adjVertex.parent = vertex;
			}
		}
	}
	// no path exists between source and goal
	return null;
}

/**
 * 
 * @param {Vertex} from 
 */
function getPathToSource(from) {
	const path = [];
	let next = from;

	while (next !== null) {
		path.push(next);
		next = next.parent;
	}
	return path;
}

/**
 * @param {Vertex[]} vertices
 */
function getClosestVertex(vertices) {

	const ls = vertices.slice(0);
	let candidate = ls.shift();

	for (const vertex of vertices) {
		if (vertex.distance < candidate.distance) {
			candidate = vertex;
		}
	}
	return candidate;

	//return vertices.reduce((prev, curr) => {
	//	if (curr.distance < prev.distance) {
	//		return prev;
	//	} else {
	//		return curr;
	//	}
	//});

}