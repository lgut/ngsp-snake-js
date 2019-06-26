import Phaser from "phaser";

export class GameOver extends Phaser.Scene {
	constructor() {
		super();
		this.content = {
			title: "Game Over",
			score: (score) => `Your Score: ${score}`,
			restart: "(r) to Restart",
		};
	}

	create(data) {
		const { centerX, centerY } = this.cameras.main;
		this.title = this.add.text(centerX, centerY, this.content.title,
			{ fontSize: "32px", fill: "#ff0000" }
		).setOrigin(0.5, 0.5);
		this.score = this.add.text(centerX, centerY * 1.3, this.content.score(data.score),
			{ fontSize: "16px", fill: "#ffffff" }
		).setOrigin(0.5, 0.5);
		this.restart = this.add.text(centerX, this.score.y * 1.3, this.content.restart,
			this.score.style
		).setOrigin(0.5,0.5);

		this.restartButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
		// unlike lambda functions, regular functions do not have lexical scope so must be bound 
		// to the context they need to run in
		this.restartButton.onDown = this.restartGame.bind(this);
	}

	restartGame(){
		this.scene.start("main");
	}
}