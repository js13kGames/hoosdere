/**
 * @author github.com/lopis
 */
function StatusBar() {

  this.getStatusBar = () => {
    return document.querySelector('.status')
  }

  /**
   * Appends a new message with timestamp to the console.
   */
  this.setStatus = (text) => {
    const d = new Date()
    const timestamp = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    statusBar.innerHTML += `${timestamp} ${text} <br/>`
    statusBar.scrollTop = getStatusBar().scrollHeight
  }

  statusBar = document.querySelector('.status')
  setStatus('game started')
  setStatus('press [w] to sprint')
}

window.statusBar = new StatusBar();
