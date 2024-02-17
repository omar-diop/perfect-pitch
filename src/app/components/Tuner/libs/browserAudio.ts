const FFT_SIZE = 2048

class BrowserAudio {
  audioContext: AudioContext | null
  analyser: AnalyserNode | null
  fftSize: number

  constructor(window: undefined | (Window & typeof globalThis)) {
    if (typeof window !== "undefined") {
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)()
      this.audioContext = audioContext
      this.analyser = audioContext.createAnalyser()
      this.analyser.fftSize = FFT_SIZE
    } else {
      this.audioContext = null
      this.analyser = null
    }
    this.fftSize = FFT_SIZE
  }

  getMicStream() {
    return navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        autoGainControl: false,
        noiseSuppression: true,
      },
    })
  }

  getAudioContext() {
    return this.audioContext
  }

  getAnalyser() {
    return this.analyser
  }

  getFftSize() {
    return this.fftSize
  }
}

export default BrowserAudio
