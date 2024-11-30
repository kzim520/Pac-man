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
