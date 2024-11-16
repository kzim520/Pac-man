document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay = document.getElementById('score')
  const width = 28
  let score = 0
  const winScore = 300
  const scoreMul = 10
  const grid = document.querySelector('.grid')
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
    for (let i = 0; i < layout.length; i++) {
      const square = document.createElement('div')
      square.id = i
      grid.appendChild(square)
      squares.push(square)
      // add layout
      if (layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      }
      if (layout[i] === 1) {
        squares[i].classList.add('wall')
      }
      if (layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      }
      if (layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }
      if (layout[i] === 4) {
        squares[i].classList.add('empty')
      }
    }
  }
  createBoard()
  // add pac-man to the board in starting position
  let pacmanCurrPos = 490
  squares[pacmanCurrPos].classList.add('pac-man')

  // move pac-man using arrow keys
  function movePacman(e) {
    // remove pac-man from board
    squares[pacmanCurrPos].classList.remove('pac-man')
    switch(e.key){
      case 'ArrowLeft':
        if (pacmanCurrPos % width !== 0 && 
          !squares[pacmanCurrPos - 1].classList.contains('wall') && 
          !squares[pacmanCurrPos - 1].classList.contains('ghost-lair')
        ) {
          pacmanCurrPos -= 1
        }
        // condition for center area of map
        if ((pacmanCurrPos - 1) === squares[363]) {
          pacmanCurrPos = 391
        }
        break
      case 'ArrowRight':
        if (pacmanCurrPos % width < width - 1 &&
          !squares[pacmanCurrPos + 1].classList.contains('wall') &&
          !squares[pacmanCurrPos + 1].classList.contains('ghost-lair')
        ) {
          pacmanCurrPos += 1
        }
        // condition for center area of map
        if ((pacmanCurrPos + 1) === squares[392]) {
          pacmanCurrPos = 364
        }
        break
      case 'ArrowUp':
        if (pacmanCurrPos - width >= 0 &&
          !squares[pacmanCurrPos - width].classList.contains('wall') &&
          !squares[pacmanCurrPos - width].classList.contains('ghost-lair')
        ) {
          pacmanCurrPos -= width
        }
        break
      case 'ArrowDown':
        if (pacmanCurrPos + width < width*width &&
           !squares[pacmanCurrPos + width].classList.contains('wall') &&
           !squares[pacmanCurrPos + width].classList.contains('ghost-lair')
        ) {
          pacmanCurrPos += width
        }
        break
    }
    // add pac-man back to the board
    squares[pacmanCurrPos].classList.add('pac-man')
    // check for updates
    checkForWin()
    checkForGameOver()
    pacDotEaten()
    powerPelletEaten()
  }
  // move pac-man based on keyup event
  document.addEventListener('keydown', movePacman)

  // pac-man eats a pac dot
  function pacDotEaten() {
    if (squares[pacmanCurrPos].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrPos].classList.remove('pac-dot')
    }
  }

  // pac-man eats a power pellet 
  function powerPelletEaten() {
    if (squares[pacmanCurrPos].classList.contains('power-pellet')) {
      score += scoreMul 
      scoreDisplay.innerHTML = score
      // scare ghosts
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(scareReset, 10000)
      squares[pacmanCurrPos].classList.remove('power-pellet')
    }
  }

  // reset ghost
  function scareReset () {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // create ghost class
  class Ghost {
    constructor(className,startIndex,speed){
      this.className = className
      this.currentIndex = startIndex
      this.startIndex = startIndex
      this.isScared = false
      this.speed = speed
      this.timerID = NaN
    }
  }
  // initialize ghost array
  const ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('clyde', 379, 500),
    new Ghost('inky', 351, 300)
  ]
  // draw ghosts
  ghosts.forEach(ghost => 
    squares[ghost.currentIndex].classList.add(ghost.className, "ghost"))
  

  // move ghosts
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost){
    const directions = [-1, 1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerID = setInterval(function() {
      if (!squares[ghost.currentIndex + direction].classList.contains('ghost') && 
          !squares[ghost.currentIndex + direction].classList.contains('wall')) 
      {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
      ghost.currentIndex += direction
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else direction = directions[Math.floor(Math.random() * directions.length)]
      // if ghost is scared
      if (ghost.isScared) {
        squares[ghost.currentIndex].classList.add('scared-ghost')
      }
      // if ghost is scared and pac-man eats them
      if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')) {
        ghost.isScared = false
        squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        ghost.currentIndex = ghost.startIndex
        score += 10*scoreMul
        scoreDisplay.innerHTML = score
        squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      }
      checkForGameOver()
    }, ghost.speed)
  }

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