"use client"

import { RecordButton } from "../RecordButton"
import { useState, useEffect } from "react"
import GaugeChart from "react-gauge-chart"
import * as styles from "./tuner.css"

import BrowserAudio from "./libs/browserAudio"
import {
  getAutocorrelatedValues,
  getFrequency,
  getNoteFromFrequency,
  DetectedNote,
} from "./libs/pitchDetector"
import { centsOffToPercentage, getColorsArray } from "./utils"
import { NoteIndicator } from "../NoteIndicator"

type ITuner = { instrument: Instrument }

type Instrument = "guitar"

const browserAudio = new BrowserAudio(
  typeof window !== "undefined" ? window : undefined
)
const buffer = new Float32Array(browserAudio.getFftSize())

const audioContext = browserAudio.getAudioContext()
const analyser = browserAudio.getAnalyser()

export function Tuner(props: ITuner) {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>()
  const [note, setNote] = useState<DetectedNote | undefined>()
  const [isListening, setListening] = useState(false)

  const startTuner = async () => {
    if (!audioContext) return
    const microphone = await browserAudio.getMicStream()

    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }

    setSource(audioContext.createMediaStreamSource(microphone))
    setListening(true)
  }

  const stopTuner = async () => {
    if (source && analyser) {
      source.disconnect(analyser)
    }
    setListening(false)
    setNote(undefined)
    setSource(undefined)
  }

  const getPitch = () => {
    if (!analyser || !audioContext) return
    analyser.getFloatTimeDomainData(buffer)
    const correlatedValues = getAutocorrelatedValues(buffer)
    const frequency = getFrequency(correlatedValues, audioContext.sampleRate)

    if (frequency > -1) {
      const note = getNoteFromFrequency(frequency)
      setNote(note)
    }
  }

  useEffect(() => {
    let audioSample: NodeJS.Timeout
    if (source != null && analyser) {
      source.connect(analyser)
      audioSample = setInterval(getPitch, 1)
    }
    return () => clearInterval(audioSample)
  }, [source])

  switch (props.instrument) {
    case "guitar":
      return (
        <div className={styles.container}>
          <GaugeChart
            id="accuracy"
            nrOfLevels={31}
            percent={centsOffToPercentage(note?.centsOff)}
            animate={false}
            marginInPercent={0.02}
            needleColor="#161719"
            needleBaseColor="#1f2428"
            colors={getColorsArray()}
            hideText
          />
          <NoteIndicator note={note} />
          <div className={styles.controls}>
            <RecordButton
              pressed={isListening}
              onClick={isListening ? stopTuner : startTuner}
            />
          </div>
        </div>
      )
    default:
      return <></>
  }
}
