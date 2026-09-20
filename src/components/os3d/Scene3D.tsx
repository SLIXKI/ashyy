import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows, PerspectiveCamera, Float, Grid } from '@react-three/drei'
import { Suspense, useState } from 'react'
import GlassPanel3D from './GlassPanel3D'
import AshModel from './AshModel'
import Computer3D from './Computer3D'

function Loader() {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#E8FF42" />
    </mesh>
  )
}

export default function Scene3D({ onSelectPanel }: { onSelectPanel: (id: string) => void }) {
  const [activePanel, setActivePanel] = useState<string | null>(null)

  const panels = [
    {
      id: 'bio',
      title: 'Biography',
      pos: [2.5, 1.8, -0.5] as [number, number, number],
      size: [2.2, 1.2] as [number, number],
      content: (
        <div className="space-y-2">
          <div className="text-[18px] font-bold leading-[0.9] text-[#E8E6DC]">I design and code<br /><span className="text-white/40">gateways that feel</span><br /><span className="text-[#E8FF42]">alive.</span></div>
          <div className="text-[10px] leading-[1.5] text-white/50 font-light mt-3">6+ years reverse engineering payment infra. Solo. 116+ gateways cracked. 0.8s bypass.</div>
          <div className="flex gap-2 mt-3">
            <div className="px-2 py-1 rounded bg-white/[0.06] mono text-[8px] text-white/60">6+ YEARS</div>
            <div className="px-2 py-1 rounded bg-[#E8FF42] mono text-[8px] text-black font-bold">0.8S</div>
          </div>
        </div>
      )
    },
    {
      id: 'memory',
      title: 'Memory Wall',
      pos: [2.6, 0.8, -0.3] as [number, number, number],
      size: [2.2, 0.9] as [number, number],
      content: (
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-[4px] bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mono text-[7px] text-white/30">PROOF_{i+1}</div>
          ))}
        </div>
      )
    },
    {
      id: 'dev',
      title: 'Developer Lab',
      pos: [2.7, -0.1, -0.1] as [number, number, number],
      size: [2.2, 1.0] as [number, number],
      content: (
        <div className="mono text-[8px] leading-[1.5] text-white/60 bg-black/40 rounded p-2 border border-white/[0.06]">
          <div className="text-[#E8FF42]">export class GatewayRegistry {'{'}</div>
          <div className="pl-2">async probe(gateway) {'{'}</div>
          <div className="pl-4 text-white/40">elapsed {'<='} 800ms → BYPASSED</div>
          <div className="pl-2">{'}'}</div>
          <div>{'}'}</div>
        </div>
      )
    },
    {
      id: 'gateways',
      title: 'Gateway Lab',
      pos: [2.8, -1.1, 0.1] as [number, number, number],
      size: [2.2, 0.8] as [number, number],
      content: (
        <div className="flex flex-wrap gap-1">
          {['Stripe','Braintree','Adyen','PayPal','Square','Mollie','Razorpay','...116+'].map(g => (
            <span key={g} className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.06] mono text-[7px] text-white/50">{g}</span>
          ))}
          <div className="w-full mt-2 h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <div className="h-full w-[94%] bg-[#E8FF42]" />
          </div>
          <div className="mono text-[7px] text-white/30 mt-1">94.7% bypass rate</div>
        </div>
      )
    },
  ]

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: '#070709' }}
    >
      <PerspectiveCamera makeDefault position={[0.5, 1.2, 4.5]} fov={45} />
      
      <Suspense fallback={<Loader />}>
        {/* Lighting like PouyaOS */}
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
        <spotLight position={[-3, 4, 2]} angle={0.3} penumbra={0.8} intensity={1.2} color="#E8FF42" castShadow />
        <pointLight position={[2, 2, 2]} intensity={0.5} color="#ffffff" />

        {/* Floor - reflective like PouyaOS */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#070709" roughness={0.1} metalness={0.8} />
        </mesh>

        <Grid
          position={[0, -0.59, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.3}
          cellColor="#1a1a1e"
          sectionSize={2}
          sectionThickness={0.5}
          sectionColor="#222228"
          fadeDistance={12}
          fadeStrength={1}
          infiniteGrid
        />

        <ContactShadows position={[0, -0.58, 0]} opacity={0.6} scale={12} blur={2} far={2} color="#000000" />

        {/* Ash model standing left like PouyaOS screenshot */}
        <AshModel position={[-1.8, -0.6, 0.5]} />

        {/* Computer with ASHEO extension */}
        <Computer3D position={[-0.2, -0.6, 1.2]} />

        {/* Glass panels wall - right side like PouyaOS */}
        {panels.map((p) => (
          <GlassPanel3D
            key={p.id}
            position={p.pos}
            width={p.size[0]}
            height={p.size[1]}
            title={p.title}
            active={activePanel === p.id}
            onClick={() => {
              setActivePanel(p.id)
              onSelectPanel(p.id)
            }}
          >
            {p.content}
          </GlassPanel3D>
        ))}

        {/* Floating pillars left side like PouyaOS */}
        {[0, 1, 2].map((i) => (
          <Float key={i} speed={0.5 + i * 0.2} floatIntensity={0.1}>
            <mesh position={[-3.2 - i * 0.3, 0.2 + i * 0.2, -0.5 - i * 0.5]}>
              <boxGeometry args={[0.3, 1.4, 0.3]} />
              <meshPhysicalMaterial
                transmission={0.8}
                thickness={0.2}
                roughness={0.1}
                color="#0F0F10"
                emissive="#E8FF42"
                emissiveIntensity={0.05}
              />
            </mesh>
          </Float>
        ))}

        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
