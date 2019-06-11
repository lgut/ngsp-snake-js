import Phaser from "phaser";
import { Snake } from "../entities/Snake";
import { Block, BlockProperties, BlockTypes } from "../entities/Block";
import Direction from "../helpers/Direction";

export class MainScene extends Phaser.Scene {
	constructor() {
		super();
		/** @type {Snake} */
		this.player;
		/**
		 * @type {Block}
		 */
		this.apple;
		this.cdt = 0;
	}

	create() {
		this.player = new Snake(this);
		this.apple = this.createApple();
		this.add.existing(this.apple);
		//this.player.add(this.add.rectangle(0,0,32,32,0xffffff).setOrigin(0,0))
		//this.player.add(this.add.rectangle(0,32,32,32,0xffffff).setOrigin(0,0))

		this.time.addEvent({
			loop: true,
			callback: this.player.moveSnake,
			delay: this.player.movementInterval,
			callbackScope: this.player,
		});

		this.physics.add.overlap(this.player,this.apple,(player,apple)=>{
			console.dir({player,apple}); // eslint-disable-line
		});
	}

	createApple() {
		const getRand = (min, max) => {
			return Math.floor(Math.random() * (max - min) + min);
		};
		const worldBounds = {
			height: this.game.canvas.height,
			width: this.game.canvas.width,
		};
		const gameHeightInBlocks = worldBounds.height / BlockProperties.blockSize;
		const gameWidthInBlocks = worldBounds.width / BlockProperties.blockSize;
		const pos = {
			x: getRand(0, gameHeightInBlocks) * BlockProperties.blockSize,
			y: getRand(0, gameWidthInBlocks) * BlockProperties.blockSize,
		};
		const apple = new Block(this, pos.x, pos.y);
		apple.blockType = BlockTypes.Apple;
		return apple;
	}

	update(time, dt) {
		if (this.player.controls.left.isDown) {
			this.player.changeDirection(Direction.Left);
		}else if (this.player.controls.right.isDown){
			this.player.changeDirection(Direction.Right);
		}else if (this.player.controls.up.isDown){
			this.player.changeDirection(Direction.Up);
		}else if (this.player.controls.down.isDown) {
			this.player.changeDirection(Direction.Down);
		}
	}
}