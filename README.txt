This Pacman game project presented several technical challenges that required a combination of algorithmic logic, front-end design, and animation handling.

1. Ghost Movement Algorithm:
A key challenge was implementing intelligent ghost movement. We used Breadth-First Search (BFS) to simulate the ghosts actively chasing Pacman when they weren't scared. However, when the ghosts were in their "scared" state, we had to reverse their behavior by using Manhattan distance to make them flee from Pacman, adding an extra layer of complexity to the ghost movement.

2. Styling the Game Board:
Achieving an authentic Pacman look involved significant effort in styling the game board. We meticulously worked on the borders of the paths, ensuring that the tiles' borders were placed correctly to visually represent the maze. This required figuring out the precise location and design for each border to match the classic game. Additionally, we enhanced the visual appeal with dynamic styling through CSS keyframes, particularly on elements like the welcome page or various popups, making the game feel more interactive and polished.

3. Animation and Frame Management:
Ensuring smooth, responsive animations for character movement was another challenging aspect. We had to carefully manage animation frames and intervals to ensure that the game board updated properly whenever there was a change, like character movements or state transitions. Synchronizing these updates without disrupting the user experience was very challenging. Additionally, we animated Pacman’s movements, changing his image based on direction, which added another layer of detail to the game’s interactivity.

Overall, this project was complex because it combined advanced logic for character movement, intricate styling, and smooth animation handling. As a team this project helped us learn about what JavaScript is capable of and how important task management is for breaking down a significant program.