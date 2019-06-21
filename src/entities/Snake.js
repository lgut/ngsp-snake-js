import Phaser from "phaser";
import Direction from "../helpers/Direction";
import { Block, BlockTypes, BlockProperties } from "./Block";
import { shiftPosition } from "../helpers/shiftPosition";
import { randInt } from "../helpers/random";

const MovementKeys = {
	up: Phaser.Input.Keyboard.KeyCodes.W,
	down: Phaser.Input.Keyboard.KeyCodes.S,
	left: Phaser.Input.Keyboard.KeyCodes.A,
	right: Phaser.Input.Keyboard.KeyCodes.D
};

export class Snake {
	/**
	 * 
	 * @param {Phaser.Scene} scene 
	 */
	constructor(scene, x, y) {
		this.scene = scene;

		this.direction = Direction.Right;
		this.heading = this.direction;
		this.isAlive = true;
		this.speed = 100;
		this.moveTime = 0;

		this.body = scene.add.group();
		/**
		 * @type {Block}
		 */
		//this.head = this.body.create(x * 32, y * 32, "body");
		this.head = new Block(scene, x * BlockProperties.width, y * BlockProperties.width);
		this.body.add(this.head, true);
		this.head.setOrigin(0, 0);
		this.headPosition = new Phaser.Geom.Point(x, y);
		this.tailPosition = new Phaser.Geom.Point(x, y);
		this.controls = this.scene.input.keyboard.addKeys(MovementKeys);
	}

	update(time) {
		if (time >= this.moveTime) {
			return this.move(time);
		}
	}

	/**
	 * 
	 * @param {Direction} direction 
	 */
	changeDirection(direction) {
		const { Up, Down, Left, Right } = Direction;

		switch (direction) {
			case Left:
			case Right:
				if (this.direction === Up || this.direction === Down) {
					this.heading = direction;
				}
				break;
			case Up:
			case Down:
				if (this.direction === Left || this.direction === Right) {
					this.heading = direction;
				}
				break;
		}
	}

	grow() {
		const x = this.tailPosition.x * BlockProperties.width + BlockProperties.width;
		const y = this.tailPosition.y * BlockProperties.width + BlockProperties.width;
		const segment = new Block(this.scene, x, y);
		this.body.add(segment, true);
		this.tailPosition.setTo(x, y);

	}

	isEatingSelf() {
		/**
		 * @type {Block}
		 */
		//const hit = Phaser.Actions.GetFirst(this.body.getChildren(),{x:this.head.x,y:this.head.y},1);
		//	if(hit){
		//		return true;
		//	}

		// this finds all children which (x,y) coordinates that match head coordinates
		const hits = this.body.getChildren().filter((child) => child.x === this.head.x && child.y === this.head.y);
		// hits[0] will be the head itself, hits[1] will be the blck head collided with, if it exists
		const hit = hits[1];
		if (hit) {
			return true;
		}
		return false;


	}

	/**
   *
   * @param {number} time Delta time.
   */
	move(time) {
		const { Down, Left, Right, Up } = Direction;

		switch (this.heading) {
			case Left:
				this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 1, 0, this.scene.game.config.width / BlockProperties.width);
				break;
			case Right:
				this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 1, 0, this.scene.game.config.width / BlockProperties.width);
				break;
			case Up:
				this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 1, 0, this.scene.game.config.height / BlockProperties.width);
				break;
			case Down:
				this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 1, 0, this.scene.game.config.height / BlockProperties.width);
				break;
		}
		this.direction = this.heading;

		// update body segments
		shiftPosition(this.body.getChildren(), this.headPosition.x * BlockProperties.width, this.headPosition.y * BlockProperties.width);

		// update timer
		this.moveTime = time + this.speed;
		if (this.isEatingSelf()) {
			this.isAlive = false;
			return false;
		}
		return true;
	}

	/**
	 * 
	 * @param {Block} apple 
	 */
	collideWithFood(apple) {

		const playerX = this.head.x;
		const playerY = this.head.y;
		const appleX = apple.x;
		const appleY = apple.y;

		if (playerX === appleX && playerY === appleY) {
			return true;
		}
		return false;
	}

}