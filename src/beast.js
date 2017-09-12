/* global sb, map, sch */

/**
 * The beast plays scary sounds and moves towards the
 */
function Beast () {
  this.init = () => {
    this.x = Math.random() * window.mapWidth
    this.y = Math.random() * window.mapHeight
    this.direction = Math.random() * Math.PI * 2
    sb.add(`Beast appeared near (${this.x.toFixed(1)},${this.y.toFixed(1)})`)
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

  this.updateBeasts = () => {
    this.beasts.map(map.updateBeastPos)
  }

  this.init = () => {
    sch.add(this.updateBeasts)
  }
}

window.bm = new BeastManager()
