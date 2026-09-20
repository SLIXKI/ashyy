import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

type Props = {
  id: string
  title: string
  children: ReactNode
  initial: { x: number; y: number; w: number; h: number }
  zIndex: number
  onFocus: (id: string) => void
  onClose: (id: string) => void
  active: boolean
}

export default function Window({ id, title, children, initial, zIndex, onFocus, onClose, active }: Props) {
  const [pos, setPos] = useState({ x: initial.x, y: initial.y })

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={() => onFocus(id)}
      onDragEnd={(_, info) => setPos({ x: pos.x + info.offset.x, y: pos.y + info.offset.y })}
      initial={{ x: initial.x, y: initial.y, opacity: 0, scale: 0.96 }}
      animate={{ x: pos.x, y: pos.y, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseDown={() => onFocus(id)}
      style={{ zIndex, width: initial.w, height: initial.h }}
      className="absolute rounded-[14px] glass-strong overflow-hidden flex flex-col select-none"
    >
      {/* Header */}
      <div className="h-[36px] flex items-center justify-between px-4 border-b border-white/[0.06] shrink-0 cursor-grab active:cursor-grabbing">
        <div className="flex items-center gap-2">
          <div className="flex gap-[6px]">
            <button onClick={() => onClose(id)} className="w-3 h-3 rounded-full bg-white/10 hover:bg-red-500/80 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <span className="ml-3 mono text-[11px] tracking-widest uppercase text-white/50">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${active ? 'bg-[#E8FF42]' : 'bg-white/20'}`} />
          <span className="mono text-[10px] text-white/20">{active ? 'ACTIVE' : 'IDLE'}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Bottom glow when active */}
      {active && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8FF42]/50 to-transparent" />
      )}
    </motion.div>
  )
}
