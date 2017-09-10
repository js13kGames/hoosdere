/* global sb */

/**
 * The beast plays scary sounds and moves towards the
 */
function Beast () {
  this.init = () => {
    this.x = (Math.random() * window.mapWidth).toFixed(0)
    this.y = (Math.random() * window.mapHeight).toFixed(0)
    this.direction = Math.random() * Math.PI * 2
    sb.add(`Beast appeared near (${this.x},${this.y})`)
  }
  this.playSound = () => {

  }

  this.init()
}

function BeastManager () {
  this.beasts = []
  this.create = () => {
    const b = new Beast()
    this.beasts.push(b)
  }

  this.getBeasts = () => this.beasts
}

window.bm = new BeastManager()
