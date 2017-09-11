/* global sch, bm, am */
window.mapHeight = 150
window.mapWidth = 150
const rotationStepSize = Math.PI / 24

/**
 * Size of the map and location
 * of the player and the exit.
 */
function Map () {
  this.player = {
    x: 75,
    y: 140,
    dir: Math.PI
  }
  this.exit = {
    x: 75,
    y: 5
  }

  this.movePlayerRight = () => {
    this.player.dir -= rotationStepSize
  }

  this.movePlayerLeft = () => {
    this.player.dir += rotationStepSize
  }

  this.getCanvas = () => {
    return this.canvas || document.querySelector('canvas.map')
  }

  const STEP_SIZE = 1
  this.updatePlayerPos = () => {
    const t = this.player.dir
    const dx = STEP_SIZE * Math.sin(t)
    const dy = STEP_SIZE * Math.cos(t)
    this.player.x += dx
    this.player.y += dy

    am.setBkgPosition(-dx * am.bkgStep)
  }

  function drawDot (ctx, color, x, y) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.arc(x, y, 1, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.stroke()
  }

  this.clearCanvas = (ctx) => {
    ctx.clearRect(0, 0, 150, 150)
  }

  this.draw = () => {
    const ctx = this.getCanvas().getContext('2d')
    drawDot(ctx, 'white', this.player.x, this.player.y)
  }

  this.init = () => {
    const ctx = this.getCanvas().getContext('2d')
    drawDot(ctx, 'white', this.player.x, this.player.y)
    drawDot(ctx, 'yellow', this.exit.x, this.exit.y)
    bm.getBeasts().map(b => {
      drawDot(ctx, 'red', b.x, b.y)
    })

    sch.add(this.updatePlayerPos)
    sch.add(this.draw)
  }

}

window.map = new Map()
