//initialize sprites
const pacmanSprites = {
  up: new Image(),
  wideUp: new Image(),
  down: new Image(),
  wideDown: new Image(),
  left: new Image(),
  wideLeft: new Image(),
  right: new Image(),
  wideRight: new Image(),
  closed: new Image(),
};

pacmanSprites.up.src = './sprites/pacman/pacman_up.png';
pacmanSprites.wideUp.src = './sprites/pacman/pacman_wide_up.png';
pacmanSprites.down.src = './sprites/pacman/pacman_down.png';
pacmanSprites.wideDown.src = './sprites/pacman/pacman_wide_down.png';
pacmanSprites.left.src = './sprites/pacman/pacman_left.png';
pacmanSprites.wideLeft.src = './sprites/pacman/pacman_wide_left.png';
pacmanSprites.right.src = './sprites/pacman/pacman_right.png';
pacmanSprites.wideRight.src = './sprites/pacman/pacman_wide_right.png';
pacmanSprites.closed.src = './sprites/pacman/pacman_closed.png';

const blinkySprites = {
  up: new Image(),
  down: new Image(),
  left: new Image(),
  right: new Image(),
};

blinkySprites.up.src = './sprites/blinky/blinky_up.png';
blinkySprites.down.src = './sprites/blinky/blinky_down.png';
blinkySprites.left.src = './sprites/blinky/blinky_left.png';
blinkySprites.right.src = './sprites/blinky/blinky_right.png';

const inkySprites = {
  left: new Image()
};

inkySprites.left.src = './sprites/inky/inky_left.png';

const clydeSprites = {
  left: new Image()
};

clydeSprites.left.src = './sprites/clyde/clyde_left.png';

const pinkySprites = {
  left: new Image()
};

pinkySprites.left.src = './sprites/pinky/pinky_left.png';

const scaredSprites = {
  scared: new Image()
};

scaredSprites.scared.src = './sprites/scared_ghosts/scared.png';