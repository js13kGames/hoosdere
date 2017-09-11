/* global sch, sb, map */

function AnimationManager () {
  this.bkgStep = 150
  this.bkgPosition = 0

  this.setAnimationSpeed = (speed) => {
    document.body.style.setProperty('--animation-pace', speed)
  }

  this.stopRunning = () => {
    sch.setPace(750)
    this.getLight().style.setProperty('transform', `scale(1.0) translateX(${this.bkgPosition}px)`)
    this.getHands().style.setProperty('bottom', '-5%')
  }

  this.startRunning = () => {
    sch.setPace(350)
    this.getLight().style.setProperty('transform', `scale(1.3) translateX(${this.bkgPosition}px)`)
    this.getHands().style.setProperty('bottom', '-25%')
  }

  this.updateDirection = () => {
    this.getLight().style.setProperty('transform', `translateX(${this.bkgPosition}px)`)
  }

  this.setBkgPosition = (p) => {
    this.bkgPosition += p
  }

  this.moveRight = () => {
    this.setBkgPosition(-this.bkgStep)
    map.movePlayerRight()
  }

  this.moveLeft = () => {
    this.setBkgPosition(this.bkgStep)
    map.movePlayerLeft()
  }

  this.getLight = () => {
    return this.light || (this.light = document.querySelector('.light'))
  }

  this.getHands = () => {
    return this.hands || (this.hands = document.querySelector('.hands'))
  }

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
      this.moveRight()
      hasMoved = true
    }
    if (keyPresses[KEY_A] || keyPresses[KEY_LFT]) {
      this.moveLeft()
      hasMoved = true
    }

    if (hasMoved) {
      if (map.player.dir > 2 * Math.PI ||
          map.player.dir < 0) {
        this.getLight().classList.remove('light')
        this.setBkgPosition(-2 * this.bkgPosition)
        this.updateDirection()
        sb.add('Wraped around')
      }
      this.getLight().classList.add('light')
      this.updateDirection()
      sb.add(`Direction: ${map.player.dir.toFixed(1)}rad`)
    }
  })
}

window.am = new AnimationManager()
