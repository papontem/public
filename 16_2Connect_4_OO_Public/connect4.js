// prettier-ignore
/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
/**
 * PAM1: PART 1 Taking all game functionality into a single game class
 * status: doing ...., done, game runs as first version with all functionality now contained with in a class, moving to part 2
 *
 * PAM2: PART 2 Making of a "Start" button
 * 'it should only start the game when this is clicked, and you should be able to click this to restart a new game.'
 * status: doing...., done so far... its working... moving to part 3
 *
 * PAM: PART 3 Make Player a Class,
 *  - each instance has a string color name (eg, “orange” or “#F08000”)
 *  - The Game should keep track of the current player object, not the current player number.
 *  - Update the code so that the player pieces are the right color for them, rather than being hardcoded in CSS as red or blue.
 *  - Add a small form to the HTML that lets you enter the colors for the players, so that when you start a new game, it uses these player colors.
 */
// PAM3: TODO: Player class..
// status: doing.... DONE
/**
 * Player Class, create a player intance with a value of the color picked from html form.
 * TODO: validate color choice
 * - we expect it to be either a valid css color name or a hex code
 */
class Player{
	constructor(x){
		this.color = x
	}
}
/**
 * Game Class, create a game instance with the sizes of the default conect 4 board game, and an array of players being added.
 * - we expect x and y to be integers
 * - we expect the rest of the arguments to be player objects
 */
class Game {
	// PAM1: making constructor, renaming variables to include this
	constructor(x, y, ...players) {
		//PAM: grid sizes of the connect four game
		this.WIDTH = x;
		this.HEIGHT = y;
		// PAM3: saving possible players in an array
		this.players = players;
		// PAM3: setting currplayer as the player at the start of players array
		this.currPlayer = this.players[0];
		this.board;
	}
	// PAM: creating the javascript board in memory
	makeBoard() {
		this.board = Array.from({ length: this.HEIGHT }, () =>
			Array.from({ length: this.WIDTH })
		);
	}
	makeHtmlBoard() {
		const board = document.getElementById("board");

		// make column tops (clickable area for adding a piece to that column)
		const top = document.createElement("tr");
		top.setAttribute("id", "column-top");
		//PAM1: making sure that the event listeners are added with the handle click function callback's 'this' value always being the game class instance
		top.addEventListener("click", this.handleClick.bind(this));
		// PAM: make the cells inside the top row
		for (let x = 0; x < this.WIDTH; x++) {
			const headCell = document.createElement("td");
			headCell.setAttribute("id", x);
			top.append(headCell);
		}
		// PAM1: finished top row is then placed into our html board, should be visible now
		board.append(top);
		console.log("top =", top);

		// make main part of html* board
		for (let y = 0; y < this.HEIGHT; y++) {
			const row = document.createElement("tr");
			for (let x = 0; x < this.WIDTH; x++) {
				const cell = document.createElement("td");
				cell.setAttribute("id", `${y}-${x}`);
				row.append(cell);
			}
			board.append(row);
		}
	}
	removeTopRowEventListener() {
		console.log("removing event listenerfrom top row...");
		let topRow = document.querySelector("#column-top");
		// console.log("topRow= ", topRow);
		// console.log("this=", this);
		// console.log("this.handleClick :", this.handleClick);
		// console.log("handleClick :", handleClick); // undefined, as i wouldve guessed
		// topRow.removeEventListener("click", handleClick);// undefined
		// console.log("topRow.onclick = ", topRow.onclick); // returns null
		// topRow.removeEventListener("click", this.handleClick); // Still couldnt remove the event listener....
		topRow.remove(); // decided to just remove the element entirely... ey it works
		// console.log("topRow= ", topRow);
		topRow = undefined;
	}
	findSpotForCol(x) {
		for (let y = this.HEIGHT - 1; y >= 0; y--) {
			if (!this.board[y][x]) {
				return y;
			}
		}
		return null;
	}
	placeInTable(y, x) {
		const piece = document.createElement("div");
		piece.classList.add("piece");
		piece.classList.add(`${this.currPlayer.color}`);
		piece.style.top = -50 * (y + 2);
		piece.style.backgroundColor = this.currPlayer.color;
		const spot = document.getElementById(`${y}-${x}`);
		spot.append(piece);
	}
	endGame(msg) {
		alert(msg);
	}
	checkForWin() {
		// console.log('TOP CheckForWin (CFW) with "this" as:', this); //PAM : Checking the value of this
		function _win(cells) {
			// Check four cells to see if they're all color of current player
			//  - cells: list of four (y, x) cells
			//  - returns true if all are legal coordinates & all match currPlayer
			// console.log('Nested _win function with "this" as:', this); //PAM1: Checking the value of this

			return cells.every(
				([y, x]) =>
					y >= 0 &&
					y < this.HEIGHT &&
					x >= 0 &&
					x < this.WIDTH &&
					this.board[y][x] === this.currPlayer.color
			);
		}
		// PAM: TODO: for of.. will be faster?
		for (let y = 0; y < this.HEIGHT; y++) {
			// console.log('For-loop in CFW with "this" as:', this); //PAM : Checking the value of this
			for (let x = 0; x < this.WIDTH; x++) {
				// console.log('Nested for-loop in CFW with "this" as:', this); //PAM1: Checking the value of this
				// get "check list" of 4 cells (starting here) for each of the different
				// ways to win
				const horiz = [
					[y, x],
					[y, x + 1],
					[y, x + 2],
					[y, x + 3],
				];
				const vert = [
					[y, x],
					[y + 1, x],
					[y + 2, x],
					[y + 3, x],
				];
				const diagDR = [
					[y, x],
					[y + 1, x + 1],
					[y + 2, x + 2],
					[y + 3, x + 3],
				];
				const diagDL = [
					[y, x],
					[y + 1, x - 1],
					[y + 2, x - 2],
					[y + 3, x - 3],
				];

				// PAM1: cosole flags
				// console.log('Currently trying to bind the game instance to then call _win');

				let _winHoriz = _win.call(this, horiz);
				let _winVert = _win.call(this, vert);
				let _winDR = _win.call(this, diagDR);
				let _winDL = _win.call(this, diagDL);

				//PAM: TESTING
				// console.log('_winHoriz = ', _winHoriz);
				// console.log('_winVert = ', _winVert);
				// console.log('_winDR = ', _winDR);
				// console.log('_winDL = ', _winDL);

				// find winner (only checking each win-possibility as needed)
				// PAM1: has been modified
				if (_winHoriz || _winVert || _winDR || _winDL) {
					return true;
				}
			}
		}
	}
	handleClick(evt) {
		// console.log("handle click even with this as:", this); // PAM1: checking the value of 'this' making sure its the game instance
		// get x from ID of clicked cell
		const x = +evt.target.id;

		// get next spot in column (if none, ignore click)
		const y = this.findSpotForCol(x);
		if (y === null) {
			return;
		}

		// place piece in board and add to HTML table
		this.board[y][x] = this.currPlayer.color;
		this.placeInTable(y, x);

		// check for win
		if (this.checkForWin.call(this)) {
			this.removeTopRowEventListener();
			return this.endGame(`Player ${this.currPlayer.color} won!`);
		}

		// check for tie
		if (this.board.every((row) => row.every((cell) => cell))) {
			this.removeTopRowEventListener();
			// PAM3: forgot this, pun unintended
			return this.endGame("Tie!");
		}

		// switch players
		this.currPlayer =
			this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
	}
}
//PAM3: setup for initializing the game
let myGame;
let player1;
let player2;

let isGameInstanceRunning = false;
let colorH2 = document.getElementsByTagName("h3")[1];
let player1Label = document.querySelector("label[for=player1ColorChoice]");
let player2Label = document.querySelector("label[for=player2ColorChoice]");
let player1Input = document.getElementById("player1ColorChoice");
let player2Input = document.getElementById("player2ColorChoice");

let startButton = document.getElementById("startButton");
let howToPlay = [
	document.getElementsByTagName("h3")[0],
	document.getElementsByTagName("ul")[0],
];
// console.log("how to:", howToPlay);

// console.log("Our Start Button:", startButton);

// PAM2: start/restart button functionality.....
//PAM: TODO: turn into arrow func
start_restart_Game = () => {
	// console.log("this = ", this);
	if (isGameInstanceRunning == false) {
		howToPlay[0].innerHTML = "";
		howToPlay[1].innerHTML = "";
		isGameInstanceRunning = true;
		startButton.innerText = "Restart Game/Reselect Colors";
		//create the players, get their colors from the html form
		colorH2.innerText = "";
		player1Label.innerText = "Player 1 picked...";
		player2Label.innerText = "Player 2 picked...";
		let p1ColorChoice = player1Input.value;
		let p2ColorChoice = player2Input.value;
		player1 = new Player(p1ColorChoice);
		player2 = new Player(p2ColorChoice);
		//PAM2: create the game and the boards
		myGame = new Game(6, 7, player1, player2); // assuming constructor takes height, width, and that players are already build
		myGame.makeBoard();
		myGame.makeHtmlBoard();

		// console.log("My Game Instance:", myGame);
		// console.log("My Game Intance's Board:", myGame.board);
	} else {
		//PAM2: reset the games board
		let htmlGameBoard = document.getElementById("board");
		htmlGameBoard.innerHTML = "";
		myGame = undefined;
		player1 = undefined;
		player2 = undefined;
		colorH2.innerHTML =
			"<h3>Choose Your Color of Preference: </h3><br><p><a href='https://w3schools.sinsixx.com/css/css_colorsfull.asp.htm'>https://w3schools.sinsixx.com/css/css_colorsfull.asp.htm</a></p>";

		player1Label.innerText = "Player 1: ex: name a color or hex value: #FF0000";
		player2Label.innerText = "Player 2: ex: name a color or hex value: #0000FF";
		// player1Input.value = 'red'
		// player2Input.value = 'blue'
		isGameInstanceRunning = false;
		startButton.innerText = "Start The Game";
	}
};
startButton.addEventListener("click", start_restart_Game);
