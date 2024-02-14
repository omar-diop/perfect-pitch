"use client"

import { RecordButton } from "../RecordButton"
import { useState, useEffect } from "react"
import GaugeChart from "react-gauge-chart"
import * as styles from "./tuner.css"

import BrowserAudio, { FFT_SIZE } from "./libs/browserAudio"
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

const buffer = new Float32Array(FFT_SIZE)
const audioContext = BrowserAudio.getAudioContext()
const analyser = BrowserAudio.getAnalyser()

export function Tuner(props: ITuner) {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>()
  const [note, setNote] = useState<DetectedNote | undefined>()
  const [isListening, setListening] = useState(false)

  const startTuner = async () => {
    const microphone = await BrowserAudio.getMicStream()

    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }

    setSource(audioContext.createMediaStreamSource(microphone))
    setListening(true)
  }

  const stopTuner = async () => {
    if (source) {
      source.disconnect(analyser)
    }
    setListening(false)
    setNote(undefined)
  }

  const getPitch = () => {
    analyser.getFloatTimeDomainData(buffer)
    const correlatedValues = getAutocorrelatedValues(buffer)
    const frequency = getFrequency(correlatedValues, audioContext.sampleRate)

    if (frequency > -1) {
      const note = getNoteFromFrequency(frequency)
      setNote(note)
    } else {
      //TODO unset note after 1 sec
    }
  }

  useEffect(() => {
    if (source != null) {
      source.connect(analyser)
    }
  }, [source])

  useEffect(() => {
    const audioSample = setInterval(getPitch, 1)

    return () => clearInterval(audioSample)
  }, [])

  switch (props.instrument) {
    case "guitar":
      return (
        <div className={styles.container}>
          <GaugeChart
            id="accuracy"
            nrOfLevels={31}
            percent={centsOffToPercentage(note?.centsOff)}
            animate={false}
            marginInPercent={0.05}
            needleColor="#161719"
            needleBaseColor="#1f2428"
            colors={getColorsArray()}
            hideText
          />
          <NoteIndicator note={note} />
          <div className={styles.controls}>
            <RecordButton pressed={isListening} onClick={startTuner} />
          </div>
        </div>
      )
    default:
      return <></>
  }
}
