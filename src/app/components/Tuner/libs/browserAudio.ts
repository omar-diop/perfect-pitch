export const FFT_SIZE = 2048
//@ts-ignore
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const analyser = audioContext.createAnalyser()
analyser.fftSize = 2048

const BrowserAudio = {
  getMicStream() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: false,
      },
    })
  },

  getAudioContext() {
    return audioContext
  },

  getAnalyser() {
    return analyser
  },
}

export default BrowserAudio
