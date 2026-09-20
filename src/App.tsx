import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Scene from './components/Scene'

const panels: Record<string, { title: string; content: React.ReactNode }> = {
  bio: {
    title: 'Biography',
    content: (
      <div className="space-y-4">
        <h1 className="text-[36px] font-bold leading-[0.9] tracking-[-0.03em] text-[#E8E6DC]">I design and code<br /><span className="text-white/40">gateways that feel</span><br /><span className="text-[#E8FF42]">alive.</span></h1>
        <p className="text-[13px] leading-[1.7] text-white/60 font-light max-w-[360px]">6+ years reverse engineering payment infrastructure. Solo. 116+ gateways cracked. 0.8s avg bypass. Built at 03:17 AM. Distributed on Telegram.</p>
        <div className="grid grid-cols-3 gap-2 pt-2">
          {[{k:'6+ YEARS',v:'Grind'},{k:'116+',v:'Gateways'},{k:'0.8S',v:'Bypass'}].map(i=>(
            <div key={i.k} className="rounded-[10px] bg-white/[0.04] border border-white/[0.06] p-2.5">
              <div className="mono text-[14px] font-bold text-white">{i.k}</div>
              <div className="mono text-[9px] uppercase tracking-widest text-white/30 mt-1">{i.v}</div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  memory: {
    title: 'Memory Wall — 14 Proofs',
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({length:9}).map((_,i)=>(
            <div key={i} className="aspect-[4/3] rounded-[8px] bg-white/[0.05] border border-white/[0.08] flex items-center justify-center mono text-[9px] text-white/30">PROOF_{String(i+1).padStart(2,'0')}</div>
          ))}
        </div>
        <div className="mono text-[10px] text-white/30">Real transactions · Redacted · Telegram only</div>
      </div>
    )
  },
  dev: {
    title: 'Developer Lab',
    content: (
      <div className="mono text-[11px] leading-[1.6] bg-black/60 rounded-[10px] p-4 border border-white/[0.06] text-white/60">
        <div className="text-[#E8FF42]">class GatewayRegistry {'{'}</div>
        <div className="pl-3">async probe(gateway) {'{'}</div>
        <div className="pl-6 text-white/40">elapsed {'<='} 800ms → BYPASSED</div>
        <div className="pl-3">{'}'}</div>
        <div>{'}'}</div>
        <div className="mt-3 text-white/30">// 6+ years of this</div>
      </div>
    )
  },
  gateways: {
    title: 'Gateway Lab — 116+',
    content: (
      <div className="space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {['Stripe','Braintree','Adyen','Checkout','PayPal','Square','Mollie','Razorpay','Worldpay','...116+'].map(g=>(
            <span key={g} className="px-2 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] mono text-[10px] text-white/60">{g}</span>
          ))}
        </div>
        <div className="rounded-[12px] bg-[#E8FF42] text-black p-3">
          <div className="mono text-[10px] font-bold uppercase">Bypass Rate</div>
          <div className="text-[28px] font-black leading-none mt-1">94.7%</div>
          <div className="mono text-[10px] opacity-60">0.8s avg · 6+ years</div>
        </div>
      </div>
    )
  },
  telegram: {
    title: 'Telegram',
    content: (
      <div className="space-y-3">
        <div className="rounded-[12px] bg-white/[0.06] border border-white/[0.06] p-3 mono text-[11px] text-white/70">ASHEO 1.6.1 is live. 116+ gateways. No paywall. Telegram only.</div>
        <button className="w-full h-10 rounded-full bg-white text-black mono text-[11px] font-bold tracking-widest uppercase">Open Telegram → t.me/asheo</button>
        <div className="rounded-[10px] bg-black border border-white/[0.08] p-3 flex gap-3 items-center">
          <div className="w-8 h-8 rounded-full bg-[#E8FF42] flex items-center justify-center mono text-black font-bold">A</div>
          <div><div className="mono text-[11px] text-white">ASHEO 1.6.1.zip</div><div className="mono text-[9px] text-white/40">2.4 MB · MV3 · Chrome 116+</div></div>
        </div>
      </div>
    )
  }
}

export default function App() {
  const [booted, setBooted] = useState(false)
  const [open, setOpen] = useState<string | null>(null)

  if (!booted) return <BootScreen onDone={() => setBooted(true)} />

  return (
    <div className="relative w-screen h-screen bg-[#070709] overflow-hidden">
      <div className="absolute inset-0">
        <Scene onPanel={(id) => setOpen(id)} />
      </div>

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-7 glass border-b border-white/[0.06] flex items-center justify-between px-4 mono text-[10px] tracking-widest uppercase z-20">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">ASH OS</span>
          <span className="text-white/30 hidden md:block">Ghost OS · 2026 · 1.6.1 · 6+ years</span>
        </div>
        <div className="text-white/60">03:17 AM</div>
      </div>

      {/* Left title like PouyaOS */}
      <div className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-10 pointer-events-none hidden lg:block">
        <div className="mono text-[11px] tracking-[0.3em] uppercase text-white/20 mb-3">Web-based Ghost Operating System · 2026</div>
        <h1 className="text-[84px] font-bold leading-[0.85] tracking-[-0.05em] text-[#E8E6DC]">ASH<span className="text-[#E8FF42]">OS</span></h1>
        <div className="mono text-[12px] tracking-[0.2em] uppercase text-white/30 mt-3">A bypasser you can operate.</div>
        <div className="mt-6 mono text-[11px] leading-[1.6] text-white/20 max-w-[260px]">6+ years reverse engineering payment infra.<br/>Click glass panels → opens files.<br/>Computer runs ASHEO extension.</div>
        <div className="mt-8 mono text-[9px] text-white/20">DROP ASH MODEL: /public/models/ash.glb</div>
      </div>

      {/* Dock */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-1 px-3 py-2 rounded-[16px] glass-strong">
          {Object.keys(panels).map(id => (
            <button key={id} onClick={() => setOpen(open === id ? null : id)} className={`w-11 h-11 rounded-[10px] mono text-[12px] flex items-center justify-center transition-all ${open === id ? 'bg-white text-black' : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80'}`}>
              {id === 'bio' ? '◐' : id === 'memory' ? '▣' : id === 'dev' ? '</>' : id === 'gateways' ? '◈' : '↗'}
            </button>
          ))}
          <div className="w-[1px] h-5 bg-white/10 mx-2" />
          <div className="px-2 mono text-[10px] text-white/30">03:17 AM</div>
        </div>
      </div>

      {/* Window */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }} className="absolute top-20 right-8 md:right-16 w-[90vw] md:w-[440px] max-h-[70vh] rounded-[16px] glass-strong overflow-hidden z-30 flex flex-col">
            <div className="h-9 flex items-center justify-between px-4 border-b border-white/[0.06] shrink-0">
              <span className="mono text-[11px] tracking-widest uppercase text-white/50">{panels[open].title}</span>
              <button onClick={() => setOpen(null)} className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60">×</button>
            </div>
            <div className="flex-1 overflow-auto p-6">{panels[open].content}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 mono text-[10px] tracking-widest uppercase text-white/15 hidden md:block pointer-events-none z-10">Drag to orbit · Click glass · 6+ years · 116+ gateways</div>
    </div>
  )
}
