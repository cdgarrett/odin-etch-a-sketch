let DRAW_COLOR = "#000000";
let GRID_SIZE = 16;

// Clear previous input values
window.onload = function()
{
  document.getElementById('color-picker').value = "";
}

let gridCtr = document.querySelector('#grid-ctr');

// Set up default 16x16 grid
createGrid();

// Set up buttons
document.querySelector('#reset-btn').addEventListener('click', resetGrid);
document.querySelector('#size-btn').addEventListener('click', changeGridSize);
document.querySelector('#color-picker').addEventListener('change', updateDrawColor);
document.querySelector('#random-color-btn').addEventListener('click', updateDrawColor);


/**
 * Function: createGrid
 * Summary:  Removes all existing children of the grid container,
 *           creates & appends new children to the container, updates
 *           the grid template size, and adds listeners to new children.
 * Used by:  Startup, changeGridSize().
 * Inputs:   None.
 * Returns:  None.
*/
function createGrid()
{
  // Remove the old grid square children
  while(gridCtr.firstChild)
  {
    gridCtr.removeChild(gridCtr.firstChild);
  }

  // Create new grid square children
  for (let i = 0; i < GRID_SIZE; i++)
  {
    for (let j = 0; j < GRID_SIZE; j++)
    {
      let gridSquare = document.createElement('div');
      gridSquare.classList.add("grid-square");
      gridCtr.append(gridSquare);
    }
  }

  // Update the grid size CSS
  gridCtr.style['grid-template-rows'] = `repeat(${GRID_SIZE}, 1fr)`;
  gridCtr.style['grid-template-columns'] = `repeat(${GRID_SIZE}, 1fr)`;

  // Add mouse-enter listeners to the new grid square children
  let gridSquares = document.querySelectorAll('.grid-square');
  gridSquares.forEach(square => square.addEventListener('mouseenter', fillSquare));
}

/**
 * Function: changeGridSize
 * Summary:  Prompts user for a new grid size, validates input,
 *           updates the global GRID_SIZE, and creates a new grid.
 * Used by:  Grid size button listener.
 * Inputs:   Event e
 * Returns:  None.
*/
function changeGridSize(e)
{
  let newSize = prompt('Enter a new grid size (1+):', '16');
  if (newSize < 1)
    alert(`Grid size of ${newSize} is invalid.  Grid must be at least 1 square in size.`);
  else
  {
    GRID_SIZE = newSize;
    createGrid();
  }
}

/**
 * Function: resetGrid
 * Summary:  Removes all inline styles (colors) from the grid.
 * Used by:  Grid reset button listener.
 * Inputs:   Event e
 * Returns:  None.
*/
function resetGrid(e)
{
  document.querySelectorAll('.grid-square').forEach(square => square.style = "");
}

/**
 * Function: updateDrawColor
 * Summary:  Updates global DRAW_COLOR to "RANDOM" if called from the
 *           Random button listener, or the currently selected color
 *           from the color input element.
 * Used by:  Random color button listener, Color input change listener.
 * Inputs:   Event e
 * Returns:  None.
*/
function updateDrawColor(e)
{
  if (e.target.tagName === 'BUTTON')
    DRAW_COLOR = "RANDOM";
  else
    DRAW_COLOR = e.target.value;
}

/**
 * Function: fillSquare
 * Summary:  Sets the background color for a grid square that
 *           has detected a mouseenter event.
 * Used by:  Mouse enter listener on each grid square.
 * Inputs:   Event e
 * Returns:  None.
*/
function fillSquare(e)
{
  if (DRAW_COLOR === "RANDOM")
    this.style['background-color'] = `rgb(${getRandRGB()}, ${getRandRGB()}, ${getRandRGB()})`;
  else
    this.style['background-color'] = DRAW_COLOR;
}

/**
 * Function: getRandRGB
 * Summary:  Generates a random number between 0 and 255.
 * Used by:  fillSquare()
 * Inputs:   None.
 * Returns:  Random number b/t 0 and 255.
*/
function getRandRGB()
{
  return Math.floor(Math.random()*256);
}