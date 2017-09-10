/* global sch, bm */
window.mapHeight = 150
window.mapWidth = 150

/**
 * Size of the map and location
 * of the player and the exit.
 */
function Map () {
  this.player = {
    x: 75,
    y: 140
  }
  this.exit = {
    x: 75,
    y: 5
  }

  this.getCanvas = () => {
    return this.canvas || document.querySelector('canvas.map')
  }

  function drawDot(ctx, color, x, y) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.arc(x, y, 2, 0, Math.PI * 2, true)
    ctx.fill()
    ctx.stroke()
  }

  function clearCanvas(ctx) {
    ctx.clearRect(0, 0, 150, 150)
  }

  this.draw = () => {
    if (this.getCanvas().getContext) {
      var ctx = this.getCanvas().getContext('2d');

      clearCanvas(ctx)
      drawDot(ctx, 'white', this.player.x, this.player.y)
      drawDot(ctx, 'yellow', this.exit.x, this.exit.y)
      bm.getBeasts().map(b => {
        drawDot(ctx, 'red', b.x, b.y)
      })
    }
  }

  sch.add(this.draw)
}

window.map = new Map()
