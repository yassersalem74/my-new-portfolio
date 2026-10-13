import { BriefcaseBusiness, GraduationCap, NotebookPen } from 'lucide-react'
import TimelineEntry from './TimelineEntry'

const groupIcons = {
  education: GraduationCap,
  training: NotebookPen,
  work: BriefcaseBusiness,
}

export default function TimelineGroup({ group }) {
  const Icon = groupIcons[group.icon] ?? BriefcaseBusiness

  return (
    <section aria-labelledby={`timeline-${group.id}`}>
      <header className="flex items-center gap-3 lg:justify-center">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-accent lg:size-11"><Icon size={23} strokeWidth={1.6} aria-hidden="true" /></span>
        <div>
          <p className="text-[10px] font-semibold tracking-[0.12em] text-muted uppercase">{group.subtitle}</p>
          <h2 id={`timeline-${group.id}`} className="mt-1 text-xl font-extrabold tracking-[-0.03em] sm:text-2xl">{group.title}</h2>
        </div>
      </header>

      <ol aria-label={`${group.title} timeline`} className="relative mt-6 space-y-6 before:absolute before:top-6 before:bottom-0 before:left-[18px] before:w-px before:bg-gradient-to-b before:from-primary/65 before:to-primary/10 lg:mt-8 lg:before:left-1/2 lg:before:-translate-x-1/2">
        {group.entries.map((entry, index) => <TimelineEntry key={entry.id} entry={entry} index={index} />)}
      </ol>
    </section>
  )
}
