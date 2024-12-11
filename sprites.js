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

pacmanSprites.up.src = './images/pacman/pacman_up.png';
pacmanSprites.wideUp.src = './images/pacman/pacman_wide_up.png';
pacmanSprites.down.src = './images/pacman/pacman_down.png';
pacmanSprites.wideDown.src = './images/pacman/pacman_wide_down.png';
pacmanSprites.left.src = './images/pacman/pacman_left.png';
pacmanSprites.wideLeft.src = './images/pacman/pacman_wide_left.png';
pacmanSprites.right.src = './images/pacman/pacman_right.png';
pacmanSprites.wideRight.src = './images/pacman/pacman_wide_right.png';
pacmanSprites.closed.src = './images/pacman/pacman_closed.png';

const blinkySprites = {
  up: new Image(),
  down: new Image(),
  left: new Image(),
  right: new Image(),
};

blinkySprites.up.src = './images/blinky/blinky_up.png';
blinkySprites.down.src = './images/blinky/blinky_down.png';
blinkySprites.left.src = './images/blinky/blinky_left.png';
blinkySprites.right.src = './images/blinky/blinky_right.png';

const inkySprites = {
  left: new Image()
};

inkySprites.left.src = './images/inky/inky_left.png';

const clydeSprites = {
  left: new Image()
};

clydeSprites.left.src = './images/clyde/clyde_left.png';

const pinkySprites = {
  left: new Image()
};

pinkySprites.left.src = './images/pinky/pinky_left.png';

const scaredSprites = {
  scared: new Image()
};

scaredSprites.scared.src = './images/scared_ghosts/scared.png';