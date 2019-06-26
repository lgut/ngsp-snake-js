import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";
import { StartScreen } from "./scenes/StartScreen";
import logoImg from "./assets/logo.png";
import { PauseMenu } from "./scenes/menus/PauseMenu";
import { GameOver } from "./scenes/menus/GameOver";

/**
 * @type {Phaser.Types.Core.GameConfig}
 */
const config = {
	type: Phaser.AUTO,
	parent: "phaser-example",
	width: 640,
	height: 480,
	physics: {
		default: "arcade",
		arcade:{
			debug:true,
		}
	},	
	
};

const game = new Phaser.Game(config);
game.scene.add("start",StartScreen,true);
game.scene.add("main",MainScene);
game.scene.add("pause",PauseMenu);
game.scene.add("game over",GameOver);

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
