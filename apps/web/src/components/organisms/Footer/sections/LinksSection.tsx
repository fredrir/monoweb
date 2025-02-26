import { cva } from "cva"
import type { FooterLinkType } from "../Footer"
import { FooterLink } from "../components/FooterLink"

interface LinksSectionProps {
  links: FooterLinkType
}

export const LinksSection = ({ links }: LinksSectionProps) => (
  <div className="mx-12 mb-4 flex items-start gap-8 sm:flex-col sm:items-center sm:gap-0">
    <ul className={section()}>
      {links.main.map((link) => (
        <FooterLink label={link.label} href={link.href} key={link.label} large />
      ))}
    </ul>
    <ul className={section({ main: false })}>
      {links.second.map((link) => (
        <FooterLink label={link.label} href={link.href} key={link.label} />
      ))}
    </ul>
  </div>
)

const section = cva("my-8 flex flex-col justify-center gap-8 sm:flex-row", {
  variants: {
    main: {
      false: "sm:mt-0",
    },
  },
})
