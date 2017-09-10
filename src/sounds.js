/* global am, schedule, jsfxr */

const steps = [
  '3,0.29,0.01,,0.25,0.5409,,0.5205,-0.1883,0.2219,,0.0382,0.1761,0.0054,0.0915,0.1099,-0.1205,-0.0348,0.9878,0.8539,0.232,0.0817,0.0354,0.32',
  '3,0.26,0.0401,,0.26,0.5874,0.0841,0.6539,-0.1804,0.8442,0.0943,0.0593,0.2596,0.0133,0.0461,0.1529,-0.1225,-0.066,1,0.8587,0.2421,,0.0231,0.321',
  '3,0.27,0.0401,,0.33,0.5874,0.0841,0.6539,-0.1804,0.8442,0.7,0.0593,0.2596,0.0133,0.0461,,-0.1225,-0.066,1,0.8587,0.2421,,0.0231,0.321'
]

const fastSteps = [
  '3,0.07,0.07,,0.4,0.5409,,0.5205,-0.1883,0.2219,,0.0382,0.1761,0.0054,0.0915,0.1099,-0.1205,-0.0348,0.9878,0.8539,0.232,0.0817,0.0354,0.32',
  '3,0.12,0.04,,0.27,0.5409,,0.5017,-0.2135,0.2219,,0.0382,0.2067,0.041,0.1401,0.1099,-0.1205,-0.0348,0.9878,0.8505,0.2105,0.081,0.026,0.32',
  '3,0.1507,0.0318,0.0486,0.27,0.5231,0.0137,0.4671,-0.1965,0.2835,,0.0225,0.2067,0.0286,0.1401,0.1099,-0.1237,0.0103,0.9878,0.8837,0.2591,0.0391,0.0469,0.32'
]

var url = window.URL || window.webkitURL
function playSound (params, balance) {
  try {
    const soundURL = jsfxr(params)
    const player = new window.Audio()
    player.addEventListener('error', function (e) {
      console.error(player.error)
    }, false)
    player.src = soundURL

    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioContext.createMediaElementSource(player)
    const pannerNode = audioContext.createStereoPanner()
    pannerNode.pan.value = balance

    source.connect(pannerNode)
    pannerNode.connect(audioContext.destination)

    player.play()
    player.addEventListener('ended', function (e) {
      url.revokeObjectURL(soundURL)
    }, false)
  } catch (e) {
    console.log(e.message)
  }
}

function playString (str, balance = 0) {
  var temp = str.split(',')
  var params = []
  for (var i = 0; i < temp.length; i++) {
    params[i] = parseFloat(temp[i])
  }
  playSound(params, balance)
}

// const background = '2,0.2354,0.9673,0.0605,0.5614,0.0173,,-0.1999,-0.48,1,0.5948,1,0.75,,-0.0326,0.7909,,-0.1173,0.984,0.6383,,,-0.0671,0.72'
const background = [
  '3,1,1,,1,0.2,,0.6539,-0.1804,0.8442,0.7,1,0.88,0.0133,0.0461,,0.1999,0.1,0.79,0.08,0.2421,,0.0231,0.05',
  '3,0.9993,1,,1,0.2068,0.0241,1,-0.1804,,,-1,,0.0133,0.0865,,0.04,0.02,0.69,-0.02,0.5,,0.0231,0.05',
  '3,0.77,0.01,,0.81,0.2,,0.6539,-0.1804,0.8442,,-1,0.88,0.0133,0.0461,,0.1999,0.1,0.79,0.08,0.2421,,0.0231,0.05'
]
let backgroundSemaphore = 0

// These sounds play when the beast is far
const beast1 = [
  '3,0.3303,0.2855,0.0407,0.537,0.5074,,0.0307,,,0.1724,-0.8984,0.8862,,-0.8551,-0.3079,0.4369,-0.0885,0.1191,-0.0096,0.6318,0.0001,0.0263,0.55',
  '3,0.2855,0.2792,0.0576,0.4807,0.4709,,0.0228,0.0457,,0.1089,-0.9107,,,-0.7935,0.0462,0.4317,-0.0991,0.1503,0.0368,0.6059,0.0001,0.0263,0.55',
  '3,0.3303,0.2792,0.08,0.4915,0.4715,,0.0307,-0.0015,,0.1248,-0.8679,,,-0.8111,,0.4369,-0.0991,0.1503,-0.0135,0.6318,0.0001,0.0263,0.55'
]
// When you hear this one, you're fucked
const beast2 = [
  '3,0.57,0.51,1,0.39,1,1,0.04,0.0597,0.1421,0.0675,-1,0.0173,0.0165,-0.7684,0.02,0.4729,-0.0726,0.61,0.12,0.6819,0.0418,0.0425,0.28',
  '3,0.5328,0.4756,0.51,0.4342,1,0.9057,-0.0354,0.0597,0.147,0.0966,-0.9694,,0.0603,-0.7362,0.0068,0.4729,-0.0726,0.87,0.079,0.1,,-1,0.28',
  '3,0.1227,0.6897,0.2757,0.6204,0.5092,,0.0706,0.0055,0.6805,0.4902,0.89,0.9514,-0.1546,,,-0.3972,0.0501,0.6609,-0.0217,0.015,0.0826,-0.0207,0.29'
]

function startNewBackgroundSound () {
  const balance = Math.random() * 2 - 1
  playString(background[parseInt(Math.random() * background.length)], balance)
  backgroundSemaphore = parseInt(Math.random() * 5)
}

// balance from -1 to 1
let footSideBalance = 0.5
function playStepSound () {
  if (isRunning) {
    playString(fastSteps[parseInt(Math.random() * 3)], footSideBalance)
  } else {
    playString(steps[parseInt(Math.random() * 3)], footSideBalance)
  }
  footSideBalance = -footSideBalance
}

function playBeastSound (isClose) {
  const balance = Math.random() * 2 - 1
  playString((isClose ? beast2 : beast1)[parseInt(Math.random() * 3)], balance)
}

let isRunning = false
let nextBeastTimer = 5
function SoundManager () {
  schedule(() => {
    playStepSound()
  })
  schedule(() => {
    if (backgroundSemaphore-- <= 0) {
      startNewBackgroundSound()
    }
  })
  schedule(() => {
    if (nextBeastTimer-- <= 0) {
      playBeastSound()
      nextBeastTimer = 3 + Math.random() * 10
    }
  })

  document.body.onkeydown = (e) => {
    let keycode = e.which
    if (keycode === 87) { // W key
      isRunning = true
      am.startRunning()
    }
  }
  document.body.onkeyup = (e) => {
    let keycode = e.which
    if (keycode === 87) { // W key
      isRunning = false
      am.stopRunning()
    }
  }
}

window.soundManager = new SoundManager()
