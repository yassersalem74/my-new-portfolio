import { BriefcaseBusiness, Check, CodeXml, GraduationCap, NotebookPen, Presentation, UsersRound } from 'lucide-react'
import TimelineDate from './TimelineDate'

const entryIcons = {
  education: GraduationCap,
  training: NotebookPen,
  work: BriefcaseBusiness,
  code: CodeXml,
  teaching: Presentation,
  mentoring: UsersRound,
}

export default function TimelineEntry({ entry, index }) {
  const isLeft = index % 2 === 0
  const Icon = entryIcons[entry.icon] ?? BriefcaseBusiness
  const isCurrent = !entry.endDate

  return (
    <li className="relative min-w-0 pl-12 lg:grid lg:grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] lg:gap-x-5 lg:pl-0">
      <span aria-hidden="true" className="absolute top-6 left-0 z-10 flex size-9 items-center justify-center rounded-full border border-primary/25 bg-surface text-accent ring-[5px] ring-canvas lg:top-5 lg:left-1/2 lg:size-11 lg:-translate-x-1/2">
        <Icon size={19} strokeWidth={1.7} />
      </span>

      <article aria-labelledby={`experience-${entry.id}`} className={`relative min-w-0 rounded-2xl border border-border bg-surface/90 p-5 shadow-card transition-shadow hover:shadow-card-hover sm:p-6 lg:row-start-1 ${isLeft ? 'lg:col-start-1' : 'lg:col-start-3'}`}>
        <span aria-hidden="true" className={`pointer-events-none absolute top-10 hidden h-px w-12 bg-primary/25 lg:block ${isLeft ? '-right-12' : '-left-12'}`} />
        <span aria-hidden="true" className="absolute right-6 bottom-0 left-6 h-0.5 rounded-full bg-gradient-to-r from-primary/70 to-primary/10" />

        {(entry.logo || entry.label || isCurrent) && (
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            {entry.logo && <img src={entry.logo.src} alt={entry.logo.alt} width={entry.logo.width} height={entry.logo.height} loading="lazy" className="h-14 w-auto max-w-full shrink-0 rounded-lg bg-white p-1 object-contain" />}
            {(entry.label || isCurrent) && <div className="flex max-w-full flex-wrap items-center gap-2">
              {entry.label && <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-accent">{entry.label}</span>}
              {isCurrent && <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-accent"><span aria-hidden="true" className="size-1.5 rounded-full bg-primary" />Current role</span>}
            </div>}
          </div>
        )}
        <h3 id={`experience-${entry.id}`} className="text-base leading-snug font-extrabold tracking-[-0.025em] sm:text-lg">{entry.title}</h3>
        <p className="mt-2 text-xs leading-6 font-semibold text-accent sm:text-sm">{entry.organization}</p>
        <div className="mt-3 border-t border-primary/8 pt-3 lg:hidden"><TimelineDate startDate={entry.startDate} endDate={entry.endDate} /></div>

        {entry.description && <p className="mt-3 text-sm leading-7 text-muted">{entry.description}</p>}
        {entry.highlights?.length > 0 && (
          <ul className="mt-4 space-y-3">
            {entry.highlights.map(highlight => <li key={highlight} className="flex items-start gap-2 text-sm leading-7 text-muted"><Check size={14} className="mt-1.5 shrink-0 text-accent" strokeWidth={2.5} aria-hidden="true" /><span>{highlight}</span></li>)}
          </ul>
        )}
        {entry.skills?.length > 0 && (
          <ul aria-label={`${entry.title} skills`} className="mt-4 flex flex-wrap gap-1.5">
            {entry.skills.map(skill => <li key={skill} className="rounded-lg bg-surface-alt px-2.5 py-1.5 text-[11px] leading-4 font-medium text-muted">{skill}</li>)}
          </ul>
        )}
      </article>

      <div className={`hidden pt-7 lg:row-start-1 lg:block ${isLeft ? 'lg:col-start-3' : 'lg:col-start-1 lg:text-right'}`}>
        <TimelineDate startDate={entry.startDate} endDate={entry.endDate} className="rounded-full border border-border bg-surface/80 px-4 py-2" />
      </div>
    </li>
  )
}
