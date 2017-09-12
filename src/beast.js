/* global sb, map, sch, sm */

/**
 * The beast plays scary sounds and moves towards the
 */
function Beast () {
  this.init = () => {
    this.x = Math.random() * window.mapWidth
    this.y = Math.random() * window.mapHeight
    this.soundRadius = 0
    this.dir = 0
    sb.add(`Beast appeared near (${this.x.toFixed(1)},${this.y.toFixed(1)})`)

    window.setTimeout(this.playSound, Math.random() * 5000)
  }

  this.playSound = () => {
    sm.playBeastSound(this.dir)
    this.soundRadius = 8

    window.setTimeout(this.playSound, Math.random() * 10000)
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
