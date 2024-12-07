document.addEventListener('DOMContentLoaded', () => {
  // set up canvas
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  // intialize variables and constants
  const width = 28;
  const height = 28;
  const tileSize = 25;
  const scoreDisplay = document.getElementById('score');
  const winScore = Infinity;
  const multiplier = 10;
  let score = 0;
  let pacmanCurrPos = 490;
  let pacmanDirection = null; // Track the current movement direction
  let moveInterval = null; // Interval to move Pac-Man continuously
  let scareTimeoutId = null;
  let gameOverTimeoutId = null;
  let gameLoopId = null;
  let isGameOver = false;
  let leftCount = 0;
  let rightCount = 0;
  let upCount = 0;
  let downCount = 0;
  let topScores = [];

  // welcome page
  const welcomePage = document.getElementById('welcomePage');
  const startButton = document.getElementById('startButton');
  const scoreLabel = document.getElementById('scoreDisplay');
  const instructions = document.getElementById('left-container');
  const warning = document.getElementById('right-container');
  
  const scoreList = document.getElementById('scoresList');

  showWelcomePage();
  startButton.addEventListener('click', startGame);

  // game over popup
  const gameOverPopup = document.getElementById('gameOver');
  // Reset the game
  document.getElementById('restart').addEventListener('click', () => {
    resetGame();
    startGame();
    document.getElementById('gameOver').style.display = 'none';
  });
  // Quit button, return to welcome page
  document.getElementById('quit').addEventListener('click', () => {
    resetGame();
    showWelcomePage();
    document.getElementById('gameOver').style.display = 'none';
  });


  // 0 - pac-dots, 1 - wall, 2 - ghost-lair, 3 - power-pellet, 4 - empty
  const layout = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 2, 2, 2, 2, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 3, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 3, 0, 0, 4, 4, 4, 4, 4, 4,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1,
    1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ];
  const originalLayout = [...layout];

  // initialize array of ghosts
  const ghosts = [
    new Ghost('blinky', 348, 250, 'red'),
    new Ghost('pinky', 404, 250, 'pink'),
    new Ghost('clyde', 407, 250, 'orange'),
    new Ghost('inky', 351, 250, 'blue')
  ];

  // game loop function
  function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)  // Clear the canvas

    // Redraw the board
    createBoard()

    // Call functions to update the game state
    pacDotEaten();
    powerPelletEaten();
    checkGhostEaten();
    checkForGameOver();
    checkForWin();
    
    // Draw Pac-Man
    drawPacman();

    // Draw ghosts
    drawGhosts();

    // Request the next frame
    gameLoopId = requestAnimationFrame(gameLoop)
  }

  function showWelcomePage() {
    welcomePage.style.display = 'flex';
    canvas.style.display = 'none';
    scoreLabel.style.display = 'none';
    instructions.style.visibility = 'hidden';
    warning.style.visibility = 'hidden';
  }

  // Start the game
  function startGame() {
    welcomePage.style.display = 'none'; // Hide the welcome page
    scoreLabel.style.display = 'block';
    canvas.style.display = 'block'; // Show the game canvas
    instructions.style.visibility = 'visible';
    warning.style.visibility = 'visible';
    gameLoop(); // Start the game loop
    startGhostMovement(); // Start ghost movement
  }

  function resetGame() {
    if (moveInterval) {
      clearInterval(moveInterval);
    }
    if (gameLoopId) {
      cancelAnimationFrame(gameLoopId);
    }
    ghosts.forEach(ghost => clearInterval(ghost.timerID))
    // reset game state
    score = 0;
    scoreDisplay.textContent = score;
    pacmanCurrPos = 490
    pacmanDirection = null; 
    moveInterval = null; 
    scareTimeoutId = false;
    leftCount = 0;
    rightCount = 0;
    upCount = 0;
    downCount = 0;
    isGameOver = false;
    gameOverTimeoutId = null;
    gameLoopId = null;
    // Reset board state
    layout.length = 0; 
    layout.push(...originalLayout);
    // Reset ghosts to their initial positions
    ghosts.forEach(ghost => {
      ghost.isScared = false; // Reset the scared state
      ghost.currentIndex = ghost.startIndex; // Reset position
    });
  }

  function createBoard() {
    ctx.fillStyle = 'black'; // Choose your desired color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const index = row * width + col;
        const tile = layout[index];
        // Draw pac-dots
        if (tile === 0) {
          ctx.fillStyle = "#ea82e5";
          ctx.beginPath();
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        // Draw walls
        if (tile === 1) {
          // Check if wall is adjacent to pac-dots, power-pellets, or empty space in each direction
          const isLeftAdjacentToPathway = (layout[index - 1] === 0 || layout[index - 1] === 3 || layout[index - 1] === 4);
          const isRightAdjacentToPathway = (layout[index + 1] === 0 || layout[index + 1] === 3 || layout[index + 1] === 4);
          const isUpAdjacentToPathway = (layout[index - width] === 0 || layout[index - width] === 3 || layout[index - width] === 4);
          const isDownAdjacentToPathway = (layout[index + width] === 0 || layout[index + width] === 3 || layout[index + width] === 4);
          
          // Draw the wall tile
          ctx.fillStyle = 'black';
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
          ctx.strokeStyle = '#46bfee';  // Red border (change to preferred color)
          ctx.lineWidth = 2;            // Border thickness
          ctx.beginPath();
      
          // Add border on the left if the left side is adjacent to a pathway
          if (isLeftAdjacentToPathway) {
              ctx.moveTo(col * tileSize, row * tileSize); // Start at the left side of the tile
              ctx.lineTo(col * tileSize, row * tileSize + tileSize); // Draw border to the bottom
          }
          // Add border on the right if the right side is adjacent to a pathway
          if (isRightAdjacentToPathway) {
              ctx.moveTo(col * tileSize + tileSize, row * tileSize); // Start at the right side of the tile
              ctx.lineTo(col * tileSize + tileSize, row * tileSize + tileSize); // Draw border to the bottom
          }
          // Add border on the top if the top side is adjacent to a pathway
          if (isUpAdjacentToPathway) {
              ctx.moveTo(col * tileSize, row * tileSize); // Start at the top left corner
              ctx.lineTo(col * tileSize + tileSize, row * tileSize); // Draw border to the top right corner
          }
          // Add border on the bottom if the bottom side is adjacent to a pathway
          if (isDownAdjacentToPathway) {
              ctx.moveTo(col * tileSize, row * tileSize + tileSize); // Start at the bottom left corner
              ctx.lineTo(col * tileSize + tileSize, row * tileSize + tileSize); // Draw border to the bottom right corner
          }
          ctx.stroke();
        }
        // draw ghost lair
        if (tile === 2) {
          ctx.fillStyle = 'beige';
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
        // Draw power pellets
        if (tile === 3) {
          const powerPelletRadius = 6;  
          const pelletOutline = powerPelletRadius + 1; 
      
          // Draw the white border first (larger circle)
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 1; // Thickness of the white border
          ctx.beginPath();
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, pelletOutline, 0, Math.PI * 2);
          ctx.stroke();
      
          // Draw the smaller purple power pellet
          ctx.fillStyle = '#14FE64';
          ctx.beginPath();
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, powerPelletRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  function drawPacman() {
    const row = Math.floor(pacmanCurrPos / width);
    const col = pacmanCurrPos % width;
    let pacmanSprite;
    
    switch (pacmanDirection) {
      case 'up':
        if (upCount === 0 || upCount === 2 || upCount === 4){
          pacmanSprite = pacmanSprites.up;
        } else if (upCount === 1){
          pacmanSprite = pacmanSprites.wideUp;
        } else if (upCount === 3){
          pacmanSprite = pacmanSprites.closed;
        }
        break;
      case 'down':
        if (downCount === 0 || downCount === 2 || downCount === 4){
          pacmanSprite = pacmanSprites.down;
        } else if (downCount === 1){
          pacmanSprite = pacmanSprites.wideDown;
        } else if (downCount === 3){
          pacmanSprite = pacmanSprites.closed;
        }
        break;
      case 'left':
        if (leftCount === 0 || leftCount === 2 || leftCount === 4){
          pacmanSprite = pacmanSprites.left;
        } else if (leftCount === 1){
          pacmanSprite = pacmanSprites.wideLeft;
        } else if (leftCount === 3){
          pacmanSprite = pacmanSprites.closed;
        }
        break;
      case 'right':
        if (rightCount === 0 || rightCount === 2 || rightCount === 4){
          pacmanSprite = pacmanSprites.right;
        } else if (rightCount === 1){
          pacmanSprite = pacmanSprites.wideRight;
        } else if (rightCount === 3){
          pacmanSprite = pacmanSprites.closed;
        }
        break;
      default:
        pacmanSprite = pacmanSprites.closed;  // Default to right if no direction
    }
  
    // Draw Pac-Man's sprite at the correct position
    if (pacmanSprite.complete) {
      ctx.drawImage(pacmanSprite, col * tileSize, row * tileSize, tileSize, tileSize);
    } else {
      console.log("Pac-Man sprite not loaded yet.");
    }
  }

  function drawGhosts() {
    let ghostSprite;
    ghosts.forEach(ghost => {
      const row = Math.floor(ghost.currentIndex / width);
      const col = ghost.currentIndex % width;
      switch (ghost.className) {
        case 'blinky':
          ghostSprite = blinkySprites.left;
          break;
        case 'inky':
          ghostSprite = inkySprites.left;
          break;
        case 'clyde':
          ghostSprite = clydeSprites.left;
          break;
        case 'pinky':
          ghostSprite = pinkySprites.left;
          break;
      }
      if (ghost.isScared) {
        ghostSprite = scaredSprites.scared // Add a sprite for scared state
      }
  
      // Draw the ghost's sprite at the correct position
      ctx.drawImage(ghostSprite, col * tileSize, row * tileSize, tileSize, tileSize);
    });
  }

  function checkGhostEaten() {
    ghosts.forEach(ghost => {
      if (ghost.isScared && pacmanCurrPos === ghost.currentIndex) {
        // If the ghost is scared and Pac-Man eats it
        ghost.isScared = false; // Reset the ghost's scared state
        ghost.currentIndex = ghost.startIndex; // Move ghost back to its start position
        score += (10 * multiplier); // Increase score based on multiplier
        scoreDisplay.textContent = score; // Update score display
      }
    });
  }

  // event listener to track players keystorkes
  document.addEventListener('keyup', (e) => {
    const key = e.key;
    // pause game
    if (key === 'p') {
      alert('game paused');
    }
    // array for directions
    const directions = [-1, 1, -width, width]; // left, right, up, down
    const validDirections = [];
    
    directions.forEach(direction => {
      const nextPos = pacmanCurrPos + direction;
      // Check if next move is valid
      if (nextPos >= 0 && 
          nextPos < layout.length && 
          layout[nextPos] !== 1 &&
          layout[nextPos] !== 2) {
            validDirections.push(direction);  // Add valid directions to the list
      }
    });
    // Check if the key is a direction key and if it's different from the current direction
    if (key === 'ArrowUp' && pacmanDirection !== 'up' && validDirections.includes(-width)) {
      pacmanDirection = 'up';
    } else if (key === 'ArrowDown' && pacmanDirection !== 'down' && validDirections.includes(width)) {
      pacmanDirection = 'down';
    } else if (key === 'ArrowLeft' && pacmanDirection !== 'left' && validDirections.includes(-1)) {
      pacmanDirection = 'left';
    } else if (key === 'ArrowRight' && pacmanDirection !== 'right'&& validDirections.includes(1)) {
      pacmanDirection = 'right';
    }
    startMoving();
  });

  // Function to start moving Pac-Man continuously
  function startMoving() {
    // If Pac-Man is already moving, clear the previous interval
    if (moveInterval) {
      clearInterval(moveInterval);
    }
    // Set an interval to move Pac-Man every 125 ms
    moveInterval = setInterval(() => {
      movePacman(pacmanDirection);
    }, 150);
  }

  // Move Pac-Man based on the direction
  function movePacman(direction) {
    let nextPos = pacmanCurrPos;

    // Logic to update Pac-Man's position based on the current direction
    if (direction === 'up') {
      if (upCount === 4) {
        upCount = 0;
      } else {
        upCount++;
      }
      if (pacmanCurrPos - width >= 0 && layout[pacmanCurrPos - width] !== 1 && layout[pacmanCurrPos - width] !== 2) {
        nextPos -= width;
      }
    } else if (direction === 'down') {
      if (downCount === 4) {
        downCount = 0;
      } else {
        downCount++;
      }
      if (pacmanCurrPos + width < layout.length && layout[pacmanCurrPos + width] !== 1 && layout[pacmanCurrPos + width] !== 2) {
        nextPos += width;
      }
    } else if (direction === 'left') {
      if (leftCount === 4) {
        leftCount = 0;
      } else {
        leftCount++;
      }
      if (pacmanCurrPos % width !== 0 && layout[pacmanCurrPos - 1] !== 1 && layout[pacmanCurrPos - 1] !== 2) {
        nextPos -= 1;
      }
      if (pacmanCurrPos === 364) {
        nextPos = 391;
      }
    } else if (direction === 'right') {
      if (rightCount === 4) {
        rightCount = 0;
      } else {
        rightCount++;
      }
      if ((pacmanCurrPos + 1) % width !== 0 && layout[pacmanCurrPos + 1] !== 1 && layout[pacmanCurrPos + 1] !== 2) {
        nextPos += 1;
      }
      if (pacmanCurrPos === 391) {
        nextPos = 364;
      }
    }

    // Update the position if the next position is valid
    pacmanCurrPos = nextPos;

    // Call functions to check for events
    pacDotEaten();
    powerPelletEaten();
    checkGhostEaten();
    checkForGameOver();
    checkForWin();

    // Redraw the game state after moving Pac-Man
    gameLoopId = requestAnimationFrame(gameLoop)
  }

  function moveGhost(ghost) {
    const directions = [-1, 1, -width, width]; // left, right, up, down
    let bestMove = null;
    let minDistance = Infinity;
    let maxDistance = 0;
  
    // BFS to find the shortest path to Pac-Man
    const path = BFS(ghost.currentIndex, pacmanCurrPos);
  
    if (path && path.length > 0 && !ghost.isScared) {
      // The first step in the shortest path
      bestMove = path[0];
    } else {
      directions.forEach(direction => {
        const nextPos = ghost.currentIndex + direction;
        if (nextPos >= 0 && nextPos < layout.length &&
            layout[nextPos] !== 1 && // not a wall
            !isGhostAtPosition(nextPos)) { // not another ghost
          const distanceToPacman = manhattanDistance(nextPos, pacmanCurrPos);
          if (!ghost.isScared) {
            if (distanceToPacman < minDistance) {
              minDistance = distanceToPacman;
              bestMove = nextPos;
            }
          } else {
            if (distanceToPacman > maxDistance) {
              maxDistance = distanceToPacman;
              bestMove = nextPos;
            }
          }
        }
      });
    }
  
    // If a valid best move was found, move the ghost there
    if (bestMove !== null) {
      ghost.currentIndex = bestMove;
    }
  
    // Check if ghost ate Pac-Man or Pac-Man ate the ghost
    checkGhostEaten();
    checkForGameOver();
  }
  
  // BFS to find the shortest path to Pac-Man
  function BFS(start, target) {
    const queue = [[start]]; // queue holds arrays of positions representing the path
    const visited = new Set(); // set to keep track of visited positions
    const directions = [-1, 1, -width, width]; // left, right, up, down
  
    visited.add(start);
  
    while (queue.length > 0) {
      const path = queue.shift(); // Get the first path in the queue
      const current = path[path.length - 1]; // Current position in the path
  
      if (current === target) {
        return path.slice(1); // Exclude the start position
      }
  
      // Explore all possible directions
      directions.forEach(direction => {
        const nextPos = current + direction;
  
        if (nextPos >= 0 && nextPos < layout.length &&
            layout[nextPos] !== 1 && // not a wall
            !visited.has(nextPos)) { // not visited yet
          visited.add(nextPos);
          queue.push([...path, nextPos]);
        }
      });
    }
  
    // If no path is found, return null
    return null;
  }

  function manhattanDistance(pos1, pos2) {
    const row1 = Math.floor(pos1 / width);
    const col1 = pos1 % width;
    const row2 = Math.floor(pos2 / width);
    const col2 = pos2 % width;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  }

  // Helper function to check if a ghost is already at a specific position
  function isGhostAtPosition(position) {
    return ghosts.some(ghost => ghost.currentIndex === position);
  }

  // Reset scared ghosts after power pellet effect
  function scareReset() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  function startGhostMovement() {
    ghosts.forEach(ghost => {
      ghost.timerID = setInterval(() => {
        moveGhost(ghost);
      }, ghost.speed);  // Speed is the movement interval (in ms)
    });
  }

  // Pac-Dot collision detection and scoring
  function pacDotEaten() {
    const row = Math.floor(pacmanCurrPos / width)
    const col = pacmanCurrPos % width
    if (layout[pacmanCurrPos] === 0) {
      score++
      scoreDisplay.textContent = score
      layout[pacmanCurrPos] = 4  // Empty space after Pac-Man eats the dot
    }
  }

  // Power pellet logic and scare ghosts
  function powerPelletEaten() {
    const row = Math.floor(pacmanCurrPos / width)
    const col = pacmanCurrPos % width
    if (layout[pacmanCurrPos] === 3) {
      score += multiplier
      scoreDisplay.textContent = score
      ghosts.forEach(ghost => ghost.isScared = true)
      if (scareTimeoutId) {
        clearTimeout(scareTimeoutId);
      }
      scareTimeoutId = setTimeout(() => scareReset(), 10000);
      layout[pacmanCurrPos] = 4  // Remove power pellet after eating
    }
  }

  // check if ghost eats pacman
  function checkForGameOver() {
    if (isGameOver) return;

    ghosts.forEach(ghost => {
      if (pacmanCurrPos === ghost.currentIndex && !ghost.isScared) {
        isGameOver = true;
        clearInterval(moveInterval);
        ghosts.forEach(ghost => clearInterval(ghost.timerID));
        if (gameOverTimeoutId) {
          clearTimeout(gameOverTimeoutId);
        }
        if (gameLoopId !== null) {
          cancelAnimationFrame(gameLoopId);
        }
        gameOverTimeoutId = setTimeout(() => {
          gameOverPopup.style.display = 'block';
          showTopScores();
        }, 500);
      }
    });
  }  
  
  // check for win
  function checkForWin() {
    if (score >= winScore) {
      ghosts.forEach(ghost => clearInterval(ghost.timerID))
      document.removeEventListener('keydown', movePacman)
      setTimeout(function() { alert('You Win!')}, 500)
    }
  }

  function showTopScores() {
    topScores.push(score);
    topScores.sort((a, b) => b - a);
    if (topScores.length > 3) {
      topScores = topScores.slice(0, 3);
    }
    scoreList.innerHTML = '';
    topScores.forEach((score, index) => {
      let scoreItem = document.createElement("li");
      scoreItem.textContent = `#${index + 1} Score: ${score}`;
      scoreList.appendChild(scoreItem);
    });
  }
})  