let audioContext = new AudioContext();

fetch('itsgonnarain.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    let sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 16.5;
    sourceNode.loopEnd = 17.3;
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, 16.5);
  })
  .catch(e => console.error(e));