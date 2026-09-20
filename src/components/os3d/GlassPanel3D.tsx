import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

type Props = {
  position: [number, number, number]
  rotation?: [number, number, number]
  width: number
  height: number
  title: string
  active?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

export default function GlassPanel3D({ position, rotation = [0, -0.15, 0], width, height, title, active, onClick, children }: Props) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.03
    }
  })

  return (
    <group position={position} rotation={rotation as any}>
      {/* Glass */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        scale={hovered ? 1.02 : 1}
      >
        <boxGeometry args={[width, height, 0.08]} />
        <meshPhysicalMaterial
          transmission={1}
          thickness={0.1}
          roughness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
          ior={1.5}
          color="#101012"
          emissive={hovered || active ? "#E8FF42" : "#000000"}
          emissiveIntensity={hovered ? 0.15 : active ? 0.08 : 0}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Edge glow */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, 0.08)]} />
        <lineBasicMaterial color={hovered || active ? "#E8FF42" : "#2a2a2e"} transparent opacity={hovered ? 0.8 : 0.3} />
      </lineSegments>

      {/* Bottom shelf */}
      <mesh position={[0, -height/2 - 0.02, 0.15]} rotation={[-Math.PI/2, 0, 0]}>
        <boxGeometry args={[width + 0.1, 0.3, 0.02]} />
        <meshPhysicalMaterial
          transmission={0.9}
          thickness={0.05}
          roughness={0.1}
          color="#151518"
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Content as HTML inside glass */}
      <Html
        transform
        occlude
        position={[0, 0, 0.06]}
        scale={0.25}
        style={{ width: `${width * 400}px`, height: `${height * 400}px`, pointerEvents: 'none' }}
      >
        <div className="w-full h-full p-6 text-white overflow-hidden">
          <div className="mono text-[10px] tracking-widest uppercase text-white/30 mb-2 flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#E8FF42]" />
            {title}
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-[#E8FF42]/50 via-white/10 to-transparent mb-3" />
          <div className="pointer-events-auto">
            {children}
          </div>
        </div>
      </Html>

      {/* Hover glow */}
      {hovered && (
        <pointLight position={[0, 0, 0.5]} intensity={1.5} color="#E8FF42" distance={2} />
      )}
    </group>
  )
}
