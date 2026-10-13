import { useId } from 'react'

const wave = 'M-240 0 Q-210 -12 -180 0 T-120 0 T-60 0 T0 0 T60 0 T120 0 T180 0 T240 0 T300 0 T360 0 T420 0 T480 0 V240 H-240 Z'

export default function BrandMark({ compact = false }) {
  const id = useId()
  const lettersId = `${id}-letters`
  const gradientId = `${id}-liquid`

  return (
    <div className={`logo-loader-stage${compact ? ' logo-mark--compact' : ''}`} aria-hidden="true">
      <svg viewBox="0 0 240 240" className="relative size-full overflow-visible">
        <defs>
          <clipPath id={lettersId}>
            <text x="47" y="166" className="logo-loader-glyph">YS</text>
          </clipPath>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary-light)" />
            <stop offset="45%" stopColor="var(--brand-primary)" />
            <stop offset="100%" stopColor="var(--brand-primary-dark)" />
          </linearGradient>
        </defs>

        <circle cx="120" cy="120" r="108" className="logo-loader-track" />
        <circle cx="120" cy="120" r="96" className="logo-loader-ticks" strokeDasharray="1 12" />
        <g className="logo-loader-orbit">
          <circle cx="120" cy="120" r="108" className="logo-loader-arcs" strokeDasharray="52 287.292" />
          <circle cx="228" cy="120" r="3" className="logo-loader-spark" />
        </g>

        <text x="47" y="166" className="logo-loader-glyph logo-loader-outline">YS</text>
        <g clipPath={`url(#${lettersId})`}>
          <g className="logo-loader-liquid">
            <g className="logo-loader-wave logo-loader-wave--back">
              <path d={wave} fill={`url(#${gradientId})`} opacity="0.45" transform="translate(0 -5)" />
            </g>
            <g className="logo-loader-wave">
              <path d={wave} fill={`url(#${gradientId})`} />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
