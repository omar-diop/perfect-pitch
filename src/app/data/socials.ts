import { IconType } from "react-icons"
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi"
import { SiMedium } from "react-icons/si"

export type Social = {
  title: string
  url: string
  Icon: IconType
}

const socials: Social[] = [
  {
    title: "GitHub",
    url: "https://github.com/omar-diop/perfect-pitch",
    Icon: FiGithub,
  },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/omar-diop-dev/",
    Icon: FiLinkedin,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/omar.developer/",
    Icon: FiInstagram,
  },
  {
    title: "Medium",
    url: "https://medium.com/@omardiop",
    Icon: SiMedium,
  },
]

export default socials
