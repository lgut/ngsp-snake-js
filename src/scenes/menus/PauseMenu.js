import Phaser from "phaser";

const controls = {
	restart: Phaser.Input.Keyboard.KeyCodes.R,
	unpause: Phaser.Input.Keyboard.KeyCodes.SPACE,
};

export class PauseMenu extends Phaser.Scene {
	constructor() {
		super();
		this.parentScene = null;
		this.content = {
			title: "Paused",
			pauseText: "Press space to unpause",
			restartText: "(r) to Restart",
		};

	}

	create(data) {
		this.isPaused = true;
		/**
		 * @type {Phaser.Scene}
		 */
		this.parentScene = data.parentScene;
		const { centerX, centerY } = this.cameras.main;
		this.title = this.add.text(centerX, centerY * 0.8, this.content.title,
			{ fontSize: "32px", fill: "#ffffff" }
		);

		this.pauseText = this.add.text(centerX, this.title.y * 1.3, this.content.pauseText,
			{ fontSize: "16px", fill: "#808080" }
		);

		this.restartText = this.add.text(centerX, this.pauseText.y * 1.3, this.content.restartText,
			this.pauseText.style
		);

		// center align text
		this.title.setX(this.title.x - this.title.width * 0.5);
		this.pauseText.setX(this.pauseText.x - this.pauseText.width * 0.5);
		this.restartText.setX(this.restartText.x - this.restartText.width * 0.5);

		// create controls and listeners
		this.controls = this.input.keyboard.addKeys(controls);
		this.controls.restart.once("down", () => {
			if (this.isPaused) {
				this.restart();
			}
		});
		this.controls.unpause.once("down", () => {
			if (this.isPaused) {
				this.unpause();
			}
		});
	}

	restart() {
		this.parentScene.scene.stop();
		this.parentScene.scene.start();
		this.scene.stop();
	}

	unpause() {
		this.parentScene.scene.resume();
		this.isPaused = false;
		this.scene.stop();
	}
	toggle() {
		if (this.isPaused) {
			this.unpause();
		} else {
			this.pause();
		}
	}
}