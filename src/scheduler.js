/* global sb, am */

// This script keeps the game pace
let pace = 750 // ms
let interval
const s = []

// Add an event to the scheduler
window.schedule = (cb) => {
  s.push(cb)
}

function Scheduler () {
  this.init = () => {
    interval = window.setInterval(() => {
      s.map(s => s())
    }, pace)
  }

  this.setPace = p => {
    if (p !== pace) {
      pace = p
      clearInterval(interval)
      this.init()
      sb.setStatus('Pace set to ' + p)
      am.setAnimationSpeed(`${pace * 2}ms`)
    }
  }

  this.init()
}

window.sch = new Scheduler()
