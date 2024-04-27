'use client'

import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import { OrbitControls, useHelper } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

import * as THREE from 'three'

// Basic
const Basic = () => {
  const directionalLight = useRef<THREE.DirectionalLight>(null)
  const boxRef = useRef<THREE.Mesh>(null)

  // Helper
  useHelper(
    directionalLight as React.MutableRefObject<THREE.DirectionalLight>,
    THREE.DirectionalLightHelper,
    1,
    'red'
  )

  useFrame((state, delta) => {
    // elapsed time
    const time = state.clock.elapsedTime
    if (boxRef.current) {
      // X
      boxRef.current.position.x = Math.sin(time) + 1.5
      // Y
      boxRef.current.rotation.y += delta
    }
  })

  return (
    <>
      {/* Control */}
      <OrbitControls makeDefault />

      {/* Monitor */}
      <Perf position="top-left" />

      {/* Background */}
      <color args={['ivory']} attach="background" />

      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Parallel light */}
      <directionalLight
        castShadow
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={0.5}
        shadow-mapSize={[1024, 1024]}
      />

      <group position={[0, -1, 0]}>
        {/* Sphere */}
        <mesh castShadow position={[-1, 0.6, 0]} scale={0.6}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>

        {/* Box */}
        <mesh castShadow position={[1, 0.5, 0]} ref={boxRef}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>

        {/* Plane */}
        <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="lightseagreen" />
        </mesh>
      </group>
    </>
  )
}

export default Basic
// Object
