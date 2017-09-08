/* global animationManager */

/**
 * @author github.com/lopis
 */
function Scheduler() {

  const schedule = []
  let pace = 750

  // Change the pace of the game
  this.setPace = p => {
    if (p != pace) {
      pace = p
      clearInterval(interval)
      startScheduler()
      setStatus('Pace set to ' + p)
      animationManager.setAnimationSpeed(`${pace*2}ms`)
    }
  }

  // Schedule new task
  this.add = (cb) => {
    s.push(cb)
  }

  statusBar = document.querySelector('.status')
  setStatus('game started')
  setStatus('press [w] to sprint')
}

window.scheduler = new Scheduler();
