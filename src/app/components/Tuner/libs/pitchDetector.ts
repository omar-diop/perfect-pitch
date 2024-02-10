const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]

export type Note = {
  name: string
  octave: number
  centsOff: number
  frequency: number
}

const rxx = (lag: number, N: number, samples: Float32Array) => {
  var sum = 0
  for (var n = 0; n <= N - lag - 1; n++) {
    sum += samples[n] * samples[n + lag]
  }
  return sum
}

const autocorrelationWithShiftingLag = (samples: Float32Array) => {
  let autocorrelation = []
  let rms = 0 //https://en.wikipedia.org/wiki/Root_mean_square

  for (var lag = 0; lag < samples.length; lag++) {
    autocorrelation[lag] = rxx(lag, samples.length, samples)
    rms += autocorrelation[lag] * autocorrelation[lag]
  }

  rms = Math.sqrt(rms / samples.length)

  if (rms < 0.05) {
    return []
  }
  return autocorrelation
}
const maxAbsoluteScaling = (data: number[]) => {
  var xMax = Math.abs(Math.max(...data))
  return data.map((x) => x / xMax)
}

//Math source: https://en.wikipedia.org/wiki/Autocorrelation
const getAutocorrelatedValues = (audioSignal: Float32Array) => {
  return maxAbsoluteScaling(autocorrelationWithShiftingLag(audioSignal))
}

const getFrequency = (correlatedValues: number[], sampleRate: number) => {
  var N = correlatedValues.length
  var valOfLargestPeak = 0
  var indexOfLargestPeak = -1

  for (var index = 1; index < N; index++) {
    var valL = correlatedValues[index - 1]
    var valC = correlatedValues[index]
    var valR = correlatedValues[index + 1]

    var bIsPeak = valL < valC && valR < valC
    if (bIsPeak) {
      if (valC > valOfLargestPeak) {
        valOfLargestPeak = valC
        indexOfLargestPeak = index
      }
    }
  }

  var distanceToNextLargestPeak = indexOfLargestPeak - 0

  var fundamentalFrequency = sampleRate / distanceToNextLargestPeak
  return fundamentalFrequency
}

//Math source: https://newt.phys.unsw.edu.au/jw/notes.html

const getNoteFromFrequency = (frequency: number): Note => {
  const midiNum = getMidiNumberFromPitch(frequency)
  return {
    name: NOTES[midiNum % 12],
    octave: Math.floor(midiNum / 12 - 1),
    centsOff: getCentsFromPitch(frequency, midiNum),
    frequency: Math.round((frequency + Number.EPSILON) * 100) / 100,
  }
}

const getMidiNumberFromPitch = (frequency: number) => {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2))
  const midiNum = Math.round(noteNum) + 69

  return midiNum
}

const getCentsFromPitch = (frequency: number, note: number) => {
  const baseFrequency = getPitchFromNote(note)

  return Math.floor((1200 * Math.log(frequency / baseFrequency)) / Math.log(2))
}

const getPitchFromNote = (note: number) => {
  return 440 * Math.pow(2, (note - 69) / 12)
}

export { getAutocorrelatedValues, getFrequency, getNoteFromFrequency }
