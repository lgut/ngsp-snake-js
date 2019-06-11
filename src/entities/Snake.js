import Phaser from "phaser";
import Direction from "../helpers/Direction";
import { Block, BlockTypes } from "./Block";

const MovementKeys = {
	up: Phaser.Input.Keyboard.KeyCodes.W,
	down: Phaser.Input.Keyboard.KeyCodes.S,
	left: Phaser.Input.Keyboard.KeyCodes.A,
	right: Phaser.Input.Keyboard.KeyCodes.D
};

export class Snake extends Phaser.GameObjects.Container {
	constructor(scene) {
		super(scene, 200, 200);
		this.scene.add.existing(this);

		this.currDirection = Direction.Left;
		this.nextDirection = this.currDirection;
		this.timeSinceLastMovement = 0;
		this.blocks = [];
		/**
     * @property {number}
     * @description How much time should pass before the snake moves. In milliseconds
     */
		this.movementInterval = 1000;
		// initial creation of snake 
		this.addBlock(new Block(this.scene, 0, 32));
		this.addBlock(new Block(this.scene, 0, 64));
		this.addBlock(new Block(this.scene, 0, 96));
		this.controls = this.scene.input.keyboard.addKeys(MovementKeys);
	}

	/**
	 * 	
	 * @param {Block} block 
	 */
	addBlock(block){
		this.blocks.push(block);
		this.add(block);
	}


	/**
	 * 
	 * @param {Direction} direction 
	 */
	changeDirection(direction) {
		this.nextDirection = direction;
	}

	/**
   *
   * @param {number} dt Delta time.
   */
	moveSnake() {
		/**
     * @type {Block[]}
     */
		const children = this.blocks;
		const head = children[0];
		let nextPos = { x: null, y: null };
		// DETERMINE NEXT POSITION OF SNAKE HEAD
		if (this.currDirection === this.nextDirection) {
			switch (this.nextDirection) {
				case Direction.Up:
					nextPos.x = head.x;
					nextPos.y = head.y - head.blockSize;
					break;
				case Direction.Down:
					nextPos.x = head.x;
					nextPos.y + head.y + head.blockSize;
					break;
				case Direction.Left:
					nextPos.x = head.x - head.blockSize;
					nextPos.y = head.y;
					break;
				case Direction.Right:
					nextPos.x = head.x + head.blockSize;
					nextPos.y = head.y;
					break;
			}
		} else if (Direction.getOpposite(this.currDirection) !== this.nextDirection) {
			// if next direction is opposite of current direction than it will be ignored
			if (this.currDirection === Direction.Down) {
				switch (this.nextDirection) {
					case Direction.Left:
						nextPos.x = head.x - head.blockSize;
						nextPos.y = head.y - head.blockSize;
						break;
					case Direction.Right:
						nextPos.x = head.x + head.blockSize;
						nextPos.y = head.y - head.blockSize;
						break;
				}
			} else if (this.currDirection === Direction.Up) {
				switch (this.nextDirection) {
					case Direction.Left:
						nextPos.x = head.x - head.blockSize;
						nextPos.y = head.y + head.blockSize;
						break;
					case Direction.Right:
						nextPos.x = head.x + head.blockSize;
						nextPos.y = head.y + head.blockSize;
						break;
				}
			} else if (this.currDirection === Direction.Right) {
				switch (this.nextDirection) {
					case Direction.Up:
						nextPos.x = head.x - head.blockSize;
						nextPos.y = head.y - head.blockSize;
						break;
					case Direction.Down:
						nextPos.x = head.x - head.blockSize;
						nextPos.y = head.y + head.blockSize;
						break;
				}
			} else if (this.currDirection === Direction.Left) {
				switch (this.nextDirection) {
					case Direction.Up:
						nextPos.x = head.x + head.blockSize;
						nextPos.y = head.y - head.blockSize;
						break;
					case Direction.Down:
						nextPos.x = head.x + head.blockSize;
						nextPos.y = head.y + head.blockSize;
						break;
				}
			}
		}
		//END DETERMINE NEXT POSITION

		// move every snake child to the position of it's front sibling
		// except for the snake head. It's position was determined by the previous logic
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (i === 0) {
				child.setFillStyle(0xff0000);
			}
			const newNextPos = {
				x: child.x,
				y: child.y
			};

			child.x = nextPos.x;
			child.y = nextPos.y;
			nextPos = newNextPos;
		}
		this.currDirection = this.nextDirection;
	}

}