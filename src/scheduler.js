/* global sb, am */

// This script keeps the game pace
function Scheduler () {
  this.s = []
  this.pace = 750

  this.init = () => {
    this.interval = window.setInterval(() => {
      this.s.map(s => s())
    }, this.pace)
  }

  this.add = (c) => {
    this.s.push(c)
  }

  this.setPace = p => {
    if (p !== this.pace) {
      this.pace = p
      clearInterval(this.interval)
      this.init()
      sb.setStatus('Pace set to ' + p)
      am.setAnimationSpeed(`${this.pace * 2}ms`)
    }
  }

  this.init()
}

window.sch = new Scheduler()
