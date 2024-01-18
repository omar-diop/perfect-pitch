import Image from "next/image"
import * as styles from "./styles/home.css"
import { Tuner } from "./components/Tuner"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <p>Accordatore Online</p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Omar
          </a>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.box}>
          <Tuner instrument="guitar" />
        </div>
      </div>
      <div className={styles.footer}>
        <p>Footer</p>
      </div>
    </main>
  )
}
