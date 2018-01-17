let columns = 20, rows = 20, mines = 50;

// Board state
let board = [];

const mineCell = -1;

function generateMines() {
	for(let mine=0; mine < mines; mine++) {
		let x, y;
		//Keep generating x, y values until cell is not a mine
		do {
		// Set x, y values which match indices in rows and columns
			x = Math.floor(Math.random() * columns),
			y = Math.floor(Math.random() * rows);
		} while (board[y][x] === mineCell);
		// if current cell is a mine regenerate x,y
		// else set cell to mine
		board[y][x] = mineCell;
	}
}

function fillBoard() {
	// Fill board with empty array columns
	for(let y=0; y<rows; y++) {
		board.push([]);
		//Push default value 0 into cols
		for(let x=0; x<columns; x++) {
			board[y].push(0);
		}
	}
}

function cellWithinBounds(x, y) {
	//A cell is within the bounds if it is >= 0 or less than the grids rows/columns
	return x >= 0 && y >= 0 && x < columns && y < rows;
}

function countNeighbourMines() {
	//Iterate over all cells, skipping any mines
	for(let y=0; y<rows; y++) {
		for(let x=0; x<columns; x++) {
			if(board[y][x] === mineCell) {
				continue;
			} 
			// Count # of mines around the cell (y,x)
			let count = 0;
			// Additonal loops allow us to look at the direct cells around the current mine by checking all cells that exist within 1 index on y,x axis

			/*
				Visualisation of dx, dy for any given cell. Takes the y,x values of the current cell and traverses

				***********************
				* -1 -1 * 0 -1 * 1 -1 *
				***********************		
				*	-1  0 * 0  0 * 1  0 *
				***********************
				* -1  1 * 0  1 * 1  1 *
				***********************
			*/

			for(let dy=-1; dy<=1; dy++) {
				for(let dx=-1; dx<=1; dx++) {
					//We do not need to check itself.
					if(dx === 0 && dy === 0) {
						continue;
					}
					// yy/xx is the current cell index plus the difference variable in the iterators
					let yy = y + dy,
							xx = x + dx;
					if(cellWithinBounds(xx, yy)) {
						if(board[yy][xx] === mineCell) {
							count++;
						}
					}
				}		
			}
			board[y][x] = count;
		}
	}	
}

function init() {

	fillBoard();

	generateMines();

	countNeighbourMines();

	render();

}

// Render functionality

function render() {
	const grid = document.getElementById("grid");

	//Empty to view before re-render
	grid.innerHTML = "";

	for(let y=0; y<rows; y++) {

		const row = document.createElement('div');
		row.className = "row"

		for(let x=0; x<columns; x++) {

			const cell = document.createElement('div');

			cell.className = "cell";

			switch(board[y][x]) {
				case mineCell: 
					cell.classList.add("cell-mine");
					break;
				case 1: 
					cell.classList.add("cell-1");
					break;
				case 2: 
					cell.classList.add("cell-2");
					break;
				case 3: 
					cell.classList.add("cell-3");
					break;
				case 4: 
					cell.classList.add("cell-4");
					break;
				case 5: 
					cell.classList.add("cell-5");
					break;
				case 6: 
					cell.classList.add("cell-6");
					break;
				case 7: 
					cell.classList.add("cell-7");
					break;
				case 8: 
					cell.classList.add("cell-8");
					break;
				default:
					cell.classList.add("cell-empty");
					break;
			}

			if(board[y][x] > 0) {
				cell.textContent = board[y][x];
			} 

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

	//empty existing board before re-render
	board = [];

	init();

});

init();
