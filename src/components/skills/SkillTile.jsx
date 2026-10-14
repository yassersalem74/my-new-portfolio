import SkillIcon from './SkillIcon'

export default function SkillTile({ skill, index = 0 }) {
  return (
    <li data-reveal="zoom" data-reveal-delay={index * 55} style={{ '--skill-glow': skill.color ?? 'var(--brand-primary)' }} className="motion-skill relative flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-surface-alt/90 px-2 py-3 text-center shadow-card sm:py-4 lg:min-h-[86px] lg:gap-2 lg:px-1.5 lg:py-2.5 lg:[@media(max-height:680px)]:min-h-[72px] lg:[@media(max-height:680px)]:gap-1.5 lg:[@media(max-height:680px)]:py-2">
      <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 size-full" style={{ color: ['next', 'github'].includes(skill.id) ? 'var(--color-ink)' : skill.color ?? 'var(--color-primary)' }}>
        <rect
          x="1"
          y="1"
          rx="15"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          pathLength="100"
          strokeDasharray="12 38"
          className="animate-skill-border motion-reduce:animate-none"
          style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', animationDelay: `${index * -0.65}s` }}
        />
      </svg>
      <SkillIcon name={skill.id} className="size-10 shrink-0 sm:size-11 lg:size-8 xl:size-9 lg:[@media(max-height:680px)]:size-7" />
      <span className="max-w-full text-xs leading-[1.4] font-semibold tracking-[-0.02em] text-ink sm:text-[13px] lg:text-[10px] xl:text-[11px] 2xl:text-xs">{skill.name}</span>
    </li>
  )
}
