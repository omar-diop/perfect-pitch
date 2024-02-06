"use client"

import { CallToAction } from "../CallToAction"
import { useState, useEffect } from "react"
import GaugeChart from "react-gauge-chart"
import * as styles from "./tuner.css"

import BrowserAudio, { FFT_SIZE } from "./libs/browserAudio"
import {
  getAutocorrelatedValues,
  getFrequency,
  getNoteFromFrequency,
  Note,
} from "./libs/pitchDetector"

type ITuner = { instrument: Instrument }

type Instrument = "guitar"

const buffer = new Float32Array(FFT_SIZE)
const audioContext = BrowserAudio.getAudioContext()
const analyser = BrowserAudio.getAnalyser()

export function Tuner(props: ITuner) {
  const [source, setSource] = useState<MediaStreamAudioSourceNode>()
  const [note, setNote] = useState<Note | undefined>()
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

  const centsOffToPercentage = (cents: number | undefined) =>
    cents ? 0.5 + cents / 100 : 0.5

  switch (props.instrument) {
    case "guitar":
      return (
        <div>
          {isListening ? (
            <>
              <GaugeChart
                id="accuracy"
                nrOfLevels={35}
                percent={centsOffToPercentage(note?.centsOff)}
                animate={false}
                marginInPercent={0.01}
                hideText
              />
              {note && (
                <>
                  <h1>{`${note?.name}${note?.octave}`}</h1>
                  <h1>{`${note?.centsOff}`}</h1>
                  <h1>{`${note?.frequency}`}</h1>
                </>
              )}
              <CallToAction
                type="red_big"
                text="Ferma"
                onClick={stopTuner}
                mode="button"
              />
            </>
          ) : (
            <>
              <CallToAction
                type="primary_big"
                text="Accorda"
                onClick={startTuner}
                mode="button"
              />
            </>
          )}
        </div>
      )
    default:
      return <></>
  }
}
