import * as styles from "./recordButton.css"
import { IoMusicalNotes } from "react-icons/io5"

type ICallToAction = {
  onClick: () => void
  pressed: boolean
}
export function RecordButton({ onClick, pressed }: ICallToAction) {
  return (
    <div
      className={styles.button[pressed ? "pressed" : "idle"]}
      onClick={onClick}
    >
      <button className={styles.inner[pressed ? "pressed" : "idle"]}>
        <IoMusicalNotes className={styles.icon} />
      </button>
    </div>
  )
}
