import * as style from "./footer.css"
import socials from "../../data/socials"

export function Footer() {
  return (
    <footer className={style.container}>
      <div className={style.socialsContainer}>
        {socials.map(({ title, url, Icon }) => (
          <a
            key={title}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={style.link}
          >
            <Icon className={style.icon} />
          </a>
        ))}
      </div>
      <div>
        Handcrafted in 🇮🇹 by
        <a
          className={style.author}
          target="_blank"
          rel="noopener noreferrer"
          href="https://omardiop.com"
        >
          Omar Diop
        </a>
      </div>
    </footer>
  )
}
