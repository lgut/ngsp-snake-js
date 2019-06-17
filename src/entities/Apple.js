import { Block, BlockTypes, BlockProperties } from "./Block";
import { getRandPosition } from "../helpers/random";

export class Apple extends Block {
	constructor(scene, x, y) {
		super(scene, x, y);
		this.blockType = BlockTypes.Apple;
	}

	eat() {

		const { x, y } = getRandPosition(this.scene.game);
		// change apple to random position
		this.x = x * BlockProperties.width;
		this.y = y * BlockProperties.width;
	}


}