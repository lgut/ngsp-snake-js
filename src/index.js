import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";
import logoImg from "./assets/logo.png";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 800,
	height: 600,
	scene: [MainScene],
	physics: {
		default: "arcade",
		arcade:{
			debug:true,
		}
	},
	
};

const game = new Phaser.Game(config);

function preload() {
	this.load.image("logo", logoImg);
}

function create() {
	const logo = this.add.image(400, 150, "logo");

	this.tweens.add({
		targets: logo,
		y: 450,
		duration: 2000,
		ease: "Power2",
		yoyo: true,
		loop: -1
	});
}
