import { CodeXml, GraduationCap, PanelsTopLeft, UsersRound } from 'lucide-react'
import { profile } from '../../data/portfolio'

export default function SkillsHeader() {
  return (
    <div className="relative lg:min-h-[clamp(144px,24svh,232px)]">
      <div className="relative z-10 lg:max-w-[52%]">
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.035em] text-muted sm:text-sm lg:text-xs">
          <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-primary" />
          SKILLS
        </p>
        <h1 id="skills-heading" className="mt-4 text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.12] font-extrabold tracking-[-0.045em] lg:mt-3 lg:text-[clamp(1.875rem,3.35vw,3rem)] lg:[@media(max-height:680px)]:text-[clamp(1.875rem,3vw,2.625rem)]">
          Skills &amp; <span className="text-primary">Technologies</span>
        </h1>
        <p className="mt-4 max-w-[650px] text-sm leading-[1.75] text-muted sm:text-base lg:mt-3 lg:text-[clamp(0.875rem,1.05vw,1rem)] lg:leading-[1.65] lg:[@media(max-height:680px)]:text-[13px]">
          I specialize in front-end development and technical instruction, building modern web applications and helping the next generation of developers gain practical, real-world skills.
        </p>
      </div>

      <div className="relative mt-6 h-[260px] overflow-hidden rounded-[32px] bg-glow sm:h-[320px] lg:absolute lg:top-[-24px] lg:right-[-3%] lg:mt-0 lg:h-[calc(100%+140px)] lg:w-[44%] lg:rounded-tl-[100px] lg:rounded-tr-none lg:rounded-br-[100px] lg:rounded-bl-[60px] lg:[mask-image:linear-gradient(to_bottom,black_65%,transparent)]">
        <img src={profile.aboutImage} alt="Yasser Salem teaching a front-end development class" width="1371" height="1148" fetchPriority="high" className="h-full w-full object-cover object-[48%_15%] lg:object-top" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-l from-glow/70 via-transparent to-glow/20 dark:from-canvas/60 dark:to-canvas/20" />
        <div aria-hidden="true" className="absolute top-[8%] right-[19%] hidden -rotate-6 rounded-xl border border-border bg-surface/90 px-3 py-2 font-handwriting text-[25px] leading-[1.02] font-semibold text-accent backdrop-blur-md xl:block">
          Build<br />Design<br />Teach<br />Repeat.
          <span className="mt-2 block h-0.5 w-20 -rotate-8 rounded-full bg-accent/70" />
        </div>
        <div aria-hidden="true" className="absolute top-[7%] right-3 hidden flex-col gap-2 xl:flex 2xl:right-6">
          {[CodeXml, PanelsTopLeft, UsersRound].map((Icon, index) => (
            <span key={index} className="flex size-10 items-center justify-center rounded-xl border border-border bg-surface/90 text-accent backdrop-blur-md 2xl:size-12">
              <Icon size={24} strokeWidth={1.7} />
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-[-36px] mr-3 ml-3 flex max-w-[360px] items-center gap-3 rounded-2xl border border-border bg-surface/95 p-4 shadow-card backdrop-blur-md sm:ml-5 lg:absolute lg:bottom-1 lg:left-[55%] lg:mt-0 lg:mr-0 lg:ml-0 lg:hidden lg:w-[240px] lg:gap-3 lg:p-3 xl:flex">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-soft text-accent lg:size-10">
          <GraduationCap className="size-8 lg:size-7" strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm leading-relaxed font-extrabold lg:text-xs">Front-End Developer &amp;<br />Technical Instructor</p>
          <p className="mt-1 text-xs text-muted lg:text-[10px]">Build · Teach · Empower</p>
        </div>
      </div>
    </div>
  )
}
