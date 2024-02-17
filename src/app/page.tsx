import * as styles from "./styles/home.css"
import { Tuner } from "./components/Tuner"
import { Footer } from "./components/Footer"
import Image from "next/image"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <Image
          src="/images/logo.png"
          alt="Perfect Pitch, Logo"
          width={200}
          height={100}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.box}>
          <Tuner instrument="guitar" />
        </div>
      </div>
      <Footer />
    </main>
  )
}
