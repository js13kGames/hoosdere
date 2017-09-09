/* global scheduler, statusBar */

/**
 * @author github.com/lopis
 */
function AnimationManager() {
  // Number of pixels to move left and right
  const step = 150

  let light
  let hands
  let direction = 0
  let lastMousePostion = false

  this.getStatusBar = () => {
    return document.querySelector('.status')
  }

  /**
   * Appends a new message with timestamp to the console.
   */
  this.setStatus = (text) => {
    const d = new Date()
    const timestamp = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    statusBar.innerHTML += `${timestamp} ${text} <br/>`
    statusBar.scrollTop = getStatusBar().scrollHeight
  }

  window.onmousemove = (e) => {
    lastMousePostion = e.clientX
  }

  this.setSpeed  = (speed) => {
    document.body.style.setProperty("--animation-pace", speed)
  }

  this.updateDirection = () => {
    this.getLight()
      .style
      .setProperty('transform', `translateX(${direction}px)`)
  }

  this.setDirection = (d) => {
    direction = d
  }

  function getLight () {
    return this.light || document.querySelector('.light')
  }

  function getHands () {
    return this.hands || document.querySelector('.hands')
  }

  function updateLight () {
    if (this.lastMousePostion !== false) {
      const width = window.innerWidth
      if (this.lastMousePostion > width * 0.6) {
        setDirection(this.direction - step)
      } else if (this.lastMousePostion < width * 0.4) {
        setDirection(this.direction + step)
      }
      if (this.direction > width * 2 || this.direction < -width * 2) {
        this.getLight()
          .classList
          .remove('light')
        setDirection(-direction)
        updateDirection()
        statusBar.setStatus('Wraped around')
      }
      this.getLight()
        .classList
        .add('light')
      updateDirection()
      statusBar.setStatus(`Position: ${this.direction}`)
      this.lastMousePostion = false
    }
  }

  schedule(updateLight)
}

window.animationManager = new AnimationManager();
