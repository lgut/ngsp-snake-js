import Phaser from "phaser";
import { BlockProperties } from "../entities/Block";

export const randInt = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min);
};

//FIXME: refactor to return random coordinates multipled by blockwidth
/**
 * Gets a random position within the canvas' bounds
 * @param {number} gameWidth
 * @param {number} gameHeight
 */
export function getRandPosition(gameWidth, gameHeight) {

	const x = Phaser.Math.Wrap(randInt(0, gameWidth), 0, gameWidth / BlockProperties.width);
	const y = Phaser.Math.Wrap(randInt(0, gameHeight), 0, gameHeight / BlockProperties.width);

	return { x, y };
}