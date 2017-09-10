/* global sch, sb, am, bm */

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
      sb.add('Pace set to ' + p)
      am.setAnimationSpeed(`${this.pace * 2}ms`)
    }
  }
}

window.sch = new Scheduler()

this.setTimeout(() => {
  sch.init()
  bm.create()
  bm.create()
}, 1000)
