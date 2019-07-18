import Phaser from "phaser";
import { Vertex, createGraph, Algorithms } from "../pathfinding";
import { Snake } from "../entities/Snake";
import { BlockProperties } from "../entities/Block";
import { getRandPosition } from "../helpers/random";
import { Apple } from "../entities/Apple";

export class SelfPlayingSnake extends Phaser.Scene {
	create() {
		const { centerX, centerY } = this.cameras.main;
		this.snake = new Snake(this, centerX / BlockProperties.width, centerY / BlockProperties.width);
		//this.snake.speed = 1000;
		/** @type {Vertex[]} */
		this.path = [];
		// OVERIDE SNAKE UPDATE METHOD
		// NOT A GOOD PRACTICE
		// ALL REFERENCES TO THIS MUST REFER TO SNAKE INSTANCE
		this.snake.update = function (time) {
			if (time >= this.moveTime) {
				return true;
				
			} else {
				return false;
			}
		}.bind(this.snake);


		this.apple = this.createApple();
		this.add.existing(this.apple);

		const vertices = this.generateVertices();
		this.graph = createGraph(vertices);
	}

	update(time) {
		if (!this.snake.isAlive) {
			this.scene.restart();
		} else {
			//TODO: refactor this into function
			if (this.path.length < 1 || this.path === null) {

				this.establishEdges(this.graph, this.snake);
				/**@type {Vertex[]} */
				const vertices = this.graph.getVertices();
				const source = vertices.find(
					vertex => vertex.data.x === this.snake.head.x && vertex.data.y === this.snake.head.y
				);
				const goal = vertices.find(
					vertex => vertex.data.x === this.apple.x && vertex.data.y === this.apple.y
				);
				this.path = Algorithms.dijkstra(this.graph, source, goal);
				// path begins with the goal vertex and ends with the source, the end is not needed
				if (this.path.length > 1) {
					this.path.pop();
				}
			}

			if (this.snake.update(time)) {

				const currentVertex = this.path.pop();
				const { x, y } = currentVertex.data;

				if (this.snake.moveTo(time, x, y)) {

					if (this.snake.collideWithFood(this.apple)) {
						this.apple.eat(this.snake);
						this.snake.grow();
						this.path = [];

						// increase snake speed whenever it's length is a factor of 5
						if (this.snake.body.getChildren().length - 1 % 5 === 0) {
							this.snake.increaseSpeed();
						}
					}
				}


			}
		}
	}

	createApple() {
		const { width, height } = this.game.config;
		const { x, y } = getRandPosition(width, height);

		const apple = new Apple(this, x * BlockProperties.width, y * BlockProperties.width);
		return apple;
	}

	generateVertices() {
		const { width, height } = this.cameras.main;
		const heightInBlocks = height / BlockProperties.width;
		const widthInBlocks = width / BlockProperties.width;
		const vertices = [];

		let index = 0;
		for (let row = 0; row < heightInBlocks; row++) {
			const y = row * BlockProperties.width;

			for (let column = 0; column < widthInBlocks; column++) {
				const x = column * BlockProperties.width;
				const v = new Vertex({ x, y });
				v.index = index;
				vertices.push(v);
				index++;
			}
		}
		return vertices;
	}

	/**
	 * 
	 * @param {*} graph 
	 * @param {Snake} snake 
	 */
	establishEdges(graph, snake) {
		/**@type {Array.<Vertex>} */
		const vertices = graph.getVertices();
		const { width, height } = this.cameras.main;
		const widthInBlocks = width / BlockProperties.width;
		const heightInBlocks = height / BlockProperties.width;
		for (const vertex of vertices) {
			const x = vertex.data.x / BlockProperties.width;
			const y = vertex.data.y / BlockProperties.width;

			const adjacentIndices = [];


			// find adjacent vertices
			if (y === 0) {
				// establish edge between this vertex and vertex directly opposite of it at bottom of screen
				const verticalSiblingIndex = (widthInBlocks * heightInBlocks - widthInBlocks) + vertex.index;
				adjacentIndices.push(verticalSiblingIndex);
			} else {
				// create edge between the this vertex and the one directly above it
				const upperSiblingIndex = vertex.index - widthInBlocks;
				adjacentIndices.push(upperSiblingIndex);
			}

			if (y !== heightInBlocks - 1) {
				// create edge between this vertex and the one directly below it
				const lowerSiblingIndex = vertex.index + widthInBlocks;
				adjacentIndices.push(lowerSiblingIndex);
			}

			if (x === 0) {
				// establish edge between this vertex and the vertex directly opposite of it at the right of the screen
				const horizontalSiblingIndex = vertex.index + widthInBlocks - 1;
				adjacentIndices.push(horizontalSiblingIndex);
			} else {
				// establish edge between this vertex and the vertex to its left
				const leftSiblingIndex = vertex.index - 1;
				adjacentIndices.push(leftSiblingIndex);
			}

			if (x !== widthInBlocks - 1) {
				// establish edge between this vertex and the vertex to its right
				const rightSiblingIndex = vertex.index + 1;
				adjacentIndices.push(rightSiblingIndex);
			}

			// determine weight and create edges
			const isInSnake = snake.body.getChildren().some(block => block.x === vertex.data.x && block.y === vertex.data.y);

			// if vertex is in snake, weight is infinty, else 1	
			const weight = isInSnake ? Infinity : 1;
			for (const index of adjacentIndices) {
				graph.createUndirectedEdge(vertex.index, index, weight);
			}
		}
	}
}