import { ArrowRight } from 'lucide-react'

export default function ProjectsHeader({ showAll, onToggle }) {
  return (
    <header className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
      <div className="relative z-10 max-w-[690px] sm:max-w-[70%] lg:max-w-[62%]">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.035em] text-muted"><span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-primary" />MY WORK</p>
        <h1 id="projects-heading" className="mt-3 text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.1] font-extrabold tracking-[-0.045em] lg:mt-2 lg:text-[clamp(2rem,3.6vw,3rem)]"><span className="mr-[0.12em]">{showAll ? 'All' : 'Featured'}</span>{' '}<span className="text-primary">Projects</span></h1>
        <p className="mt-3 text-sm leading-[1.65] text-muted sm:text-base lg:mt-2 lg:text-[14px]">A selection of my recent work in web development and UI/UX design, showcasing real-world solutions and modern user experiences.</p>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute top-2 right-[23%] hidden -rotate-12 font-handwriting text-[28px] leading-none text-accent xl:block">
        Real Projects<br /><span className="ml-3">Real Impact</span>
        <svg viewBox="0 0 85 80" fill="none" className="absolute top-3 left-[95%] h-16 w-20 rotate-12"><path d="M8 6c35 4 53 29 53 60m0 0-12-12m12 12 10-17" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>
      <button type="button" onClick={onToggle} className="button-primary relative z-10 self-start whitespace-nowrap sm:self-center lg:min-h-11 lg:px-5 lg:py-2.5 lg:text-sm">{showAll ? 'Show Featured' : 'View All Projects'}<ArrowRight size={18} aria-hidden="true" /></button>
    </header>
  )
}
