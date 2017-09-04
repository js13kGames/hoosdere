(function () {
  const light = document.querySelector('.light')
  const state = {
    hPos: 0
  }
  const step = 15
  let lastMove = 0

  window.onmousemove = (e) => {
    if(Date.now() - lastMove < 1000) return

    light.style.setProperty('transform', `translateX(${e.clientX}px)`)
    const width = window.innerWidth
    const pos = e.clientX
    if (pos > width*0.6) {
      // Move guy to right
      state.hPos -= step
    } else if (pos < width*0.4) {
      // Move guy to left
      state.hPos += step
    }
    if (state.hPos > width*2|| state.hPos < -width*2) {
      light.classList.remove('light')
      state.hPos = -state.hPos
      light.style.setProperty('transform', `translateX(${state.hPos}px)`)
      setTimeout(()=>{
        light.classList.add('light')
      },500)
    } else {
      light.style.setProperty('transform', `translateX(${state.hPos}px)`)
    }

  }
})()
