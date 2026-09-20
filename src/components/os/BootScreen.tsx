import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
  'ASH OS 1.6.1 (Build 2026.09.20)',
  'Copyright (c) 2018-2026 ASH',
  '',
  'Checking gateways... 116+ found',
  'Loading filler_core... ok',
  'Loading identity_filler... ok',
  'Loading gateway-registry... ok',
  'Loading request-pipeline... ok',
  'Loading response-hooks... ok',
  'Loading adyenEncryptor... ok',
  'Loading v2-runtime... ok',
  'Loading orchestrator... ok',
  '',
  'Ghost protocol: ACTIVE',
  'Uptime: 6+ years',
  'Time: 03:17 AM',
  '',
  'Booting ASH OS...'
]

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(v => {
        if (v >= lines.length) {
          clearInterval(interval)
          setTimeout(() => {
            setShow(false)
            setTimeout(onDone, 600)
          }, 600)
          return v
        }
        return v + 1
      })
    }, 70)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-[9999] bg-[#070709] flex items-center justify-center p-8"
        >
          <div className="w-full max-w-[560px] mono text-[12px] leading-[1.7] text-white/70">
            {lines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={line === '' ? 'h-3' : line.includes('ACTIVE') || line.includes('Booting') ? 'text-[#E8FF42]' : line.includes('ok') ? 'text-white/50' : ''}>
                {line || '\u00A0'}
              </div>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-2 h-3 bg-white/70 ml-1 translate-y-[2px]"
            />
          </div>
          <div className="absolute bottom-8 left-8 mono text-[10px] text-white/20 tracking-widest uppercase">
            Web-based Ghost Operating System · 2026
          </div>
          <div className="absolute bottom-8 right-8 mono text-[10px] text-white/20">
            03:17 AM
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
