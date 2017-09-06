// This script keeps the game pace
const pace = 750 // ms
const s = []

// Add an event to the scheduler
window.schedule = (cb) => {
  s.push(cb)
}

(function () {
  window.setInterval(() => {
    s.map(s => s())
  }, pace)
})()
