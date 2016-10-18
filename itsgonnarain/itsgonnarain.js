let audioContext = new AudioContext();

let startLoop = function(audioBuffer, pan = 0) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 16.5;
    sourceNode.loopEnd = 17.3;
    // StereoPannerNode has a pan attribute that can be set to a number between -1 (all the way to the left) and 1 (all the way to the right)
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    sourceNode.start(0, 16.5);
};

fetch('itsgonnarain.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1);
  })
  .catch(e => console.error(e));