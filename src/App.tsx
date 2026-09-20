import { useEffect } from 'react'
import Lenis from 'lenis'
import HeroSection from './components/HeroSection'
import MarqueeSection from './components/MarqueeSection'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import ProjectsSection from './components/ProjectsSection'

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="bg-[#0C0C0C] font-kanit overflow-x-clip min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <footer className="bg-[#0C0C0C] border-t border-white/10 px-6 md:px-10 py-8 flex flex-col sm:flex-row justify-between gap-4 font-mono text-[10px] tracking-[0.15em] uppercase text-white/30">
        <span>© 2026 ASH • NO FACE • JUST WORK • ASHEO 1.6.1 • TELEGRAM ONLY • 14+ REAL • 0 FAKE • BUILT AT 3:17 AM</span>
        <span className="text-white/50">MV3 • HASHED • SIGNED • 0.8s • 116+ GATEWAYS • REAL • JACK STRUCTURE FOR ASH</span>
      </footer>
    </div>
  )
}
