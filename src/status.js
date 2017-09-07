let statusBar
const setStatus = text => {
  const d = new Date()
  statusBar.innerHTML += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${text} <br/>`
  statusBar.scrollTop = statusBar.scrollHeight
}

(function () {
  statusBar = document.querySelector('.status')
  setStatus('game started')
  setStatus('press [w] to sprint')
})()
