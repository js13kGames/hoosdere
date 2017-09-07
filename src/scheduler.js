// This script keeps the game pace
let pace = 750 // ms
let interval
const s = []

// Add an event to the scheduler
window.schedule = (cb) => {
  s.push(cb)
}

window.setPace = p => {
  if (p != pace) {
    pace = p
    clearInterval(interval)
    startScheduler()
    setStatus('Pace set to ' + p)
    setAnimationSpeed(`${pace*2}ms`)
  }
}

function startScheduler () {
  interval = window.setInterval(() => {
    s.map(s => s())
  }, pace)
}

(function () {
  startScheduler()
})()
