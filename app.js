document.addEventListener('DOMContentLoaded', () => {
  const scoreDisplay = document.getElementById('score')
  const width = 28
  let score = 0
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

  let pacmanCurrPos = 490
  squares[pacmanCurrPos].classList.add('pac-man')

  // move
  function movePacman(e) {
    squares[pacmanCurrPos].classList.remove('pac-man')
    switch(e.key){
      case 'ArrowLeft':
        if (pacmanCurrPos % width !== 0 && 
          !squares[pacmanCurrPos - 1].classList.contains('wall') && 
          !squares[pacmanCurrPos - 1].classList.contains('ghost-lair')
        ) {
          pacmanCurrPos -= 1
        }
        if (squares[pacmanCurrPos - 1] === squares[363]) {
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
        if (squares[pacmanCurrPos + 1] === squares[392]) {
          pacmanCurrPos = 364
        }
        break
      case 'ArrowUp':
        if (pacmanCurrPos - width >= 0 &&
          !squares[pacmanCurrPos - width].classList.contains('wall') &&
          !squares[pacmanCurrPos + width].classList.contains('ghost-lair')
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
    squares[pacmanCurrPos].classList.add('pac-man')
    // checkForWin()
    // checkForGameOver()
    pacDotEaten()
    powerPelletEaten()

  }
  document.addEventListener('keyup', movePacman)

  //pac dot eaten
  function pacDotEaten() {
    if (squares[pacmanCurrPos].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrPos].classList.remove('pac-dot')
    }
  }

  // power pellet eaten
  function powerPelletEaten() {
    if (squares[pacmanCurrPos].classList.contains('power-pellet')) {
      score += 10
      scoreDisplay.innerHTML = score
      // scare ghosts

      squares[pacmanCurrPos].classList.remove('power-pellet')
    }
  }

  // create ghosts
  class Ghost {
    constructor(className,startIndex,speed){
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerID = NaN
    }
  }

  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('clyde', 379, 500),
    new Ghost('inky', 351, 300)
  ]
  // draw ghosts
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className)
    squares[ghost.currentIndex].classList.add('ghost')
  })

  // move ghosts
  ghosts.forEach(ghost => moveGhost(ghost))

  function moveGhost(ghost){
    const directions = [-1, 1, width, -width]
    const direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerID = setInterval(function() {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost')
      ghost.currentIndex += direction
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')

    }, ghost.speed)
  }


}) 