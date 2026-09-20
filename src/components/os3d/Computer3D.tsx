import { useRef, useState } from 'react'
import { Html, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Computer3D({ position = [0, 0, 0] as [number, number, number] }) {
  const [hovered, setHovered] = useState(false)
  const groupRef = useRef<THREE.Group>(null)

  return (
    <Float speed={0.8} floatIntensity={0.1}>
      <group ref={groupRef} position={position} rotation={[0, 0.3, 0]}>
        {/* Desk */}
        <mesh position={[0, 0.4, 0]} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
          <boxGeometry args={[1.6, 0.05, 0.9]} />
          <meshStandardMaterial color="#0F0F10" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Monitor stand */}
        <mesh position={[0, 0.55, -0.2]}>
          <cylinderGeometry args={[0.04, 0.06, 0.25, 12]} />
          <meshStandardMaterial color="#1A1A1E" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Monitor */}
        <group position={[0, 0.85, -0.2]}>
          <mesh>
            <boxGeometry args={[1.2, 0.7, 0.04]} />
            <meshStandardMaterial color="#0A0A0B" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Screen - ASHEO Extension */}
          <mesh position={[0, 0, 0.025]}>
            <planeGeometry args={[1.12, 0.62]} />
            <meshBasicMaterial color="#070709" />
          </mesh>
          <Html
            transform
            occlude
            position={[0, 0, 0.03]}
            scale={0.18}
            style={{ width: '640px', height: '360px' }}
          >
            <div className="w-full h-full bg-[#070709] border border-white/[0.08] rounded-[8px] overflow-hidden flex flex-col">
              {/* ASHEO Extension Header */}
              <div className="h-8 bg-[#101012] border-b border-white/[0.06] flex items-center justify-between px-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#E8FF42]" />
                  <span className="mono text-[10px] tracking-widest uppercase text-white/60">ASHEO 1.6.1 — MV3</span>
                </div>
                <span className="mono text-[9px] text-white/20">116+ GATEWAYS</span>
              </div>
              {/* Extension UI */}
              <div className="flex-1 p-3 grid grid-cols-3 gap-2 overflow-auto">
                <div className="col-span-2 space-y-2">
                  <div className="rounded-[6px] bg-white/[0.04] border border-white/[0.06] p-2">
                    <div className="mono text-[8px] uppercase text-white/30">Gateway Detector</div>
                    <div className="mono text-[10px] text-[#E8FF42] mt-1">● Stripe detected — BYPASSED in 0.72s</div>
                    <div className="mono text-[10px] text-white/50 mt-0.5">● Braintree — BYPASSED in 0.81s</div>
                    <div className="mono text-[10px] text-white/30 mt-0.5">○ Scanning...</div>
                  </div>
                  <div className="rounded-[6px] bg-[#E8FF42] p-2">
                    <div className="mono text-[8px] uppercase text-black/60 font-bold">Bypasser Core</div>
                    <div className="mono text-[14px] font-black text-black leading-none mt-1">0.8S AVG</div>
                    <div className="mono text-[8px] text-black/60 mt-1">94.7% success rate</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="rounded-[6px] bg-white/[0.04] border border-white/[0.06] p-2">
                    <div className="mono text-[7px] uppercase text-white/30">BIN Tools</div>
                    <div className="mono text-[9px] text-white/70 mt-1">424242 ••••</div>
                    <div className="mono text-[7px] text-white/30 mt-1">Valid • US • Visa</div>
                  </div>
                  <div className="rounded-[6px] bg-white/[0.04] border border-white/[0.06] p-2">
                    <div className="mono text-[7px] uppercase text-white/30">Files</div>
                    <div className="mono text-[8px] text-white/50 mt-1">→ Biography</div>
                    <div className="mono text-[8px] text-white/50">→ Proofs (14)</div>
                    <div className="mono text-[8px] text-white/50">→ Gateways</div>
                  </div>
                </div>
              </div>
              {/* Footer */}
              <div className="h-6 bg-black/50 border-t border-white/[0.06] flex items-center justify-between px-3 mono text-[8px] text-white/20">
                <span>6+ years · Solo · 03:17 AM</span>
                <span className="text-[#E8FF42]">● Live</span>
              </div>
            </div>
          </Html>
          {hovered && (
            <pointLight position={[0, 0, 0.5]} intensity={2} color="#E8FF42" distance={1.5} />
          )}
        </group>

        {/* Keyboard */}
        <mesh position={[0, 0.45, 0.15]} rotation={[-0.1, 0, 0]}>
          <boxGeometry args={[0.9, 0.02, 0.35]} />
          <meshStandardMaterial color="#0A0A0B" roughness={0.7} />
        </mesh>

        {/* Mouse */}
        <mesh position={[0.55, 0.46, 0.1]}>
          <capsuleGeometry args={[0.04, 0.08, 4, 8]} />
          <meshStandardMaterial color="#1A1A1E" />
        </mesh>
      </group>
    </Float>
  )
}
