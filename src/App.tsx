import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BootScreen from './components/os/BootScreen'
import Window from './components/os/Window'
import Dock from './components/os/Dock'
import { BiographyApp, DeveloperLabApp, GatewayLabApp, MemoryWallApp, TerminalApp, TelegramApp } from './components/os/apps'

type WindowConfig = {
  id: string
  title: string
  initial: { x: number; y: number; w: number; h: number }
}

const windowConfigs: WindowConfig[] = [
  { id: 'bio', title: 'Biography', initial: { x: 60, y: 60, w: 440, h: 520 } },
  { id: 'dev', title: 'Developer Lab', initial: { x: 540, y: 40, w: 520, h: 420 } },
  { id: 'gateways', title: 'Gateway Lab', initial: { x: 80, y: 320, w: 460, h: 380 } },
  { id: 'memory', title: 'Memory Wall', initial: { x: 600, y: 320, w: 540, h: 460 } },
  { id: 'terminal', title: 'Terminal', initial: { x: 360, y: 180, w: 440, h: 340 } },
  { id: 'telegram', title: 'Telegram', initial: { x: 720, y: 80, w: 380, h: 480 } },
]

export default function App() {
  const [booted, setBooted] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>(['bio', 'dev', 'terminal'])
  const [activeId, setActiveId] = useState<string>('bio')
  const [zMap, setZMap] = useState<Record<string, number>>({ bio: 3, dev: 2, terminal: 1 })
  const [zCounter, setZCounter] = useState(4)

  const focus = (id: string) => {
    setActiveId(id)
    setZCounter(c => c + 1)
    setZMap(m => ({ ...m, [id]: zCounter + 1 }))
  }

  const toggle = (id: string) => {
    if (openApps.includes(id)) {
      // if already open and active, close; if open but not active, focus
      if (activeId === id) {
        setOpenApps(o => o.filter(a => a !== id))
      } else {
        focus(id)
      }
    } else {
      setOpenApps(o => [...o, id])
      focus(id)
    }
  }

  const close = (id: string) => {
    setOpenApps(o => o.filter(a => a !== id))
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key) - 1
        const ids = ['bio', 'dev', 'gateways', 'memory', 'terminal', 'telegram']
        if (ids[idx]) toggle(ids[idx])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeId, openApps])

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />
  }

  return (
    <div className="relative w-screen h-screen bg-[#070709] overflow-hidden os-grid noise">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 h-[28px] glass border-b border-white/[0.06] flex items-center justify-between px-4 z-40 mono text-[10px] tracking-widest uppercase">
        <div className="flex items-center gap-4">
          <span className="text-white font-bold">ASH OS</span>
          <span className="text-white/30 hidden md:block">Web-based Ghost Operating System · 2026</span>
          <span className="text-white/20 hidden md:block">1.6.1</span>
        </div>
        <div className="flex items-center gap-3 text-white/40">
          <span className="hidden md:block">6+ years · 116+ gateways · 0.8s</span>
          <span className="text-white">03:17 AM</span>
        </div>
      </div>

      {/* Desktop icons - left side like PouyaOS pillars */}
      <div className="absolute left-8 top-[80px] hidden lg:flex flex-col gap-6 z-10">
        {[
          { label: 'Gateway\nRegistry', count: '116+' },
          { label: 'BIN\nTools', count: '∞' },
          { label: 'Bypasser\nCore', count: '0.8s' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="w-[88px] h-[140px] rounded-[8px] bg-[#0F0F10] border border-white/[0.06] p-3 flex flex-col justify-between"
          >
            <div className="w-6 h-6 rounded-[6px] bg-white/[0.06] flex items-center justify-center mono text-[10px] text-white/40">◈</div>
            <div>
              <div className="mono text-[10px] leading-[1.1] whitespace-pre text-white/50">{item.label}</div>
              <div className="mono text-[14px] font-bold text-[#E8FF42] mt-2">{item.count}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Title like PouyaOS */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute left-8 md:left-[180px] top-[50%] -translate-y-1/2 z-10 pointer-events-none hidden md:block"
      >
        <div className="mono text-[11px] tracking-[0.3em] uppercase text-white/20 mb-4">Web-based Ghost Operating System · 2026</div>
        <h1 className="text-[72px] lg:text-[96px] font-[700] leading-[0.85] tracking-[-0.05em] text-[#E8E6DC]">
          ASH<span className="text-[#E8FF42]">OS</span>
        </h1>
        <div className="mono text-[12px] tracking-[0.2em] uppercase text-white/30 mt-4">
          A bypasser you can operate.
        </div>
        <div className="mt-8 mono text-[11px] leading-[1.6] text-white/20 max-w-[280px]">
          6+ years reverse engineering payment infrastructure.<br />
          116+ gateways cracked. 0.8s avg bypass.<br />
          Built solo. Distributed on Telegram.
        </div>
      </motion.div>

      {/* Windows */}
      {windowConfigs.filter(w => openApps.includes(w.id)).map((cfg) => (
        <Window
          key={cfg.id}
          id={cfg.id}
          title={cfg.title}
          initial={cfg.initial}
          zIndex={zMap[cfg.id] || 1}
          onFocus={focus}
          onClose={close}
          active={activeId === cfg.id}
        >
          {cfg.id === 'bio' && <BiographyApp />}
          {cfg.id === 'dev' && <DeveloperLabApp />}
          {cfg.id === 'gateways' && <GatewayLabApp />}
          {cfg.id === 'memory' && <MemoryWallApp />}
          {cfg.id === 'terminal' && <TerminalApp />}
          {cfg.id === 'telegram' && <TelegramApp />}
        </Window>
      ))}

      {/* Dock */}
      <Dock openApps={openApps} toggle={toggle} activeId={activeId} />

      {/* Bottom hint */}
      <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 mono text-[10px] tracking-widest uppercase text-white/20 hidden md:block">
        Click dock to operate · Drag windows · ⌘1-6 to toggle
      </div>
    </div>
  )
}
