import Phaser from "phaser";

/**
 * @typedef BlockTypes
 * @enum {number}
 */
export const BlockTypes = {
	Apple: 0xff0000,
	Snake: 0xffffff,
};


/**
 * @typedef BlockProperties
 * @property {number} bumper
 * @property {number} width
 * @property {number} blockSize
 */
/**
 * @type {BlockProperties}
 */
export const BlockProperties = {
	bumper:5,
	width: 16,
	blockSize: 5 + 16,
};


export class Block extends Phaser.GameObjects.Rectangle {
	constructor(scene, x, y, width = BlockProperties.width, type = BlockTypes.Snake) {
		super(scene, x, y, width, width);
		this.setOrigin(0,0);
		this._bumper = BlockProperties.bumper;
		this.blockType = type;
	}

	get blockType() {
		return this._blockType;
	}

	/**
	 * @param {BlockTypes} type
	 */
	set blockType(type) {
		this._blockType = type;
		this.setFillStyle(type);
	}

	get blockSize() {
		return this.width + this._bumper;
	}
} 