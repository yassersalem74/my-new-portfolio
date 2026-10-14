import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import ResumeButton from '../ui/ResumeButton'
import MotionAtmosphere from '../ui/MotionAtmosphere'
import HeroStats from './HeroStats'
import HeroVisual from './HeroVisual'

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-heading" className="page-container relative isolate grid min-h-[calc(100svh-96px)] items-center gap-6 pt-6 pb-16 sm:gap-8 sm:pt-10 lg:min-h-[calc(100svh-80px)] lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:py-[clamp(1rem,3svh,2rem)] xl:gap-8">
      <MotionAtmosphere scene="home" />
      <HeroVisual />
      <div className="relative z-20 lg:order-first">
        <span data-reveal="rise" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-soft px-4 py-2 text-sm font-semibold text-muted lg:py-1.5 lg:text-xs">
          <span aria-hidden="true" className="motion-hand">👋</span> Hi, I’m
        </span>
        <h1 id="hero-heading" data-reveal="mask" data-reveal-delay="90" className="mt-5 text-[clamp(3rem,7vw,6.5rem)] leading-[1.08] font-extrabold tracking-[-0.065em] lg:mt-3 lg:whitespace-nowrap lg:text-[clamp(2.75rem,7.5svh,4.5rem)]">
          <span className="mr-[0.13em]">Yasser</span>{' '}<span className="motion-ink text-primary">Salem<span className="ml-1">.</span></span>
        </h1>
        <h2 data-reveal="rise" data-reveal-delay="170" className="mt-3 text-lg leading-relaxed font-bold tracking-[-0.025em] sm:text-2xl lg:mt-2 lg:text-[clamp(1rem,1.45vw,1.375rem)]">
          Front-End Developer <span className="text-accent">&amp; Technical Instructor</span>
        </h2>
        <p data-reveal="rise" data-reveal-delay="240" className="mt-4 max-w-[650px] text-sm leading-[1.8] text-muted sm:text-base lg:mt-3 lg:text-[clamp(0.875rem,1.05vw,1rem)] lg:leading-[1.65]">
          I design and build modern, scalable, and user-friendly web applications with a focus on clean UI, performance, and real-world impact.<br className="hidden xl:block" />{' '}
          As an instructor at ITI, I also enjoy teaching and helping the next generation of developers grow their skills.
        </p>
        <div data-reveal="rise" data-reveal-delay="310" className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-5 lg:gap-3">
          <Link to="/projects" className="button-primary sm:px-7 lg:min-h-11 lg:px-5 lg:py-2.5 lg:text-sm">
            View My Work <ArrowRight size={21} aria-hidden="true" />
          </Link>
          <ResumeButton className="lg:min-h-11 lg:px-5 lg:py-2.5 lg:text-sm" />
        </div>
        <HeroStats />
      </div>
    </section>
  )
}
