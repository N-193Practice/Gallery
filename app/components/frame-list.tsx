'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { imagesType } from './types'
import { GOLDENRATIO } from './utils'
import { easing } from 'maath'

import * as THREE from 'three'
import FrameItem from './frame-item'

// Frame list
const FrameList = ({ images }: { images: imagesType[] }) => {
  const frameRef = useRef<THREE.Group>(null)
  const clickRef: any = useRef(null)
  const [select, setSelect] = useState('/')
  const targetPosition = useMemo(() => new THREE.Vector3(), [])
  const targetQuaternion = useMemo(() => new THREE.Quaternion(), [])

  useEffect(() => {
    if (frameRef.current) {
      // Get clicked frame
      clickRef.current = frameRef.current.getObjectByName(select)

      if (clickRef.current) {
        // Move the camera to the frame if it exists
        const parent = clickRef.current.parent
        parent.updateWorldMatrix(true, true)
        parent.localToWorld(targetPosition.set(0, GOLDENRATIO / 2, 2.2))
        parent.getWorldQuaternion(targetQuaternion)
      } else {
        // Revert to default position if frame does not exist
        targetPosition.set(0, 0, 4)
        targetQuaternion.identity()
      }
    }
  }, [select, targetPosition, targetQuaternion])

  useFrame((state, delta) => {
    // Move camera position to frame position
    easing.damp3(state.camera.position, targetPosition, 0.4, delta)
    easing.dampQ(state.camera.quaternion, targetQuaternion, 0.4, delta)
  })

  return (
    <group
      ref={frameRef}
      onClick={(e) => {
        // Select frame on first click
        e.stopPropagation()
        setSelect(e.object.name)
      }}
      // If you click outside the frame, return the camera to the default position
      onPointerMissed={() => setSelect('/')}
    >
      {images.map((data, index) => (
        <FrameItem key={index} data={data} />
      ))}
    </group>
  )
}

export default FrameList
