import { DetectedNote } from "../Tuner/libs/pitchDetector"
import * as styles from "./noteIndicator.css"

type INoteIndicator = {
  note: DetectedNote | undefined
}

export function NoteIndicator(props: INoteIndicator) {
  return (
    <div className={styles.container}>
      {props.note ? (
        <>
          <span
            className={styles.name}
          >{`${props.note.name}${props.note.octave}`}</span>
          <span
            className={styles.frequency}
          >{`${props.note.frequency}Hz`}</span>
        </>
      ) : (
        <span className={styles.idle}>{`_ _`}</span>
      )}
    </div>
  )
}
