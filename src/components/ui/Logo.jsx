import { Link } from 'react-router'

export default function Logo() {
  return (
    <Link to="/" aria-label="Yasser Salem home" className="inline-flex shrink-0 items-center text-[2.5rem] leading-none font-extrabold tracking-[-0.22em] sm:text-5xl">
      <span className="text-ink">Y</span><span className="pr-2 text-primary">S</span>
    </Link>
  )
}
