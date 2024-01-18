"use client"

import { CallToAction } from "../CallToAction"
import { useState, useEffect } from "react"
import * as styles from "./tuner.css"

import BrowserAudio, { FFT_SIZE } from "./libs/browserAudio"
import {
  getAutocorrelatedValues,
  getFrequency,
  getNoteFromPitch,
} from "./libs/pitchDetector"

type ITuner = { instrument: Instrument }

type Instrument = "guitar"

const buffer = new Float32Array(FFT_SIZE)
const audioContext = BrowserAudio.getAudioContext()
const analyser = BrowserAudio.getAnalyser()

export function Tuner(props: ITuner) {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>()
  const [note, setNote] = useState("")

  const startTuner = async () => {
    const microphone = await BrowserAudio.getMicStream()

    if (audioContext.state === "suspended") {
      await audioContext.resume()
    }

    setSource(audioContext.createMediaStreamSource(microphone))
  }

  const stopTuner = async () => {
    if (source) {
      source.disconnect(analyser)
    }
  }

  const getPitch = () => {
    analyser.getFloatTimeDomainData(buffer)
    const correlatedValues = getAutocorrelatedValues(buffer)
    const frequency = getFrequency(correlatedValues, audioContext.sampleRate)

    if (frequency > -1) {
      const note = getNoteFromPitch(frequency)
      setNote(note)
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
        <div>
          <h1>{note}</h1>
          <CallToAction
            type="primary_big"
            text="Inizia"
            onClick={startTuner}
            mode="button"
          />
          <CallToAction
            type="red_big"
            text="Ferma"
            onClick={stopTuner}
            mode="button"
          />
        </div>
      )
    default:
      return <></>
  }
}
