import { skillCategories } from '../../data/skills'
import SkillCategory from './SkillCategory'
import SkillsHeader from './SkillsHeader'

export default function SkillsSection() {
  return (
    <section aria-labelledby="skills-heading" className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_10%,var(--color-glow)_0%,var(--color-canvas)_55%,var(--color-canvas)_100%)]">
      <div aria-hidden="true" className="pointer-events-none absolute top-[-100px] left-[42%] h-[350px] w-[450px] rotate-20 rounded-[120px] bg-glow/40" />
      <div className="page-container relative pt-8 pb-10 sm:pt-10 sm:pb-12 lg:flex lg:min-h-[calc(100svh-80px)] lg:flex-col lg:justify-center lg:py-[clamp(12px,2.5svh,24px)] lg:[@media(max-height:680px)]:py-2">
        <SkillsHeader />
        <div className="relative z-20 mt-6 grid gap-4 md:grid-cols-2 lg:mt-4 lg:grid-cols-6 lg:gap-3 xl:gap-4 lg:[@media(max-height:680px)]:gap-3">
          {skillCategories.map(category => <SkillCategory key={category.id} category={category} />)}
        </div>
      </div>
    </section>
  )
}
