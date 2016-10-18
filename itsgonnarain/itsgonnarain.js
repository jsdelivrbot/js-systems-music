let audioContext = new AudioContext();
let loopStart = 16.5;
let loopDuration = .8;
let phaseShiftRate = 1.002;

let startLoop = function(audioBuffer, pan = 0, rate = 1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = loopStart;
    sourceNode.loopEnd = loopStart + loopDuration;
    sourceNode.playbackRate.value = rate;
    // StereoPannerNode has a pan attribute that can be set to a number between -1 (all the way to the left) and 1 (all the way to the right)
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    sourceNode.start(0, loopStart);
};

fetch('itsgonnarain.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, phaseShiftRate);
  })
  .catch(e => console.error(e));