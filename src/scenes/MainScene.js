import Phaser from "phaser";
import { Snake } from "../entities/Snake";
import { Block, BlockProperties, BlockTypes } from "../entities/Block";
import Direction from "../helpers/Direction";
import { getRandPosition } from "../helpers/random";
import { Apple } from "../entities/Apple";

export class MainScene extends Phaser.Scene {
	constructor() {
		super();
		/** @type {Snake} */
		this.player;
		/**
		 * @type {Apple}
		 */
		this.apple;
		this.cdt = 0;
	}

	create() {
		this.player = new Snake(this, 8, 8);
		this.apple = this.createApple();
		this.add.existing(this.apple);
	}


	createApple() {
		const { x, y } = getRandPosition(this.game);

		const apple = new Apple(this, x * BlockProperties.width, y * BlockProperties.width);
		return apple;
	}


	update(time, dt) {
		if (!this.player.isAlive) {
			return;
		}

		if (this.player.controls.left.isDown) {
			this.player.changeDirection(Direction.Left);
		} else if (this.player.controls.right.isDown) {
			this.player.changeDirection(Direction.Right);
		} else if (this.player.controls.up.isDown) {
			this.player.changeDirection(Direction.Up);
		} else if (this.player.controls.down.isDown) {
			this.player.changeDirection(Direction.Down);
		}

		if (this.player.update(time)) {
			// TODO: encapsuate this logic in Snake and apple classes
			if (this.player.collideWithFood(this.apple)) {
				this.apple.eat();
				this.player.grow();
			}
		} else {
			console.log("you dead"); //eslint-disable-line
		}
	}
}

/**
 * TODO::
 * - create apple class that extends Block
 * - - apple class should have an eat method that resets it's position
 * - snake class needs a die
 */