import { useId } from 'react'
import { Link } from 'react-router'

export default function Logo() {
  const id = useId()
  const portraitId = `${id}-nav-portrait`
  const maskId = `${id}-nav-mask`
  const reflectionId = `${id}-nav-reflection`

  return (
    <Link to="/" aria-label="Yasser Salem home" className="navbar-logo">
      <span className="navbar-logo-avatar" aria-hidden="true">
        <svg viewBox="275 100 748 952" className="size-full" focusable="false">
          <defs>
            <image id={portraitId} href="/loading-logo.png" width="1302" height="1208" />
            <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1302" height="1208" style={{ maskType: 'alpha' }}>
              <use href={`#${portraitId}`} />
            </mask>
            <linearGradient id={reflectionId}>
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="50%" stopColor="white" stopOpacity="0.45" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <use href={`#${portraitId}`} />
          <g mask={`url(#${maskId})`}>
            <path d="M60 0 H220 L600 1208 H440 Z" fill={`url(#${reflectionId})`} className="navbar-logo-reflection" />
          </g>
        </svg>
      </span>
      <span className="navbar-logo-divider" aria-hidden="true" />
      <span className="navbar-logo-name" aria-hidden="true">
        <span className="navbar-logo-word">Yasser</span>
        <span className="navbar-logo-word navbar-logo-word--accent">Salem</span>
      </span>
    </Link>
  )
}
