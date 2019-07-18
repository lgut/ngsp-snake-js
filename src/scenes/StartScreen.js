import Phaser from "phaser";


export class StartScreen extends Phaser.Scene {
	constructor() {
		super();
		this.content = {
			title: "Snek",
			subtitle: "Press space to start/pause",
			controls: "Movement Keys\nW - Up, S - Down, A - Left, D - Right",
		};
	}

	create() {
		const centerX = this.cameras.main.centerX;
		const centerY = this.cameras.main.centerY;
		const titlePos = {
			x: centerX,
			y: centerY * 0.8,
		};

		// is positioned relative to the canvas' center
		this.title = this.add.text(titlePos.x, titlePos.y, this.content.title,
			{ fontSize: "32px", fill: "#ffffff", }
		);
		// horizontally center title on screen
		// this is done because the title's width is only known after it's creation
		this.title.setX(this.title.x - this.title.width * 0.5);

		// positioned relative to title's position
		this.subtitle = this.add.text(titlePos.x, this.title.y * 1.3, this.content.subtitle,
			{ fontSize: "16px", fill: "#808080" }
		);
		// horizontally center subtitle
		this.subtitle.setX(this.subtitle.x - this.subtitle.width * 0.5);

		this.info = this.add.text(16, titlePos.y * 2, this.content.controls,
			this.subtitle.style
		);

		// fade in/out effect for subtitle
		this.add.tween({
			targets: [this.subtitle],
			alpha: 0.5,
			ease: "Sine.easeInOut",
			duration: 1000,
			yoyo: true,
			loop: -1,
		});

		// create start button
		this.start = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		this.start.once("down", () => {
			// switch scene
			this.scene.stop("start background");
			this.scene.start("main");
		});
		this.playBackground();
	}

	playBackground(){
		this.game.scene.start("start background").moveBelow("start background","start");
	}
}