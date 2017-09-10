
function StatusBar () {
  this.getStatusBar = () => {
    return this.statusBar || (this.statusBar = document.querySelector('.status'))
  }

  this.add = text => {
    const d = new Date()
    this.getStatusBar().innerHTML += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${text} <br/>`
    this.getStatusBar().scrollTop = this.getStatusBar().scrollHeight
  }

  this.add('game started')
  this.add('press [w] to sprint')
  this.add('[<][>] or [a][d] to move')
}

window.sb = new StatusBar()
