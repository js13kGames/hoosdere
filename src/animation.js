/* global sch, sb */

const step = 150
let light
let direction = 0

function AnimationManager () {
  this.setAnimationSpeed = (speed) => {
    document.body.style.setProperty('--animation-pace', speed)
  }

  this.stopRunning = () => {
    sch.setPace(750)
    document.body.style.setProperty('transform', 'scale(1.0)')
  }

  this.startRunning = () => {
    sch.setPace(350)
    document.body.style.setProperty('transform', 'scale(1.1)')
  }

  this.updateDirection = () => {
    light.style.setProperty('transform', `translateX(${direction}px)`)
  }

  this.setDirection = (d) => {
    direction = d
  }

  light = document.querySelector('.light')

  let lastMousePostion = false

  window.onmousemove = (e) => {
    lastMousePostion = e.clientX
  }

  sch.add(() => {
    if (lastMousePostion !== false) {
      const width = window.innerWidth
      if (lastMousePostion > width * 0.6) {
        this.setDirection(direction - step)
      } else if (lastMousePostion < width * 0.4) {
        this.setDirection(direction + step)
      }
      if (direction > width * 2 || direction < -width * 2) {
        light.classList.remove('light')
        this.setDirection(-direction)
        this.updateDirection()
        sb.add('Wraped around')
      }
      light.classList.add('light')
      this.updateDirection()
      sb.add(`Position: ${direction}`)
      lastMousePostion = false
    }
  })
}

window.am = new AnimationManager()
