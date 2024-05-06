import type { Metadata } from "next"
import "./styles/globals.css"
import * as style from "./styles/globals.css"
import { TagManager } from "./components/TagManager"

export const metadata: Metadata = {
  title: "Accordatore Online",
  description: "Accorda gratuitamente il tuo strumento",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <TagManager />
        <div id="mainContainer" className={style.container}>
          {children}
        </div>
      </body>
    </html>
  )
}
