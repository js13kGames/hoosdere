/* global schedule, setStatus */

const step = 150
let light
let direction = 0

function updateDirection () {
  light.style.setProperty('transform', `translateX(${direction}px)`)
}

function setDirection (d) {
  direction = d
}

(function () {
  light = document.querySelector('.light')

  let lastMousePostion = false

  window.onmousemove = (e) => {
    lastMousePostion = e.clientX
  }

  schedule(() => {
    if (lastMousePostion !== false) {
      const width = window.innerWidth
      if (lastMousePostion > width * 0.6) {
        setDirection(direction - step)
      } else if (lastMousePostion < width * 0.4) {
        setDirection(direction + step)
      }
      if (direction > width * 2 || direction < -width * 2) {
        light.classList.remove('light')
        setDirection(-direction)
        updateDirection()
        setStatus('Wraped around')
      }
      light.classList.add('light')
      updateDirection()
      setStatus(`Position: ${direction}`)
      lastMousePostion = false
    }
  })
})()
