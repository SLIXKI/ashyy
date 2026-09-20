import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'

// Placeholder hoodie figure — no face, pure silhouette
function HoodiePlaceholder() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.9, 0]}>
        <capsuleGeometry args={[0.28, 0.7, 4, 12]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Hood */}
      <mesh position={[0, 1.45, -0.05]} rotation={[0.2, 0, 0]}>
        <sphereGeometry args={[0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Head — completely black, no face */}
      <mesh position={[0, 1.42, 0.05]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#000000" roughness={1} />
      </mesh>
      {/* Legs */}
      <mesh position={[-0.12, 0.15, 0]}>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" roughness={0.9} />
      </mesh>
      <mesh position={[0.12, 0.15, 0]}>
        <capsuleGeometry args={[0.11, 0.6, 4, 8]} />
        <meshStandardMaterial color="#050507" roughness={0.9} />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.32, 0.85, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} />
      </mesh>
      <mesh position={[0.32, 0.85, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.08, 0.5, 4, 8]} />
        <meshStandardMaterial color="#0A0A0B" roughness={0.9} />
      </mesh>
    </group>
  )
}

function AshModelGLB({ url }: { url: string }) {
  const { scene } = useGLTF(url)
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.15) * 0.05
    }
  })

  return <primitive ref={ref} object={scene.clone()} scale={1.2} position={[0, 0, 0]} />
}

export default function AshModel({ position = [0, 0, 0] as [number, number, number] }) {
  const [hasModel, setHasModel] = useState(false)
  const [modelUrl, setModelUrl] = useState<string | null>(null)

  useEffect(() => {
    // Check if user provided model
    const urls = ['/models/ash.glb', '/models/ash.gltf', '/ash.glb', '/ash-model.glb']
    const check = async () => {
      for (const url of urls) {
        try {
          const res = await fetch(url, { method: 'HEAD' })
          if (res.ok) {
            setModelUrl(url)
            setHasModel(true)
            break
          }
        } catch {}
      }
    }
    check()
  }, [])

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group position={position} scale={1}>
        {hasModel && modelUrl ? <AshModelGLB url={modelUrl} /> : <HoodiePlaceholder />}
        {/* Subtle shadow */}
        <mesh position={[0, 0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
          <circleGeometry args={[0.5, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  )
}
