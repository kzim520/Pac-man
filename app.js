document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas')
  const ctx = canvas.getContext('2d')

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
  // intialize array store the squares as they're made
  const squares = []

  function createBoard() {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const index = row * width + col
        const tile = layout[index]
        
        // Draw walls
        if (tile === 1) {
          ctx.fillStyle = 'green'
          ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize)
        }
        // Draw pac-dots
        if (tile === 0) {
          ctx.fillStyle = 'orange'
          ctx.beginPath()
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 5, 0, Math.PI * 2)
          ctx.fill()
        }
        // Draw power pellets
        if (tile === 3) {
          ctx.fillStyle = 'orange'
          ctx.beginPath()
          ctx.arc(col * tileSize + tileSize / 2, row * tileSize + tileSize / 2, 10, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }

  // Draw Pac-Man
  function drawPacman() {
    const row = Math.floor(pacmanCurrPos / width)
    const col = pacmanCurrPos % width
    ctx.fillStyle = 'gray'
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

  // Start the game loop
  gameLoop()

  // Handle key presses for Pac-Man movement
  function movePacman(e) {
    // Logic to update pacmanCurrPos based on arrow key input...
    // Don't forget to update the drawing (which is handled by the gameLoop function)
  }

  // Event listener for Pac-Man movement
  document.addEventListener('keydown', movePacman)

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

  // Ghosts' movement logic (already in your original code)
  function moveGhost(ghost) {
    // Logic to move the ghosts on the canvas...
  }

  // Power pellet logic and scare ghosts
  function powerPelletEaten() {
    const row = Math.floor(pacmanCurrPos / width)
    const col = pacmanCurrPos % width
    if (layout[pacmanCurrPos] === 3) {
      score += scoreMul
      scoreDisplay.textContent = score
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(scareReset, 10000)
      layout[pacmanCurrPos] = 4  // Remove power pellet after eating
    }
  }

  // Reset scared ghosts after power pellet effect
  function scareReset() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // Add game-over and win checks (already in your original code)
  // is game over?
  function checkForGameOver () {
    if (squares[pacmanCurrPos].classList.contains('ghost') &&
        !squares[pacmanCurrPos].classList.contains('scared-ghost')){
          ghosts.forEach(ghost => clearInterval(ghost.timerID))
          document.removeEventListener('keyup', movePacman)
          setTimeout(function() { alert('Game Over')}, 500)
        }
  }

  // check for win
  function checkForWin() {
    if (score >= winScore) {
      ghosts.forEach(ghost => clearInterval(ghost.timerID))
      document.removeEventListener('keyup', movePacman)
      setTimeout(function() { alert('You Win!')}, 500)
    }
  }
})


  // createBoard()
  // add pac-man to the board in starting position
  // squares[pacmanCurrPos].classList.add('pac-man')

  // // move pac-man using arrow keys
  // function movePacman(e) {
  //   // remove pac-man from board
  //   squares[pacmanCurrPos].classList.remove('pac-man')
  //   switch(e.key){
  //     case 'ArrowLeft':
  //       if (pacmanCurrPos % width !== 0 && 
  //         !squares[pacmanCurrPos - 1].classList.contains('wall') && 
  //         !squares[pacmanCurrPos - 1].classList.contains('ghost-lair')
  //       ) {
  //         pacmanCurrPos -= 1
  //       }
  //       // condition for center area of map
  //       if ((pacmanCurrPos - 1) === squares[363]) {
  //         pacmanCurrPos = 391
  //       }
  //       break
  //     case 'ArrowRight':
  //       if (pacmanCurrPos % width < width - 1 &&
  //         !squares[pacmanCurrPos + 1].classList.contains('wall') &&
  //         !squares[pacmanCurrPos + 1].classList.contains('ghost-lair')
  //       ) {
  //         pacmanCurrPos += 1
  //       }
  //       // condition for center area of map
  //       if ((pacmanCurrPos + 1) === squares[392]) {
  //         pacmanCurrPos = 364
  //       }
  //       break
  //     case 'ArrowUp':
  //       if (pacmanCurrPos - width >= 0 &&
  //         !squares[pacmanCurrPos - width].classList.contains('wall') &&
  //         !squares[pacmanCurrPos - width].classList.contains('ghost-lair')
  //       ) {
  //         pacmanCurrPos -= width
  //       }
  //       break
  //     case 'ArrowDown':
  //       if (pacmanCurrPos + width < width*width &&
  //          !squares[pacmanCurrPos + width].classList.contains('wall') &&
  //          !squares[pacmanCurrPos + width].classList.contains('ghost-lair')
  //       ) {
  //         pacmanCurrPos += width
  //       }
  //       break
  //   }
  //   // add pac-man back to the board
  //   squares[pacmanCurrPos].classList.add('pac-man')
  //   // check for updates
  //   checkForWin()
  //   checkForGameOver()
  //   pacDotEaten()
  //   powerPelletEaten()
  // }
  // // move pac-man based on keyup event
  // document.addEventListener('keydown', movePacman)

  // // pac-man eats a pac dot
  // function pacDotEaten() {
  //   if (squares[pacmanCurrPos].classList.contains('pac-dot')) {
  //     score++
  //     scoreDisplay.innerHTML = score
  //     squares[pacmanCurrPos].classList.remove('pac-dot')
  //   }
  // }

  // // pac-man eats a power pellet 
  // function powerPelletEaten() {
  //   if (squares[pacmanCurrPos].classList.contains('power-pellet')) {
  //     score += multiplier 
  //     scoreDisplay.innerHTML = score
  //     // scare ghosts
  //     ghosts.forEach(ghost => ghost.isScared = true)
  //     setTimeout(scareReset, 10000)
  //     squares[pacmanCurrPos].classList.remove('power-pellet')
  //   }
  // }

  // // reset ghost
  // function scareReset () {
  //   ghosts.forEach(ghost => ghost.isScared = false)
  // }

  // // create ghost class
  // class Ghost {
  //   constructor(className,startIndex,speed){
  //     this.className = className
  //     this.currentIndex = startIndex
  //     this.startIndex = startIndex
  //     this.isScared = false
  //     this.speed = speed
  //     this.timerID = NaN
  //   }
  // }
  // // initialize ghost array
  // const ghosts = [
  //   new Ghost('blinky', 348, 250),
  //   new Ghost('pinky', 376, 400),
  //   new Ghost('clyde', 379, 500),
  //   new Ghost('inky', 351, 300)
  // ]
  // // draw ghosts
  // ghosts.forEach(ghost => 
  //   squares[ghost.currentIndex].classList.add(ghost.className, "ghost"))

  // // move ghosts
  // ghosts.forEach(ghost => moveGhost(ghost))

  // function moveGhost(ghost){
  //   const directions = [-1, 1, width, -width]
  //   let direction = directions[Math.floor(Math.random() * directions.length)]

  //   ghost.timerID = setInterval(function() {
  //     if (!squares[ghost.currentIndex + direction].classList.contains('ghost') && 
  //         !squares[ghost.currentIndex + direction].classList.contains('wall')) 
  //     {
  //     squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
  //     ghost.currentIndex += direction
  //     squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
  //     } else direction = directions[Math.floor(Math.random() * directions.length)]
  //     // if ghost is scared
  //     if (ghost.isScared) {
  //       squares[ghost.currentIndex].classList.add('scared-ghost')
  //     }
  //     // if ghost is scared and pac-man eats them
  //     if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
  //       ghost.isScared = false
  //       squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
  //       ghost.currentIndex = ghost.startIndex
  //       score += (10*multiplier)
  //       scoreDisplay.innerHTML = score
  //       squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
  //     }
  //     checkForGameOver()
  //   }, ghost.speed)
  // }

//   // is game over?
//   function checkForGameOver () {
//     if (squares[pacmanCurrPos].classList.contains('ghost') &&
//         !squares[pacmanCurrPos].classList.contains('scared-ghost')){
//           ghosts.forEach(ghost => clearInterval(ghost.timerID))
//           document.removeEventListener('keyup', movePacman)
//           setTimeout(function() { alert('Game Over')}, 500)
//         }
//   }

//   // check for win
//   function checkForWin() {
//     if (score >= winScore) {
//       ghosts.forEach(ghost => clearInterval(ghost.timerID))
//       document.removeEventListener('keyup', movePacman)
//       setTimeout(function() { alert('You Win!')}, 500)
//     }
//   }

// }) 