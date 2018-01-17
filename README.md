# Minesweeper technical challenge
Create a grid of cells with random assignment of mines within its boundaries. Each cell, excluding any mines, should count how many mines exist within the 8 surrounding cells. The grid should span *n* number of rows and columns and have *n* number of mines.

# Thought process and approach
I’ve used vanilla JavaScript to solve this issue as we are creating a view using data that isn’t being persisted. JavaScript makes it easy to update the view when the data structure is updated.

Below is my thought process and approach taken to solve this problem.

## Grid data structure
The grid can be represented as a 2D array. The first level of the array being the grid itself, the 2nd level being arrays representing rows. Columns are represented as elements within the 2nd level arrays.

The fillBoard function uses the columns and rows variables to create a grid with default values using nested for loops.

## Mine generation
Mines need to occupy a unique spot within the data structure. Random generation of index values alongside a condition to check if a mine already exists there will solve this.

generateMines function uses a for loop to generate the x,y values. The y index targets the row and x the column.

A do while loop is used, as we must randomly generate x,y values at least once and the condition is used to prevent overwriting existing mines. Random generation is within the grid’s boundaries.

## Clue generation
The 2D array data structure allows us to traverse to any neighbouring cells with any given cell’s index values.

countNeighbourMines uses two nested for loops to iterate over all cells within the grid.

Two further loops are used for traversal from each cell. Both loops start at -1 and increment to 1. This allows us to use the current cells index as a basis for traversal, where the iterators move along the x,y axis of the cells checking for mines..

A condition is in place to prevent traversal outside of the grid.

# The result/outcome
I’m happy that the challenge criteria has been met and represented accurately within the grid using appropriate methods.
