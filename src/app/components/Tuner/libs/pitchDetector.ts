export type Note =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B"

export type DetectedNote = {
  name: Note
  octave: number
  centsOff: number
  frequency: number
}

export const NOTES: Note[] = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
]

const rxx = (lag: number, N: number, audioSignal: Float32Array) => {
  var sum = 0
  for (var n = 0; n <= N - lag - 1; n++) {
    sum += audioSignal[n] * audioSignal[n + lag]
  }
  return sum
}

const autocorrelationWithLag = (audioSignal: Float32Array) => {
  let autocorrelation = []
  let rms = 0 //https://en.wikipedia.org/wiki/Root_mean_square

  for (var lag = 0; lag < audioSignal.length; lag++) {
    autocorrelation[lag] = rxx(lag, audioSignal.length, audioSignal)
    rms += autocorrelation[lag] * autocorrelation[lag]
  }

  rms = Math.sqrt(rms / audioSignal.length)

  if (rms < 0.05) {
    return []
  }
  return autocorrelation
}

const normalize = (data: number[]) => {
  var maxAbsX = Math.abs(Math.max(...data))
  return data.map((x) => x / maxAbsX)
}

const getAutocorrelatedValues = (audioSignal: Float32Array) => {
  return normalize(autocorrelationWithLag(audioSignal))
}

const getFrequency = (correlatedValues: number[], sampleRate: number) => {
  const N = correlatedValues.length
  let largestPeakValue = 0
  let largestPeakIndex = -1

  for (let index = 1; index < N; index++) {
    const prev = correlatedValues[index - 1]
    const current = correlatedValues[index]
    const next = correlatedValues[index + 1]

    const isPeak = prev < current && next < current
    if (isPeak) {
      if (current > largestPeakValue) {
        largestPeakValue = current
        largestPeakIndex = index
      }
    }
  }

  const fundamentalFrequency = sampleRate / largestPeakIndex
  return fundamentalFrequency
}

//Math source: https://newt.phys.unsw.edu.au/jw/notes.html

const getNoteFromFrequency = (frequency: number): DetectedNote => {
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
