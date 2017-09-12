/* global sch, bm, am, sb */
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

  const STEP_SIZE = 2
  this.updatePlayerPos = () => {
    const t = this.player.dir
    const dx = STEP_SIZE * Math.sin(t)
    const dy = STEP_SIZE * Math.cos(t)
    this.player.x += dx
    this.player.y += dy

    am.setBkgPosition(-dx * am.bkgStep)
  }

  const BEAST_STEP_SIZE = 1
  this.updateBeastPos = (beast) => {
    // Angle from the beast in the direction of the player
    let t = Math.atan(
      (beast.y - this.player.y) / (beast.x - this.player.x)
    )
    if (this.player.x > beast.x) {
      t += Math.PI
    }
    const dx = BEAST_STEP_SIZE * Math.cos(t)
    const dy = BEAST_STEP_SIZE * Math.sin(t)
    beast.x -= dx
    beast.y -= dy

    return beast
  }

  function areColliding (a, b, theresold) {
    const dx = b.x - a.x
    const dy = b.y - a.y
    const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    return distance < theresold
  }

  // Check if any of the beasts caught the player
  const MIN_BEAST_DISTANCE = 5
  this.detectBeastPlayerCollision = () => {
    bm.getBeasts().map(b => {
      if (areColliding(b, this.player, MIN_BEAST_DISTANCE)) {
        // KILL
        sb.add('They caught you')
        sch.setPace(0)
      }
    })
  }

  // Check if any of the beasts caught the player
  const MIN_EXIT_DISTANCE = 5
  this.detectExitPlayerCollision = () => {
    if (areColliding(this.exit, this.player, MIN_EXIT_DISTANCE)) {
      // You are... free?
      sb.add('You are free... for now')
      sch.setPace(0)
    }
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
    this.clearCanvas(ctx)
    drawDot(ctx, 'white', this.player.x, this.player.y)
    drawDot(ctx, 'yellow', this.exit.x, this.exit.y)
    bm.getBeasts().map(b => {
      drawDot(ctx, 'red', b.x, b.y)
    })
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
    sch.add(this.detectBeastPlayerCollision)
    sch.add(this.detectExitPlayerCollision)
  }
}

window.map = new Map()
