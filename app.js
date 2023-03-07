document.addEventListener('DOMContentLoaded', () => {
  // --- Setting up
  // Grid and squares
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));

  // Score & button
  const scoreDisplay = document.querySelector('#score');
  const startBtn = document.querySelector('#start-button');

  // Number of squares per line
  const width = 10;

  // --- The Tetrominoes (falling shapes)
  const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2, width*2+1],
    [width, width*2, width*2+1, width*2+2]
  ]

  const zTetromino = [
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1]
  ]

  const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
  ]

  const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
  ]

  const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
  ]

  const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  // Where we want to start drawing the tetrominoes
  let currentPosition = 4;  // starts in the 5th div, 1st line
  let currentRotation = 0

  // Randomly selects a Tetromino
  //
  // let current = theTetrominoes[0][0];  --> NB: 1st position of the 1st item of the array (L shape)
  //
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];



  //  Draw the Tetromino
  function draw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino');
    })
  }

  // Undraw the Tetromino
  function undraw() {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino');
    })
  }

  // Make the Tetromino move down every second
  timerId = setInterval(moveDown, 1000);

  // Assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode === 38) {
      // rotate

    } else if (e.keyCode === 39) {
      // moveRight

    } else if (e.keyCode === 40) {
      // falls

    }
  }
  document.addEventListener('keyup', control);

  // Move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // Freeze function
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      // the current shape freezes when it touches the bottom or another frozen shape
      current.forEach(index => squares[currentPosition + index].classList.add('taken'));

      // Start a new Tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // Move the tetromino left, unless is at the edge or there is a blockage
  function moveLeft() {
    undraw();
    // check if the position is 0, 10, 20, etc...
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);

    // if it's not on the left edge, goes left
    if (!isAtLeftEdge) currentPosition -=1;

    // moves the shape back to the right if it touches a square with the class "taken", so it looks like the shape hasn't moved
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition +=1;
    }

    draw();
  }

  function moveRight() {
    undraw();
    // check if the position is 9, 19, 29, etc...


    // if it's not on the right edge, goes right

    // moves the shape back to the left if it touches a square with the class "taken"

    draw();
  }





})