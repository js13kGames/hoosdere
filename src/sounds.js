const steps = [
  '3,0.27,0.1435,,0.4,0.5409,,0.5205,-0.1883,0.2219,,0.0382,0.1761,0.0054,0.0915,0.1099,-0.1205,-0.0348,0.9878,0.8539,0.232,0.0817,0.0354,0.32',
  '3,0.27,0.0897,,0.3627,0.5553,0.0211,0.5079,-0.1491,0.2737,0.0197,0.0226,0.1076,0.0054,0.1011,0.0788,-0.1575,-0.0541,0.9664,0.8273,0.214,0.142,0.0337,0.32',
  '3,0.238,0.1202,0.0077,0.3257,0.6082,0.0283,0.4848,-0.1844,0.2297,0.0401,-0.0074,0.1541,,0.1185,0.0967,-0.1575,-0.035,0.9674,0.8052,0.214,0.142,0.0829,0.32'
]
const fastSteps = [
  '3,0.07,0.07,,0.4,0.5409,,0.5205,-0.1883,0.2219,,0.0382,0.1761,0.0054,0.0915,0.1099,-0.1205,-0.0348,0.9878,0.8539,0.232,0.0817,0.0354,0.32',
  '3,0.12,0.04,,0.27,0.5409,,0.5017,-0.2135,0.2219,,0.0382,0.2067,0.041,0.1401,0.1099,-0.1205,-0.0348,0.9878,0.8505,0.2105,0.081,0.026,0.32',
  '3,0.1507,0.0318,0.0486,0.27,0.5231,0.0137,0.4671,-0.1965,0.2835,,0.0225,0.2067,0.0286,0.1401,0.1099,-0.1237,0.0103,0.9878,0.8837,0.2591,0.0391,0.0469,0.32'
]
const background = '2,0.2354,0.9673,0.0605,0.5614,0.0173,,-0.1999,-0.48,1,0.5948,1,0.75,,-0.0326,0.7909,,-0.1173,0.984,0.6383,,,-0.0671,0.72'
// These sounds play when the beast is far
const beast1 = [
  '3,0.3303,0.2855,0.0407,0.537,0.5074,,0.0307,,,0.1724,-0.8984,0.8862,,-0.8551,-0.3079,0.4369,-0.0885,0.1191,-0.0096,0.6318,0.0001,0.0263,0.55',
  '3,0.2855,0.2792,0.0576,0.4807,0.4709,,0.0228,0.0457,,0.1089,-0.9107,,,-0.7935,0.0462,0.4317,-0.0991,0.1503,0.0368,0.6059,0.0001,0.0263,0.55',
  '3,0.3303,0.2792,0.08,0.4915,0.4715,,0.0307,-0.0015,,0.1248,-0.8679,,,-0.8111,,0.4369,-0.0991,0.1503,-0.0135,0.6318,0.0001,0.0263,0.55'
];
// When you hear this one, you're fucked
const beast2 = [
  '3,1,1,1,1,1,1,0.0882,0.0597,0.1139,0.0675,-0.9216,0.0171,0.0333,-0.7684,0.0443,0.4592,-0.075,0.1704,0.1149,0.6819,0.0418,0.0372,0.55',
  '3,1,1,1,0.9721,1,1,0.0882,0.0597,0.1421,0.0675,-1,0.0173,0.0165,-0.7684,0.02,0.4729,-0.0726,0.1926,0.1127,0.6819,0.0418,0.0425,0.55'
];

/**
 * @author github.com/lopis
 */
function SoundManager() {
  const url = window.URL || window.webkitURL
  // let backgroundSemaphore = 19

  function playSound(params) {
    try {
      const soundURL = jsfxr(params)
      const player = new Audio()
      player.addEventListener('error', function(e) {
        console.log("Error: " + player.error.code)
      }, false)
      player.src = soundURL
      player.play()
      player.addEventListener('ended', function(e) {
        url.revokeObjectURL(soundURL);
      }, false)
    } catch(e) {
      console.log(e.message);
    }
  }

  function playString(str) {
    let temp = str.split(",");
    const params = new Array();
    for(var i = 0; i < temp.length; i++) {
      params[i] = parseFloat(temp[i]);
    }
    playSound(params);
  }

  function initSounds () {
    window.schedule(() => {
      if (isRunning) {
        playString(fastSteps[parseInt(Math.random()*3)])
      } else {
        playString(steps[parseInt(Math.random()*3)])
      }
    })
    // window.schedule(() => {
    //   if (backgroundSemaphore++ > 20) {
    //     playString(background)
    //     backgroundSemaphore = 20
    //   }
    // })
  }

  initSounds()
}

window.soundManager = new SoundManager();







let isRunning = false;


// TODO: do this in the main routine or something
// document.body.onkeydown = (e) => {
//   let keycode = e.which
//   if (keycode === 87) { // W key
//     isRunning = true
//     setPace(350)
//   }
// }
// document.body.onkeyup = (e) => {
//   let keycode = e.which
//   if (keycode === 87) { // W key
//     isRunning = false
//     setPace(750)
//   }
// }
