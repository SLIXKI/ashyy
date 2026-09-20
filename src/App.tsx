import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Lenis from 'lenis'

// s0animation.com/design inspired — but for ASH ghost dev

function Marquee() {
  return (
    <div className="relative w-full overflow-hidden border-y border-black/[0.08] py-3 bg-white">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap gap-8 mono text-[13px] tracking-[0.2em] uppercase text-black/60"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="flex items-center gap-8">
            FOUNDING DEVELOPER · END-TO-END / FULL STACK · 6+ YEARS · 116+ GATEWAYS · 0.8S BYPASS ·
          </span>
        ))}
      </motion.div>
    </div>
  )
}

function Case({ num, title, subtitle, tags, desc, color }: { num: string; title: string; subtitle: string; tags: string; desc: string; color: string }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative border-t border-black/[0.08] py-12 md:py-20 px-6 md:px-12 flex flex-col md:flex-row gap-8 md:gap-12 cursor-pointer"
    >
      <div className="md:w-[120px] shrink-0">
        <div className="mono text-[12px] tracking-widest text-black/40">case {num}</div>
        <div className={`mt-4 w-12 h-12 rounded-full flex items-center justify-center mono text-[10px] font-bold transition-all ${hover ? 'bg-black text-white scale-110' : 'bg-black/[0.06] text-black/40'}`}>↗</div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center mono text-[10px] font-bold text-white`} style={{ background: color }}>A</div>
          <div className="mono text-[11px] tracking-widest uppercase text-black/40">{tags}</div>
        </div>
        <h3 className="text-[28px] md:text-[40px] font-[600] leading-[0.9] tracking-[-0.02em] text-black group-hover:tracking-[-0.01em] transition-all">
          {title.split('_').map((p, i) => (
            <span key={i} className={i === 1 ? 'text-black/40' : ''}>{p}{i === 0 ? '_' : ''}<br /></span>
          ))}
        </h3>
        <div className="mt-4 mono text-[12px] text-black/50 max-w-[420px] leading-[1.6]">{desc}</div>
        <div className="mt-6 inline-flex items-center gap-2 mono text-[11px] tracking-widest uppercase text-black/60 group-hover:text-black transition-colors">
          Deep dive <span className="group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      <div className="md:w-[320px] shrink-0">
        <motion.div
          animate={{ y: hover ? -4 : 0, scale: hover ? 1.02 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="aspect-[4/3] rounded-[16px] overflow-hidden bg-[#F5F5F3] border border-black/[0.06] relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[70%] h-[60%] rounded-[12px] bg-white border border-black/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-3">
              <div className="h-6 flex items-center justify-between border-b border-black/[0.06] pb-2">
                <div className="flex gap-1"><div className="w-2 h-2 rounded-full bg-black/10" /><div className="w-2 h-2 rounded-full bg-black/10" /><div className="w-2 h-2 rounded-full bg-black/10" /></div>
                <div className="mono text-[8px] text-black/30">ASHEO 1.6.1</div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-2 w-3/4 rounded bg-black/[0.06]" />
                <div className="h-2 w-1/2 rounded bg-black/[0.04]" />
                <div className="mt-4 h-8 rounded-[8px] bg-[#E8FF42] flex items-center justify-center mono text-[8px] font-bold text-black">0.8S BYPASS</div>
              </div>
            </div>
          </div>
          {hover && <div className="absolute inset-0 bg-black/[0.02]" />}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function App() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, -100])
  const heroScale = useTransform(scrollY, [0, 600], [1, 1.05])

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className="min-h-screen bg-[#FCFCF9] text-black selection:bg-[#E8FF42]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[56px] flex items-center justify-between px-6 md:px-10 bg-[#FCFCF9]/80 backdrop-blur-xl border-b border-black/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center mono text-[11px] font-bold">A</div>
          <span className="mono text-[12px] tracking-widest uppercase font-medium">ASH OS · 1.6.1</span>
          <span className="hidden md:block mono text-[10px] text-black/30 tracking-widest uppercase ml-3">6+ years · 116+ gateways · 0.8s</span>
        </div>
        <div className="flex items-center gap-6 mono text-[11px] tracking-widest uppercase">
          <a href="#" className="hidden md:block text-black/50 hover:text-black transition-colors">Gallery</a>
          <a href="#" className="text-black/50 hover:text-black transition-colors">Telegram ↗</a>
        </div>
      </nav>

      {/* Hero - s0animation style */}
      <section className="relative min-h-[90vh] flex items-center pt-[56px] overflow-hidden">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
          {/* Left - Character like s0animation hero-character.webp */}
          <motion.div style={{ y: heroY, scale: heroScale }} className="relative aspect-[4/5] md:aspect-[4/4.5] flex items-end justify-center">
            {/* Ghost character - hoodie no face, like s0animation but ASH version */}
            <div className="relative w-[85%] h-[90%]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-transparent rounded-[24px]" />
              {/* Hoodie silhouette - CSS only, no face */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[85%]">
                <div className="w-full h-full bg-[#0A0A0B] rounded-t-[40px] relative overflow-hidden">
                  <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[45%] h-[28%] bg-black rounded-full" />
                  <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[35%] h-[18%] bg-[#050507] rounded-t-[20px]" />
                  <div className="absolute top-[38%] left-0 right-0 h-[42%] bg-[#0F0F10]" />
                  <div className="absolute bottom-0 left-[10%] w-[28%] h-[45%] bg-[#0A0A0B] rounded-t-[16px]" />
                  <div className="absolute bottom-0 right-[10%] w-[28%] h-[45%] bg-[#0A0A0B] rounded-t-[16px]" />
                </div>
              </div>
              {/* Glow */}
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[60%] h-[20%] bg-[#E8FF42]/10 blur-[40px] rounded-full" />
            </div>
            <div className="absolute top-8 left-8 mono text-[10px] tracking-widest uppercase text-black/20">Gallery</div>
          </motion.div>

          {/* Right - PRODUCT Design like s0animation */}
          <div className="py-12 md:py-0">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
              <div className="mono text-[11px] tracking-[0.3em] uppercase text-black/30 mb-6">Founding Developer · 2018 → 2026</div>
              <h1 className="text-[56px] md:text-[84px] lg:text-[96px] font-[700] leading-[0.85] tracking-[-0.04em]">
                PRODUCT<br />
                <span className="text-black/15">Design</span>
              </h1>
              <div className="mt-6 flex items-start gap-4">
                <div className="w-[1px] h-[60px] bg-black/10 mt-1 hidden md:block" />
                <div>
                  <div className="mono text-[13px] leading-[1.6] text-black/60 max-w-[340px]">
                    Founding Developer<br />
                    End-to-end / full stack<br />
                    6+ years · Solo · Ghost<br />
                    116+ gateways · 0.8s bypass
                  </div>
                  <button className="mt-8 h-11 px-7 rounded-full bg-black text-white mono text-[11px] tracking-widest uppercase hover:bg-black/90 transition-colors">
                    Explore ↓
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Small stats like s0animation */}
            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-black/[0.06] pt-6 max-w-[400px]">
              {[
                { k: '6+ years', v: 'Building' },
                { k: '116+', v: 'Gateways' },
                { k: '0.8s', v: 'Bypass' },
              ].map(i => (
                <div key={i.k}>
                  <div className="mono text-[18px] font-bold tracking-[-0.02em]">{i.k}</div>
                  <div className="mono text-[10px] uppercase tracking-widest text-black/40 mt-1">{i.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Selected Work */}
      <section id="selected-work-start" className="bg-white">
        <div className="px-6 md:px-12 py-8 flex items-center justify-between">
          <div className="mono text-[11px] tracking-widest uppercase text-black/30">Selected Work — 2026</div>
          <div className="mono text-[11px] tracking-widest uppercase text-black/30">03 Cases</div>
        </div>

        <Case
          num="01"
          title="ASHEO_1.6.1"
          subtitle="Extension"
          tags="#MV3 #116+ GATEWAYS #0.8S"
          desc="Founding extension that bypasses payment processing. 116+ gateways dissected, 8 engines rewritten, BIN tools forged from scratch. Chrome 116+, MV3, Telegram distributed."
          color="#0A0A0B"
        />
        <Case
          num="02"
          title="BIN_Tools_&_Profiles"
          subtitle="Infrastructure"
          tags="#BIN #CARD PROFILES #PROTECTION"
          desc="Custom BIN database, card profile generator, identity filler, protection bypass. Built solo over 6+ years, no team, no shortcuts."
          color="#E8FF42"
        />
        <Case
          num="03"
          title="Telegram_Ghost_Distribution"
          subtitle="Distribution"
          tags="#TELEGRAM #GHOST #14 PROOFS"
          desc="No website payments, no middlemen. 14 real transaction proofs, distributed directly on Telegram to those who know. 6+ years grinding."
          color="#111113"
        />
      </section>

      {/* Footer - s0animation style */}
      <footer className="bg-[#0A0A0B] text-white px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-[1600px] mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-12">
          <div>
            <div className="mono text-[11px] tracking-[0.3em] uppercase text-white/30 mb-6">Web-based Ghost Operating System · 2026</div>
            <h2 className="text-[48px] md:text-[72px] font-bold leading-[0.9] tracking-[-0.03em]">ASH<span className="text-[#E8FF42]">OS</span></h2>
            <div className="mt-6 mono text-[13px] leading-[1.6] text-white/50 max-w-[400px]">A bypasser you can operate. 6+ years reverse engineering payment infrastructure. Built solo at 03:17 AM. No face needed.</div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="space-y-3 mono text-[11px] tracking-widest uppercase">
              <a href="#" className="block text-white/60 hover:text-white transition-colors">Telegram → t.me/asheo</a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors">GitHub Source ↗</a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors">14 Real Proofs ↓</a>
            </div>
            <div className="mt-12 mono text-[10px] text-white/20 tracking-widest uppercase">© 2018-2026 ASH · 116+ GATEWAYS · 0.8S · GHOST</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
