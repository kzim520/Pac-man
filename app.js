document.addEventListener('DOMContentLoaded', () => {
  // set up canvas
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  // intialize variables and constants
  const width = 28
  const height = 28
  const tileSize = 20
  const scoreDisplay = document.getElementById('score')
  const winScore = Infinity
  const multiplier = 10
  let score = 0
  let pacmanCurrPos = 490
  let pacmanDirection = null; // Track the current movement direction
  let moveInterval = null; // Interval to move Pac-Man continuously
  let scareTimeoutId;
  let leftCount = 0;
  let rightCount = 0;
  let upCount = 0;
  let downCount = 0;

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
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2, 2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1,
    4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2, 2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4,
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
  ]

  // initialize array of ghosts
  const ghosts = [
    new Ghost('blinky', 348, 250, 'red'),
    new Ghost('pinky', 376, 400, 'pink'),
    new Ghost('clyde', 379, 500, 'orange'),
    new Ghost('inky', 351, 300, 'blue')
  ]

  // Start the game loop
  gameLoop()
  startGhostMovement()

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
    requestAnimationFrame(gameLoop)
  }

  function createBoard() {
    ctx.fillStyle = 'gray'; // Choose your desired color
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        const tile = layout[index]
        // Draw pac-dots
        if (tile === 0) {
          ctx.fillStyle = 'purple'
          ctx.beginPath()
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 2, 0, Math.PI * 2)
          ctx.fill()
        }
        // Draw walls
        if (tile === 1) {
          ctx.fillStyle = 'black'
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
        }
        // draw ghost lair
        if (tile === 2) {
          ctx.fillStyle = 'beige'
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
        }
        // Draw power pellets
        if (tile === 3) {
          ctx.fillStyle = 'purple'
          ctx.beginPath()
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 10, 0, Math.PI * 2)
          ctx.fill()
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

  document.addEventListener('keyup', (e) => {
    const key = e.key;
    console.log(key);

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

  // Function to stop moving Pac-Man (when the key is released or a direction change occurs)
  function stopMoving() {
    if (moveInterval) {
      clearInterval(moveInterval);
    }
    moveInterval = null;
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
    } else if (direction === 'right') {
      if (rightCount === 4) {
        rightCount = 0;
      } else {
        rightCount++;
      }
      if ((pacmanCurrPos + 1) % width !== 0 && layout[pacmanCurrPos + 1] !== 1 && layout[pacmanCurrPos + 1] !== 2) {
        nextPos += 1;
      }
    }

    // Update the position if the next position is valid
    pacmanCurrPos = nextPos;

    // Call functions to check for events (like eating dots, power pellets, etc.)
    pacDotEaten();
    powerPelletEaten();
    checkGhostEaten();
    checkForGameOver();
    checkForWin();

    // Redraw the game state after moving Pac-Man
    gameLoop();
  }

  // Event listener for keyup (to stop movement when the key is released)
  document.addEventListener('keyup', (e) => {
    if (e.key === ' '){ 
      stopMoving();
    }
  });

  // function moveGhost(ghost) {
  //   const directions = [-1, 1, -width, width]; // left, right, up, down
  //   const validMoves = [];
    
  //   // Determine the potential new positions for the ghost based on each direction
  //   directions.forEach(direction => {
  //     const nextPos = ghost.currentIndex + direction;
  //     // Check if next move is valid
  //     if (nextPos >= 0 && 
  //         nextPos < layout.length && 
  //         layout[nextPos] !== 1 && 
  //         !isGhostAtPosition(nextPos)) {
  //           validMoves.push(nextPos);  // Add valid positions to the list
  //     }
  //   });
  
  //   if (validMoves.length > 0) {
  //     // Pick a random valid move
  //     const moveDirection = validMoves[Math.floor(Math.random() * validMoves.length)];
  //     validMoves.forEach(move => {

  //     })
  //     // Update the ghost's current position
  //     ghost.currentIndex = moveDirection;
  //   }
  
  //   // If the ghost is scared, they move in the opposite direction
  //   if (ghost.isScared) {
  //     // If the ghost is scared, reverse their movement direction by flipping the direction.
  //     directions.reverse(); 
  //   }
  //   // Check is ghost was eaten or a ghost eats pacman
  //   checkGhostEaten();
  //   checkForGameOver();
  // }

  function manhattanDistance(pos1, pos2) {
    const row1 = Math.floor(pos1 / width);
    const col1 = pos1 % width;
    const row2 = Math.floor(pos2 / width);
    const col2 = pos2 % width;
    return Math.abs(row1 - row2) + Math.abs(col1 - col2);
  }

  function moveGhost(ghost) {
    const directions = [-1, 1, -width, width]; // left, right, up, down
    let bestMove = null;
    let minDistance = Infinity;
    let maxDistance = 0;
  
    // Iterate through all possible directions (left, right, up, down)
    directions.forEach(direction => {
      const nextPos = ghost.currentIndex + direction;
      if (!ghost.isScared){
        // Check if next move is valid (within bounds and not a wall or ghost)
        if (nextPos >= 0 && nextPos < layout.length &&
            layout[nextPos] !== 1 && // not a wall
            !isGhostAtPosition(nextPos)) { // not another ghost
            
          const distanceToPacman = manhattanDistance(nextPos, pacmanCurrPos);
    
          // Choose the move with the smallest distance to Pac-Man
          if (distanceToPacman < minDistance) {
            minDistance = distanceToPacman;
            bestMove = nextPos;
          }
        }
      } else {
        // Check if next move is valid (within bounds and not a wall or ghost)
        if (nextPos >= 0 && nextPos < layout.length &&
          layout[nextPos] !== 1 && // not a wall
          !isGhostAtPosition(nextPos)) { // not another ghost
          
        const distanceToPacman = manhattanDistance(nextPos, pacmanCurrPos);
  
        // Choose the move with the smallest distance to Pac-Man
        if (distanceToPacman > maxDistance) {
          maxDistance = distanceToPacman;
          bestMove = nextPos;
        }
      }
      }
    });
    
  
    // If a valid best move was found, move the ghost there
    if (bestMove !== null) {
      ghost.currentIndex = bestMove;
    }
    
    // Check if ghost ate Pac-Man or Pac-Man ate the ghost
    checkGhostEaten();
    checkForGameOver();
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
      ghosts.forEach(ghost => {
        if (pacmanCurrPos === ghost.currentIndex && !ghost.isScared) {
          clearInterval(moveInterval);
          ghosts.forEach(ghost => clearInterval(ghost.timerID));
          setTimeout(() => {
            alert('Game Over');
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
})  