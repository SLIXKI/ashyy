import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, ContactShadows } from '@react-three/drei'
import { useState } from 'react'

function Hoodie({ pos = [0, 0, 0] as [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 4, 12]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.45, 0]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#000" roughness={1} />
      </mesh>
      <mesh position={[-0.12, 0.15, 0]}>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
      <mesh position={[0.12, 0.15, 0]}>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" />
      </mesh>
    </group>
  )
}

function Glass({ pos, title, onClick }: { pos: [number, number, number]; title: string; onClick: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <group position={pos}>
      <mesh
        onPointerOver={() => { setHover(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHover(false); document.body.style.cursor = 'auto' }}
        onClick={onClick}
        scale={hover ? 1.05 : 1}
      >
        <boxGeometry args={[2.2, 0.9, 0.08]} />
        <meshPhysicalMaterial
          color="#101012"
          transmission={0.92}
          thickness={0.12}
          roughness={0.08}
          clearcoat={1}
          transparent
          opacity={0.85}
          emissive={hover ? "#E8FF42" : "#000"}
          emissiveIntensity={hover ? 0.18 : 0}
        />
      </mesh>
      {/* edge glow */}
      {hover && <pointLight intensity={1.2} color="#E8FF42" distance={2} position={[0, 0, 0.6]} />}
      {hover && <pointLight intensity={1.2} color="#E8FF42" distance={2} position={[0, 0, 0.6]} />}
    </group>
  )
}

function Computer({ pos }: { pos: [number, number, number] }) {
  return (
    <group position={pos}>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[1.6, 0.05, 0.9]} />
        <meshStandardMaterial color="#0F0F10" />
      </mesh>
      <mesh position={[0, 0.85, -0.2]}>
        <boxGeometry args={[1.2, 0.7, 0.05]} />
        <meshStandardMaterial color="#0A0A0B" />
      </mesh>
      <mesh position={[0, 0.85, -0.17]}>
        <planeGeometry args={[1.08, 0.58]} />
        <meshBasicMaterial color="#0E0E12" />
      </mesh>
      <pointLight position={[0, 0.85, 0]} intensity={0.6} color="#E8FF42" distance={1.2} />
    </group>
  )
}

export default function Scene({ onPanel }: { onPanel: (id: string) => void }) {
  return (
    <Canvas shadows camera={{ position: [0.5, 1.4, 4.2], fov: 42 }} style={{ background: '#070709' }}>
      <color attach="background" args={['#070709']} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={0.9} castShadow />
      <spotLight position={[-2, 4, 1.5]} angle={0.35} penumbra={0.9} intensity={1.2} color="#E8FF42" castShadow />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#070709" roughness={0.2} metalness={0.6} />
      </mesh>

      <Grid position={[0, -0.59, 0]} args={[20, 20]} cellSize={0.5} cellColor="#1a1a1e" sectionSize={2} sectionColor="#2a2a30" fadeDistance={14} infiniteGrid />
      <ContactShadows position={[0, -0.58, 0]} opacity={0.5} scale={10} blur={2} far={2} />

      <Hoodie pos={[-1.8, -0.6, 0.5]} />
      <Computer pos={[-0.15, -0.6, 1]} />

      <Glass pos={[2.5, 1.6, -0.5]} title="bio" onClick={() => onPanel('bio')} />
      <Glass pos={[2.6, 0.5, -0.3]} title="memory" onClick={() => onPanel('memory')} />
      <Glass pos={[2.7, -0.5, -0.1]} title="dev" onClick={() => onPanel('dev')} />
      <Glass pos={[2.8, -1.5, 0.1]} title="gateways" onClick={() => onPanel('gateways')} />

      {[0, 1, 2].map(i => (
        <mesh key={i} position={[-3.2 - i * 0.4, 0.2, -0.5 - i * 0.4]}>
          <boxGeometry args={[0.26, 1.4, 0.26]} />
          <meshStandardMaterial color="#0F0F10" emissive="#E8FF42" emissiveIntensity={0.04} />
        </mesh>
      ))}

      <OrbitControls enablePan={false} minDistance={2} maxDistance={7} maxPolarAngle={Math.PI / 2.05} target={[0.3, 0.4, 0]} />
    </Canvas>
  )
}
