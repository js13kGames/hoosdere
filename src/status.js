let statusBar
const setStatus = text => {
  const d = new Date()
  statusBar.innerHTML += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${text} <br/>`
  statusBar.scrollTop = statusBar.scrollHeight
}

function StatusBar () {
  this.getStatusBar = () => {
    return this.statusBar || (this.statusBar = document.querySelector('.status'))
  }

  this.add = text => {
    const d = new Date()
    this.getStatusBar().innerHTML += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${text} <br/>`
    this.getStatusBar().scrollTop = statusBar.scrollHeight
  }

  setStatus('game started')
  setStatus('press [w] to sprint')
}

window.sb = new StatusBar()
