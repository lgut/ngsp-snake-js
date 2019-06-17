/**
 * @interface
 * @typedef Coordinable
 * @property {number} x x coordinate
 * @property {number} y y coordinate
 */

/**
 * 
 * @param {Coordinable[]} array 
 * @param {number} x 
 * @param {number} y 
 */
export const shiftPosition = (array,x,y) => {
	if (array.length < 1) {
		array[0].x = x;
		array[0].y = y;
	}else{
		let px = array[0].x;
		let py = array[0].y;

		for(let i = 1; i < array.length; i++){
			const curr = array[i];
			const cx = curr.x;
			const cy = curr.y;
			curr.x = px;
			curr.y = py;
			px = cx;
			py = cy;
		}

		array[0].x = x;
		array[0].y = y;
	}
};