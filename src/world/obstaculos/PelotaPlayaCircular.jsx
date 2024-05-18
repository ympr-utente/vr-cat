


import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { RigidBody } from '@react-three/rapier';

export default function PelotaPlayaCircular({position}) {
  const redManCircleRef = useRef(null)
  const redManCircleBodyRef = useRef(null)
  const { nodes, materials } = useGLTF('/assets/models/pelotaPlaya/pelota.glb')

  const radius = 2
  const speed = 2

  useFrame(({clock}) => {
      const elapsedTime = clock.getElapsedTime()
      const angle = elapsedTime * speed
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius

      redManCircleRef.current.rotation.y = -angle

      redManCircleBodyRef.current?.setTranslation({
          x:  position[0] + x,
          y:  position[1],
          z:  position[2] + z
      }, true)
  })

  return (
    <RigidBody ref={redManCircleBodyRef} type="fixed" colliders={"ball"} position={position}>
        <group ref={redManCircleRef} dispose={null} scale={2}>
        <group rotation={[5, 0, 2]} scale={0.03}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['13517_Beach_Ball_v2_L3_1'].geometry}
            material={materials.Beach_Ball_transparent_plastic}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes['13517_Beach_Ball_v2_L3_2'].geometry}
            material={materials.Beach_Ball_rubber}
          />
        </group>
      </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/pelotaPlaya/pelota.glb')