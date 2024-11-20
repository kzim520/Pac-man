document.addEventListener('DOMContentLoaded', () => {
  // set up canvas
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')
  // intialize variables and constants
  const width = 28
  const height = 28
  const tileSize = 20
  const scoreDisplay = document.getElementById('score')
  const winScore = 300
  const multiplier = 10
  let score = 0
  let pacmanCurrPos = 490
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

  // Initialize ghosts
  class Ghost {
    constructor(className, startIndex, speed, color) {
      this.className = className
      this.currentIndex = startIndex
      this.startIndex = startIndex
      this.isScared = false
      this.speed = speed
      this.color = color
      this.timerID = NaN
    }
  }

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
    
    // Draw Pac-Man
    drawPacman()

    // Draw ghosts
    drawGhosts()

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
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 5, 0, Math.PI * 2)
          ctx.fill()
        }
        // Draw walls
        if (tile === 1) {
          ctx.fillStyle = 'blue'
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
        // if (tile === 4) {
        //   ctx.fillStyle = 'black'
        //   ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
        // }
      }
    }
  }

  // Draw Pac-Man
  function drawPacman() {
    const row = Math.floor(pacmanCurrPos / width)
    const col = pacmanCurrPos % width
    ctx.fillStyle = 'yellow'
    ctx.beginPath()
    ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 10, 0, Math.PI * 2)
    ctx.fill()
  }

  // Draw ghosts
  function drawGhosts() {
    ghosts.forEach(ghost => {
      const row = Math.floor(ghost.currentIndex / width)
      const col = ghost.currentIndex % width
      ctx.fillStyle = ghost.isScared ? 'aqua' : ghost.color
      ctx.beginPath()
      ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 10, 0, Math.PI * 2)
      ctx.fill()
    })
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

  function movePacman(e) {
    const key = e.key;  // Get the key pressed
  
    // Determine the direction to move based on the key
    let nextPos = pacmanCurrPos;
    
    // Check for valid moves based on the direction
    if (key === 'ArrowUp') {
      // Make sure Pac-Man isn't moving out of bounds (no wrapping on vertical edges)
      if (pacmanCurrPos - width >= 0 && layout[pacmanCurrPos - width] !== 1 && layout[pacmanCurrPos - width] !== 2) {
        nextPos -= width;  // Move up
      }
    } else if (key === 'ArrowDown') {
      // Make sure Pac-Man isn't moving out of bounds
      if (pacmanCurrPos + width < layout.length && layout[pacmanCurrPos + width] !== 1 && layout[pacmanCurrPos + width] !== 2) {
        nextPos += width;  // Move down
      }
    } else if (key === 'ArrowLeft') {
      // Ensure Pac-Man doesn't move out of bounds on the left side
      if (pacmanCurrPos % width !== 0 && layout[pacmanCurrPos - 1] !== 1 && layout[pacmanCurrPos - 1] !== 2) {
        nextPos -= 1;  // Move left
      }
    } else if (key === 'ArrowRight') {
      // Ensure Pac-Man doesn't move out of bounds on the right side
      if ((pacmanCurrPos + 1) % width !== 0 && layout[pacmanCurrPos + 1] !== 1 && layout[pacmanCurrPos + 1] !== 2) {
        nextPos += 1;  // Move right
      }
    }
  
    // Update pacmanCurrPos with the new position if it's valid
    pacmanCurrPos = nextPos;
  
    // Call functions to check for events
    pacDotEaten();
    powerPelletEaten();
    checkGhostEaten();
    checkForGameOver();
    checkForWin();
    
    // Redraw the game state after moving Pac-Man
    gameLoop();
  }

  function moveGhost(ghost) {
    const directions = [-1, 1, -width, width]; // left, right, up, down
    const validMoves = [];
    
    // Determine the potential new positions for the ghost based on each direction
    directions.forEach(direction => {
      const nextPos = ghost.currentIndex + direction;
      // Check if next move is valid
      if (nextPos >= 0 && 
          nextPos < layout.length && 
          layout[nextPos] !== 1 && 
          !isGhostAtPosition(nextPos)) {
            validMoves.push(nextPos);  // Add valid positions to the list
      }
    });
  
    if (validMoves.length > 0) {
      // Pick a random valid move
      const moveDirection = validMoves[Math.floor(Math.random() * validMoves.length)];
      // Update the ghost's current position
      ghost.currentIndex = moveDirection;
    }
  
    // If the ghost is scared, they move in the opposite direction
    if (ghost.isScared) {
      // If the ghost is scared, reverse their movement direction by flipping the direction.
      directions.reverse(); 
    }
    // Check is ghost was eaten or a ghost eats pacman
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
        drawGhosts();  // Redraw the ghosts after moving them
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
      setTimeout(scareReset, 10000) // <----------------- FIX
      layout[pacmanCurrPos] = 4  // Remove power pellet after eating
    }
  }

  // check if ghost eats pacman
  function checkForGameOver() {
      ghosts.forEach(ghost => {
        if (pacmanCurrPos === ghost.currentIndex && !ghost.isScared) {
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

  // Event listener for Pac-Man movement
  document.addEventListener('keydown', movePacman)
})  