/**
 * @param {Direction} direction
 * @return {Direction}
 */
const getOpposite = (direction) => {
	if (direction === Direction.Up) {
		return Direction.Down;
	}
	if (direction === Direction.Down) {
		return Direction.Up;
	}
	if (direction === Direction.Left) {
		return Direction.Right;
	}
	if (direction === Direction.Right) {
		return Direction.Left;
	}
};

/**
 * Direction
 * @readonly
 * @enum {string}
 */
const Direction = {
	Up: "up",
	Down: "down",
	Left: "left",
	Right: "right",
	getOpposite:getOpposite
};

Object.freeze(Direction);
export default Direction;