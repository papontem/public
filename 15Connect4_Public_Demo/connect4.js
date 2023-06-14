// alert(" WELCOME TO THE CONNECT FOUR Edited By Phedias A.M.")
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
/**
 * PAM my TODO: add a way for the players to modify the width and height of the board.
 * for now, these values will be const
 */
const WIDTH = 7;
const HEIGHT = 6;
/**
 * PAM my TODO: add a way to have more than two players.
 * we'll be swtitching between players 1 and 2, so most likely well be reassingning a value to currPlayer. therefore we'll use let.
 * 
 */
let currPlayer = 1; // active player: 1 or 2
/**
 * PAM: function for switching current player
 * can this be refactored?
 */
const switchCurrPlayer = () => {
	if(currPlayer == 1){
		currPlayer = 2
	  }else{
		currPlayer = 1
	  };
};

const board = []; // array of rows, each row is array of cells  (board[y][x])
/**
 * PAM: getBoard() return all of the elements in board for me to see
 */
const getBoard = () => {
	return board.forEach((nestedArr,i)=>{
		console.log(`row ${i}:`,nestedArr);
	});
}
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */
const makeBoard = () => {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	/**
	 * PAM for loop using out height and width variables.
	 * DONE
	 * can this be rafactored?
	 */
	// console.log('Making the JS board...');
	for (let y = 0; y < HEIGHT; y++){
		const row = []
		// console.log('y:',y);
		for (let x = 0; x < WIDTH; x++){
			// console.log('x:',x);
			row.push(null);
			// console.log('row: ', row);
		};
		board.push(row);
		// console.log('board:', board);
	};
	// console.log('js board finished result:', board);
};

/**
 * makeHtmlBoard: make HTML table and row of column tops.
 * */
const makeHtmlBoard = () => {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	/**
	 * PAM: done
	 */
	let htmlBoard = document.getElementById('board')

	// TODO: add comment for this code
	/**
	 * PAM: DONE
	 */
	//PAM: create a table row element called top
	let top = document.createElement("tr");
	//PAM: set its id to 'column-top'
	top.setAttribute("id", "column-top");
	//PAM: add an event listener to variable: top, the row of id column-top, and set its function call as handleClick().
	top.addEventListener("click", handleClick);
	//PAM: add as many head cells to top as the current setting for WIDTH
	// PAM: using a for loop till it reaches the value of WIDTH
	for (let x = 0; x < WIDTH; x++) {
		// PAM: create a table data cell called headCell
		let headCell = document.createElement("td");
		// PAM: set the attribute id of headCell to be 'x' the current value of the loop.
		headCell.setAttribute("id", x);
		// PAM: append the headCell to the top element 
		top.append(headCell);
	};
	htmlBoard.append(top); // PAM: add the completed top row to the htmlBoard
	
	// TODO: add comment for this code
	/**
	 * PAM: DONE
	*/
	//PAM: using a nest for loop to create table data cells and table rows for the htmlBoard element based on our WIDTH and HEIGHT settings
	// PAM: using a for loop till it reaches the value of HEIGHT
	for (let y = 0; y < HEIGHT; y++) {
		// PAM: creating the table row element called row
		const row = document.createElement("tr");
		// PAM: using a for loop till it reaches the value of WIDTH
		for (let x = 0; x < WIDTH; x++) {
			// PAM: creating the table data cell element called cell
			const cell = document.createElement("td");
			// PAM: setting the attribute id of the cell to be coordinates based on its distance in HEIGHT to WIDTH from the top left of the matrix. 
			cell.setAttribute("id", `${y}-${x}`);
			// PAM: appending the cell to the current row being made.
			row.append(cell);
		};
		htmlBoard.append(row); // PAM: appending the completed row to the html board
	};
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
	// TODO: write the real version of this, rather than always returning 0
	/**
	 * PAM: DONE! 
	 * this function is called during our click event handler fucntion
	 * x is actually just an INT
	 * similarly our return value: y will also be an INT
	 * if no open spot is found we return a null
	 */
	// console.log('Our x:', x);
	
	// PAM:  well go throught our js board's xth column and find the lowest table data cell that doesnt have a null value, and that is the top of our stack, the spot where a piece will fall on...
	for (let y = HEIGHT-1; y>= 0; y--){
		// console.log('Our x:', x);
		// console.log('Our y:', y);

		// console.log('The Value at these coords:',board[y][x]);
		if (board[y][x] == null){
			// console.log(`board[${y}][${x}] is Empty`);
			// PAM: return top empty y
			// console.log('Returning y:', y);
			return y
		} else {
			// console.log(`board[${y}][${x}] is not Empty`); // PAM: i have this continue here so i can uncomment this log when im doing some quick debuggin.
			continue
		};
	};
	// PAM: this means its all full
	return null
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
	// TODO: make a div and insert into correct table cell
	/**
	 * PAM: done..
	 */
	// PAM: make a string to use for dom element selection
	const idQueryCoords = `${y}-${x}`;
	//   console.log('idQueryCoords:', idQueryCoords);
	// PAM: create div element and give the piece class and the class indicating to which player it belongs. 
	let divPiece = document.createElement('div')
	divPiece.classList.add('piece', `player${currPlayer}`);
	// PAM: ran into some logic issue here at the querySelector()
	//   let targetTD = document.querySelector('td#'+ idQueryCoords); // PAM: this does not work, getting a syntax error saying that the querySelector: 'td#y-x' is not a valid selector
	// PAM: use the coords string to select the desired table data cell from out html board
	let targetTD = document.getElementById(idQueryCoords); // PAM: this works
	// PAM: add the divPiece to the desired table data cell of the html board
	targetTD.append(divPiece)
	// console.log('divPiece: ', divPiece);
	// console.log('targetTD:', targetTD);

}

/** endGame: announce game end */

const endGame = (msg) => {
  // TODO: pop up alert message
  /**
   * PAM: doing ... done
   */
  alert(msg) // this really it??? 
}

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
	// get x from ID of clicked cell, PAM: ids of the top clickable row's cells
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click) PAM: we ignore click by just returning -> ending function 
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board // PAM: done
	placeInTable(y, x);
	board[y][x] = currPlayer;

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	/**
	 * PAM : DONE
	 */
	if(checkForTie()) {
		return endGame('ITS A TIE/DRAW!!')
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
	/**
	 * PAM : DONE
	 */
	switchCurrPlayer() // PAM: switches current players
};

/**
 * PAM: checkForTie: check board cell-by-cell for any existing nulls.
 * if no nulls exist return true, else return false 
 */
const checkForTie = () => {
	// PAM: hinted to use Array.every()
	//  tests whether all elements in the array pass the test implemented by the provided arrow function. Returns true or false.
	return board.every(row=>{
		// console.log('row:',row);
		//PAM : return true or false on wheather a null exists
		// if all values are ints  returns true, if theres a single null, it returns false
		return row.every(column=>{ 
			// console.log('column:', column);
			//PAM: and finally our every condition test statement. 
			// return wether the value at this column is either null or not
			// coulmn value can be either 1,2 or null
			// if column is null, null != null returns false
			// if column is 1 or 2, != null returns true
			return column != null
		})
	})
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
	// PAM: _win() the function we use to see if a winning arrangement appears after a click occurs.
	// PAM: _win([ [], [], [], [] ])
	const _win = (cells) => {
		// Check four cells to see if they're all color of current player
		//  - cells: (Array)** of four (y, x) (coordinates of table data)**cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(
		([y, x]) =>
			y >= 0 &&
			y < HEIGHT &&
			x >= 0 &&
			x < WIDTH &&
			board[y][x] === currPlayer
		);
	}

	// TODO: read and understand this code. Add comments to help you.
	/**
	 * PAM: done so far....
	 */
	// PAM: for loop that goes through every cell starting from the top left origin down and to the right at each row
	for (let y = 0; y < HEIGHT; y++) {
		//PAM: for loap that goes through the inside of current row
		for (let x = 0; x < WIDTH; x++) {
			//PAM: first run
			// PAM: horiz [0, 0], [0, 0 + 1], [0, 0 + 2], [0, 0 + 3]
			// PAM:      [0, 0], [0, 1], [0, 2], [0, 3]] // makes these four horizontal coordinates for the possible four cell pieces that we will check if they are the same players

			// PAM: vert [0, 0], [0 + 1, x], [0 + 2, x], [0 + 3, x]
			// PAM:      [0, 0], [1, 0], [2, 0], [3, 0] // makes these four vertical coordinates for the possible four cell pieces that we will check if they are the same players

			let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]]; // PAM: ---- to the right
			let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]]; // PAM: | from top to bottom
			let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // PAM: \ from start to bottom right
			let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // PAM: / from start to bottom left
			// PAM: test condition pass the array with the four coordinates to _win() if any is true, then true is returned by checkForWin
			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			};
		};
	};
};

makeBoard();
makeHtmlBoard();
