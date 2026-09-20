import { motion } from 'framer-motion'

type AppDef = {
  id: string
  label: string
  icon: string
  color?: string
}

const apps: AppDef[] = [
  { id: 'bio', label: 'Biography', icon: '◐' },
  { id: 'dev', label: 'Developer Lab', icon: '</>' },
  { id: 'gateways', label: 'Gateway Lab', icon: '◈' },
  { id: 'memory', label: 'Memory Wall', icon: '▣' },
  { id: 'terminal', label: 'Terminal', icon: '>' },
  { id: 'telegram', label: 'Telegram', icon: '↗' },
]

export default function Dock({ openApps, toggle, activeId }: { openApps: string[]; toggle: (id: string) => void; activeId: string | null }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex items-end gap-1 px-3 py-2 rounded-[18px] glass-strong"
      >
        {apps.map((app) => {
          const isOpen = openApps.includes(app.id)
          const isActive = activeId === app.id
          return (
            <button
              key={app.id}
              onClick={() => toggle(app.id)}
              className="relative group flex flex-col items-center"
            >
              <motion.div
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-[48px] h-[48px] rounded-[12px] flex items-center justify-center mono text-[14px] transition-all
                  ${isOpen ? 'bg-white text-black' : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1] hover:text-white/90'}
                  ${isActive ? 'ring-1 ring-[#E8FF42]/50' : ''}
                `}
              >
                {app.icon}
              </motion.div>
              {isOpen && (
                <div className={`mt-1 w-1 h-1 rounded-full ${isActive ? 'bg-[#E8FF42]' : 'bg-white/40'}`} />
              )}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-black text-white mono text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {app.label}
              </div>
            </button>
          )
        })}
        <div className="w-[1px] h-6 bg-white/10 mx-2 self-center" />
        <div className="flex flex-col items-center gap-1 px-2">
          <div className="mono text-[10px] text-white/40 tracking-widest">03:17 AM</div>
          <div className="mono text-[8px] text-white/20">7/23/2026</div>
        </div>
      </motion.div>
    </div>
  )
}
