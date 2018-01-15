let columns = 10, rows = 10, mines = 5;

// Board state
// 2D array which allows for easier tracking of mines from a given cell location
let board = [];

function generateMines() {
	for(let mine=0; mine < mines; mine++) {
		let x, y;
		//Keep generating x, y values until cell is not a mine
		do {
		// Set x, y values which match indices in rows and columns
			x = Math.floor(Math.random() * columns),
			y = Math.floor(Math.random() * rows);
		} while (board[y][x] === -1)
		// -1 represents a mine
		// if current cell is a mine regenerate x,y
		board[y][x] = -1;
	}
}

function fillBoard() {
	// Fill board with empty array columns
	for(let y=0; y<rows; y++) {
		board.push([]);
		//Push default value 0
		for(let x=0; x<columns; x++) {
			board[y].push(0);
		}
	}
}

function inBounds(x, y) {
	//A cell is within the bounds if it is >= 0 or less than the grids rows/columns
	return x >= 0 && y >= 0 && x < columns && y < rows;
}

function countCloseMines() {
	// Need to check cells that are within 1 indices +/-
	//dx/dy = difference on both axis
	for(let y=0; y<rows; y++) {
		for(let x=0; x<columns; x++) {
			//If this is a mine don't count
			if(board[y][x] === -1) {
				continue;
			} 
			let count = 0;
			// Count # of mines around the cell (X, Y)
			// These additonal loops allow us to look at the direct cells around the current mine by checking all cells that exist within 1 index around on Y/X
			for(let dy=-1; dy<=1; dy++) {
				for(let dx=-1; dx<=1; dx++) {
					//We do not need to check itself.
					if(dx === 0 && dy === 0) {
						continue;
					}
					let yy = y + dy,
							xx = x + dx;
					if(inBounds(xx, yy)) {
						if(board[yy][xx] === -1) {
							count++;
						}
					}
				}		
			}
			board[y][x] = board[y][x] === -1 ? board[y][x] :count;
		}
	}	
}

function init() {

	fillBoard();

	generateMines();

	countCloseMines();

}

// Render functionality

function render() {
	const grid = document.getElementById("grid");
	grid.innerHTML = "";

	for(let y=0; y<rows; y++) {

		const row = document.createElement('div');
		row.className = "row"

		for(let x=0; x<columns; x++) {

			const cell = document.createElement('div');

			cell.textContent = board[y][x] === -1 ? "X" : board[y][x];

			cell.style.width = (100 / columns) + "%";

			cell.className = "cell";

			row.append(cell);
		}
		grid.append(row);
	}

}

// Event listener

document.getElementById('form').addEventListener("submit", (e) => {

	e.preventDefault();

	const newCols = document.getElementById("cols").value,
	newRows = document.getElementById("rows").value,
	newMines = document.getElementById("mines").value;
	
	columns = +newCols;
	rows = +newRows;
	mines = +newMines;
	board = [];

	init();
	render();

	console.log(board);

});
