import Phaser from "phaser";
import { BlockProperties } from "../entities/Block";

export const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

/**
 * 
 * @param {Phaser.Game} game 
 */
export function getRandPosition(game) {

	const gameWidth = game.config.width;
	const gameHeight = game.config.height;
	const x = Phaser.Math.Wrap(randInt(0, gameWidth), 0, gameWidth / BlockProperties.width);
	const y = Phaser.Math.Wrap(randInt(0, gameHeight), 0, gameHeight / BlockProperties.width);

	return { x, y };
}