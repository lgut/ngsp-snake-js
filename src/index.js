import Phaser from "phaser";
import { MainScene } from "./scenes/MainScene";
import { StartScreen } from "./scenes/StartScreen";
import logoImg from "./assets/logo.png";
import { PauseMenu } from "./scenes/menus/PauseMenu";
import { GameOver } from "./scenes/menus/GameOver";
import { SelfPlayingSnake } from "./scenes/SelfPlayingSnake";

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
game.scene.add("start background",SelfPlayingSnake);
