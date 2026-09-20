import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, Grid } from '@react-three/drei'
import { Suspense, useState } from 'react'
import * as THREE from 'three'

// Simple hoodie placeholder that WILL render
function HoodieFigure({ position = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={position}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <capsuleGeometry args={[0.28, 0.7, 4, 12]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} />
      </mesh>
      {/* Head black */}
      <mesh position={[0, 1.45, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#000" roughness={1} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
      <mesh position={[0.12, 0.15, 0]} castShadow>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
    </group>
  )
}

function GlassPanelSimple({ position, title, onClick }: { position: [number, number, number]; title: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <group position={position}>
      <mesh
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
        onClick={onClick}
        scale={hovered ? 1.05 : 1}
      >
        <boxGeometry args={[2.2, 0.9, 0.08]} />
        <meshPhysicalMaterial
          color="#101012"
          transmission={0.9}
          thickness={0.1}
          roughness={0.1}
          clearcoat={1}
          transparent
          opacity={0.8}
          emissive={hovered ? "#E8FF42" : "#000"}
          emissiveIntensity={hovered ? 0.2 : 0}
        />
      </mesh>
      {/* Label */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2, 0.7]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      {/* Simple text via mesh - fallback */}
      <group position={[-0.9, 0.2, 0.06]}>
        {/* We use Html only if needed, but keep minimal for now */}
      </group>
      {hovered && <pointLight intensity={1} color="#E8FF42" distance={2} position={[0, 0, 0.5]} />}
    </group>
  )
}

function ComputerSimple({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Desk */}
      <mesh position={[0, 0.4, 0]} receiveShadow>
        <boxGeometry args={[1.6, 0.05, 0.9]} />
        <meshStandardMaterial color="#0F0F10" />
      </mesh>
      {/* Monitor */}
      <mesh position={[0, 0.85, -0.2]} castShadow>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial color="#0A0A0B" />
      </mesh>
      {/* Screen glow */}
      <mesh position={[0, 0.85, -0.17]}>
        <planeGeometry args={[1.1, 0.6]} />
        <meshBasicMaterial color="#0E0E10" />
      </mesh>
      <pointLight position={[0, 0.85, 0]} intensity={0.5} color="#E8FF42" distance={1.5} />
    </group>
  )
}

export default function Scene3D({ onSelectPanel }: { onSelectPanel: (id: string) => void }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0.5, 1.5, 4], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: '#070709', width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#070709']} />
      
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <spotLight position={[-2, 4, 2]} angle={0.3} penumbra={1} intensity={1.5} color="#E8FF42" castShadow />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#070709" roughness={0.2} metalness={0.5} />
        </mesh>

        <Grid
          position={[0, -0.59, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellColor="#1a1a1e"
          sectionSize={2}
          sectionColor="#2a2a30"
          fadeDistance={15}
          infiniteGrid
        />

        <ContactShadows position={[0, -0.58, 0]} opacity={0.5} scale={10} blur={2} far={2} />

        {/* Ash standing */}
        <HoodieFigure position={[-1.8, -0.6, 0.5]} />

        {/* Computer */}
        <ComputerSimple position={[-0.2, -0.6, 1]} />

        {/* Glass panels - 4 of them */}
        <GlassPanelSimple position={[2.5, 1.6, -0.5]} title="Biography" onClick={() => onSelectPanel('bio')} />
        <GlassPanelSimple position={[2.6, 0.5, -0.3]} title="Memory Wall" onClick={() => onSelectPanel('memory')} />
        <GlassPanelSimple position={[2.7, -0.5, -0.1]} title="Developer Lab" onClick={() => onSelectPanel('dev')} />
        <GlassPanelSimple position={[2.8, -1.5, 0.1]} title="Gateway Lab" onClick={() => onSelectPanel('gateways')} />

        {/* Pillars */}
        {[0, 1, 2].map(i => (
          <mesh key={i} position={[-3.2 - i * 0.4, 0.2, -0.5 - i * 0.4]} castShadow>
            <boxGeometry args={[0.25, 1.4, 0.25]} />
            <meshStandardMaterial color="#0F0F10" emissive="#E8FF42" emissiveIntensity={0.03} />
          </mesh>
        ))}

        <Environment preset="city" />
        <OrbitControls enablePan={false} minDistance={2} maxDistance={8} maxPolarAngle={Math.PI / 2.1} target={[0.5, 0.5, 0]} />
      </Suspense>
    </Canvas>
  )
}
