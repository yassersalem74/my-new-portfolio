import { useId } from 'react'

const wave = 'M-240 0 Q-210 -12 -180 0 T-120 0 T-60 0 T0 0 T60 0 T120 0 T180 0 T240 0 T300 0 T360 0 T420 0 T480 0 V240 H-240 Z'

export default function BrandMark() {
  const id = useId()
  const portraitId = `${id}-portrait`
  const revealId = `${id}-reveal`
  const silhouetteId = `${id}-silhouette`
  const trailId = `${id}-trail`

  return (
    <div className="logo-loader-stage" aria-hidden="true">
      <svg viewBox="0 0 240 240" className="relative size-full overflow-visible">
        <defs>
          <image id={portraitId} href="/loading-logo.png" x="-1" y="9" width="244" height="226.4" />
          <clipPath id={revealId} clipPathUnits="userSpaceOnUse">
            <path d={wave} className="logo-loader-liquid" />
          </clipPath>
          <mask id={silhouetteId} maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="240" style={{ maskType: 'alpha' }}>
            <use href={`#${portraitId}`} />
          </mask>
          <linearGradient id={trailId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary-light)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="108" className="logo-loader-track" />
        <circle cx="120" cy="120" r="96" className="logo-loader-ticks" strokeDasharray="1 12" />
        <g className="logo-loader-orbit">
          <circle cx="120" cy="120" r="108" className="logo-loader-arcs" strokeDasharray="52 287.292" />
          <circle cx="228" cy="120" r="3" className="logo-loader-spark" />
        </g>

        <g className="logo-loader-portrait">
          <use href={`#${portraitId}`} className="logo-loader-ghost" />
          <g clipPath={`url(#${revealId})`}>
            <use href={`#${portraitId}`} />
          </g>
          <g mask={`url(#${silhouetteId})`}>
            <g className="logo-loader-scan">
              <rect x="38" y="0" width="164" height="38" fill={`url(#${trailId})`} />
              <rect x="38" y="-1" width="164" height="2" rx="1" fill="var(--brand-primary-light)" />
            </g>
            <g className="logo-loader-polish">
              <path d="M-40 0 H-14 L70 240 H44 Z" fill="white" fillOpacity="0.24" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
