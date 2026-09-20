import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
  'ASH OS 1.6.1 (Ghost Build)',
  'Copyright (c) 2018-2026 ASH',
  '',
  'Checking gateways... 116+ found',
  'Loading filler_core... ok',
  'Loading gateway-registry... ok',
  'Loading request-pipeline... ok',
  'Loading adyenEncryptor... ok',
  '',
  'Uptime: 6+ years',
  'Time: 03:17 AM',
  '',
  'Booting Ghost OS...'
]

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(v => {
        if (v >= lines.length) {
          clearInterval(id)
          setTimeout(() => {
            setShow(false)
            setTimeout(onDone, 500)
          }, 500)
          return v
        }
        return v + 1
      })
    }, 60)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 z-[9999] bg-[#070709] flex items-center justify-center p-8">
          <div className="w-full max-w-[520px] mono text-[12px] leading-[1.7] text-white/60">
            {lines.slice(0, visible).map((l, i) => (
              <div key={i} className={l.includes('ACTIVE') || l.includes('Booting') ? 'text-[#E8FF42]' : ''}>{l || '\u00A0'}</div>
            ))}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.6, repeat: Infinity }} className="inline-block w-2 h-3 bg-white/60 ml-1 translate-y-[2px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
