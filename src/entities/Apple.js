import { Block, BlockTypes, BlockProperties } from "./Block";
import { getRandPosition } from "../helpers/random";

export class Apple extends Block {
	/**
	 * x and y are optional parameters, If not defined random points will be assigned	
	 * @param {Phaser.Scene} scene The scene this game object belongs to
	 * @param {number=} x x coordinate
	 * @param {number=} y y coordinate
	 */
	constructor(scene, x, y) {
		super(scene, x, y);
		this.blockType = BlockTypes.Apple;
	}

	/**
	 * 
	 * @param {Snake} snake 
	 */
	eat(snake) {

		const { width, height } = this.scene.game.config;

		const { x, y } = this.getNextCoordinate(snake, width, height);
		// change apple to random position
		this.x = x;
		this.y = y;
	}

	/**
	 * Meant for internal use by Apple class
	 * returns coordinate that has already been multiplied by BlockWidth 
	 * @param {Snake} snake 
	 * @param {number} width
	 * @param {number} height
	 */
	getNextCoordinate(snake, width, height) {
		const snakeParts = snake.body.getChildren();

		// will loop for as long as the randomly generated coordinate matches the coordinates of eacjh snake part
		while (true) { //eslint-disable-line
			let { x, y } = getRandPosition(width, height);
			x *= BlockProperties.width;
			y *= BlockProperties.width;
			const some = snakeParts.some(part => part.x === x && part.y === y);
			if (!some) {
				return { x, y };
			}
		}

	}


}