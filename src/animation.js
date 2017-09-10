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

  const keyPresses = {}

  window.onkeydown = (e) => {
    keyPresses[e.keyCode] = true
  }

  window.onkeyup = (e) => {
    delete keyPresses[e.keyCode]
  }

  // const KEY_W = 87
  // const KEY_S = 83
  const KEY_A = 65
  const KEY_D = 68
  // const KEY_UP = 38
  // const KEY_DN = 40
  const KEY_LFT = 37
  const KEY_RGT = 39

  sch.add(() => {
    let hasMoved = false
    if (keyPresses[KEY_D] || keyPresses[KEY_RGT]) {
      this.setDirection(direction - step)
      hasMoved = true
    }
    if (keyPresses[KEY_A] || keyPresses[KEY_LFT]) {
      this.setDirection(direction + step)
      hasMoved = true
    }

    if (hasMoved) {
      const width = window.innerWidth
      if (direction > width * 2 || direction < -width * 2) {
        light.classList.remove('light')
        this.setDirection(-direction)
        this.updateDirection()
        sb.add('Wraped around')
      }
      light.classList.add('light')
      this.updateDirection()
      sb.add(`Position: ${direction}`)
    }
  })
}

window.am = new AnimationManager()
