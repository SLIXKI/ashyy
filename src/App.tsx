import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BootScreen from './components/os/BootScreen'
import Window from './components/os/Window'
import Dock from './components/os/Dock'
import { BiographyApp, DeveloperLabApp, GatewayLabApp, MemoryWallApp, TerminalApp, TelegramApp } from './components/os/apps'
import Scene3D from './components/os3d/Scene3D'

type WindowConfig = {
  id: string
  title: string
  initial: { x: number; y: number; w: number; h: number }
}

const windowConfigs: WindowConfig[] = [
  { id: 'bio', title: 'Biography', initial: { x: 60, y: 80, w: 440, h: 520 } },
  { id: 'dev', title: 'Developer Lab', initial: { x: 540, y: 40, w: 520, h: 420 } },
  { id: 'gateways', title: 'Gateway Lab', initial: { x: 80, y: 320, w: 460, h: 380 } },
  { id: 'memory', title: 'Memory Wall', initial: { x: 600, y: 320, w: 540, h: 460 } },
  { id: 'terminal', title: 'Terminal', initial: { x: 360, y: 180, w: 440, h: 340 } },
  { id: 'telegram', title: 'Telegram', initial: { x: 720, y: 80, w: 380, h: 480 } },
]

export default function App() {
  const [booted, setBooted] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [zMap, setZMap] = useState<Record<string, number>>({})
  const [zCounter, setZCounter] = useState(10)
  const [show3D, setShow3D] = useState(true)

  const focus = (id: string) => {
    setActiveId(id)
    setZCounter(c => c + 1)
    setZMap(m => ({ ...m, [id]: zCounter + 1 }))
  }

  const toggle = (id: string) => {
    if (openApps.includes(id)) {
      if (activeId === id) {
        setOpenApps(o => o.filter(a => a !== id))
        setActiveId(null)
      } else {
        focus(id)
      }
    } else {
      setOpenApps(o => [...o, id])
      focus(id)
    }
  }

  const openFrom3D = (id: string) => {
    if (!openApps.includes(id)) {
      setOpenApps(o => [...o, id])
    }
    focus(id)
  }

  const close = (id: string) => {
    setOpenApps(o => o.filter(a => a !== id))
    if (activeId === id) setActiveId(null)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '6') {
        const idx = parseInt(e.key) - 1
        const ids = ['bio', 'dev', 'gateways', 'memory', 'terminal', 'telegram']
        if (ids[idx]) toggle(ids[idx])
      }
      if (e.key === 'Escape') {
        setOpenApps([])
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activeId, openApps])

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />
  }

  return (
    <div className="relative w-screen h-screen bg-[#070709] overflow-hidden">
      {/* 3D Scene Background */}
      {show3D && (
        <div className="absolute inset-0 z-0">
          <Scene3D onSelectPanel={openFrom3D} />
        </div>
      )}

      {/* 2D Overlay UI */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Top bar */}
        <div className="pointer-events-auto absolute top-0 left-0 right-0 h-[28px] glass border-b border-white/[0.06] flex items-center justify-between px-4 mono text-[10px] tracking-widest uppercase">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">ASH OS</span>
            <span className="text-white/30 hidden md:block">Web-based Ghost Operating System · 2026</span>
            <span className="text-white/20 hidden md:block">1.6.1 · 6+ years</span>
            <button
              onClick={() => setShow3D(!show3D)}
              className="ml-4 px-2 py-0.5 rounded bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] text-white/60 hover:text-white/90 transition-colors"
            >
              {show3D ? '3D: ON' : '3D: OFF'}
            </button>
          </div>
          <div className="flex items-center gap-3 text-white/40">
            <span className="hidden md:block">116+ gateways · 0.8s</span>
            <span className="text-white">03:17 AM</span>
          </div>
        </div>

        {/* Title overlay - like PouyaOS */}
        <div className="absolute left-8 md:left-12 top-[50%] -translate-y-1/2 z-0 pointer-events-none hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="mono text-[11px] tracking-[0.3em] uppercase text-white/20 mb-4">Web-based Ghost Operating System · 2026</div>
            <h1 className="text-[84px] font-[700] leading-[0.85] tracking-[-0.05em] text-[#E8E6DC]">
              ASH<span className="text-[#E8FF42]">OS</span>
            </h1>
            <div className="mono text-[12px] tracking-[0.2em] uppercase text-white/30 mt-4">
              A bypasser you can operate.
            </div>
            <div className="mt-6 mono text-[11px] leading-[1.6] text-white/20 max-w-[280px]">
              6+ years reverse engineering payment infrastructure.<br />
              Click the glass panels →<br />
              The computer runs ASHEO.
            </div>
            <div className="mt-8 flex flex-col gap-2">
              <div className="mono text-[10px] text-white/30">DROP YOUR MODEL HERE</div>
              <div className="w-[200px] h-[28px] rounded-[8px] border border-dashed border-white/20 bg-white/[0.03] flex items-center justify-center mono text-[10px] text-white/20">
                /models/ash.glb
              </div>
            </div>
          </motion.div>
        </div>

        {/* 2D Windows */}
        <div className="absolute inset-0 pointer-events-none">
          {windowConfigs.filter(w => openApps.includes(w.id)).map((cfg) => (
            <div key={cfg.id} className="pointer-events-auto">
              <Window
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
            </div>
          ))}
        </div>

        {/* Dock */}
        <div className="pointer-events-auto">
          <Dock openApps={openApps} toggle={toggle} activeId={activeId} />
        </div>

        {/* Hint */}
        <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 mono text-[10px] tracking-widest uppercase text-white/20 hidden md:block pointer-events-none">
          Click glass in 3D · Drag windows · ⌘1-6 · ESC to close
        </div>
      </div>

      {/* Mobile fallback - show title */}
      <div className="lg:hidden absolute inset-0 z-0 flex items-center justify-center pointer-events-none p-8">
        <div className="text-center">
          <div className="mono text-[10px] tracking-[0.3em] uppercase text-white/20 mb-3">Web-based Ghost OS · 2026</div>
          <h1 className="text-[48px] font-bold tracking-[-0.05em] text-[#E8E6DC]">ASH<span className="text-[#E8FF42]">OS</span></h1>
          <div className="mono text-[11px] text-white/30 mt-2">Tap glass panels to operate</div>
        </div>
      </div>
    </div>
  )
}
