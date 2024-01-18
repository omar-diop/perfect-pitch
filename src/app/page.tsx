import Image from "next/image"
import * as styles from "./styles/home.css"

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
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <div className={styles.footer}>
        <p>Footer</p>
      </div>
    </main>
  )
}
