import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import LiveProjectButton from './LiveProjectButton'

const projects = [
  {
    num: '01',
    name: 'ASHEO 1.6.1',
    category: 'Extension • MV3 • Real',
    desc: 'Custom payment gateways, BIN tools, integrity checks as clean MV3 extension. Bypasses payment processing and quickly gets transactions done. Makes life smoother. 5.9KB manifest, 2865 LOC popup, hashed + signed.',
    images: [
      '/ghost-1.jpg',
      '/ghost-2.jpg',
      '/liquid-chrome.jpg'
    ],
    href: 'https://github.com/shaikhmuzakkir003-blip/AAS/tree/main/ASH%201.6'
  },
  {
    num: '02',
    name: 'Hall of Fame',
    category: '14 Real Proofs • 0 Fake',
    desc: 'Every screenshot is real transaction smoothed by ASHEO. No fake data, no mockups, just Telegram fam showing love. Real people, real payments, life smoother. That is ASH face reveal.',
    images: [
      '/proofs/photo_2026-09-20_16-40-00.jpg',
      '/proofs/photo_2026-09-20_16-40-33.jpg',
      '/proofs/photo_2026-09-20_16-41-04.jpg'
    ],
    href: '#fame'
  },
  {
    num: '03',
    name: 'Telegram Ghost',
    category: 'Distribution • Ghost • No Face',
    desc: 'No face reveal, never will. No store, no LinkedIn, no clout. Telegram only. Proxy, privacy, browsingData, offscreen isolation. Builds in dark so you don\'t wait in light. Solo, no team, no funding, just work.',
    images: [
      '/ghost-3.jpg',
      '/fluid-1.jpg',
      '/smoke-yellow.jpg'
    ],
    href: '#telegram'
  }
]

function ProjectCard({ project, index, total }: { project: typeof projects[0], index: number, total: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start']
  })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - (total - 1 - index) * 0.03])
  const targetScale = 1 - (total - 1 - index) * 0.03

  return (
    <div ref={ref} className="h-[85vh] sticky flex items-center justify-center" style={{ top: `${index * 28}px` }}>
      <motion.div
        style={{ scale, top: `${index * 28}px` }}
        className="relative w-full max-w-6xl rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8"
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-6 items-start">
              <div className="font-black text-[#D7E2EA] leading-none" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>
                {project.num}
              </div>
              <div>
                <div className="font-mono text-[11px] tracking-widest uppercase text-white/40 mb-1">{project.category}</div>
                <h3 className="font-kanit font-bold text-white text-[1.8rem] sm:text-[2.2rem] leading-none tracking-tight">{project.name}</h3>
                <p className="font-light text-white/60 max-w-xl mt-3 text-sm sm:text-base leading-relaxed">{project.desc}</p>
              </div>
            </div>
            <div className="shrink-0">
              <LiveProjectButton href={project.href} />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4">
              <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                <img src={project.images[0]} alt="" className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/ghost-1.jpg' }} />
              </div>
              <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
                <img src={project.images[1]} alt="" className="w-full h-full object-cover" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/ghost-2.jpg' }} />
              </div>
            </div>
            <div className="col-span-7 rounded-[24px] sm:rounded-[32px] overflow-hidden border border-white/10">
              <img src={project.images[2]} alt="" className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px]" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).src = '/ghost-3.jpg' }} />
            </div>
          </div>
        </div>

        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] uppercase text-white/20">
          {project.num} / 0{total} • ASHEO 1.6.1 • REAL • NO FAKE • {targetScale.toFixed(2)} SCALE
        </div>
      </motion.div>
    </div>
  )
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Projects
      </h2>

      <div className="flex flex-col gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} total={projects.length} />
        ))}
      </div>

      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-6xl mx-auto">
        {[
          { img: '/proofs/photo_2026-09-20_16-40-13.jpg', tag: 'Real • #02' },
          { img: '/proofs/photo_2026-09-20_16-40-22.jpg', tag: 'Real • #03' },
          { img: '/proofs/photo_2026-09-20_16-40-27.jpg', tag: 'Real • #04' },
          { img: '/proofs/photo_2026-09-20_16-40-30.jpg', tag: 'Real • #05' },
          { img: '/proofs/photo_2026-09-20_16-40-36.jpg', tag: 'Real • #07' },
          { img: '/proofs/photo_2026-09-20_16-40-39.jpg', tag: 'Real • #08' },
          { img: '/proofs/photo_2026-09-20_16-40-43.jpg', tag: 'Real • #09' },
          { img: '/proofs/photo_2026-09-20_16-40-46.jpg', tag: 'Real • #10' },
        ].map((p, i) => (
          <div key={i} className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] group">
            <img src={p.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="font-mono text-[9px] tracking-widest uppercase bg-[#E8FF42] text-black px-2 py-1 rounded-full">{p.tag} • Telegram</span>
            </div>
          </div>
        ))}
      </div>

      <div id="telegram" className="mt-32 max-w-4xl mx-auto text-center bg-[#E8FF42] text-black rounded-[32px] p-10 sm:p-16">
        <h3 className="font-kanit font-black uppercase text-[2.5rem] sm:text-[3.5rem] leading-none tracking-tight">Get ASHEO<br/>on Telegram</h3>
        <p className="font-kanit font-light mt-4 max-w-xl mx-auto text-black/70">Distributed only via Telegram. No store, no BS. Direct from ASH. No face, just work. 14+ real proofs, 0 fake. Everything real from GitHub.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap">
          <a href="https://github.com/shaikhmuzakkir003-blip/AAS/tree/main/ASH%201.6" target="_blank" className="bg-black text-[#E8FF42] px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform">GitHub Source ↗</a>
          <a href="#" className="border-2 border-black text-black px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-[#E8FF42] transition-colors">Telegram — @asheo</a>
        </div>
      </div>
    </section>
  )
}
