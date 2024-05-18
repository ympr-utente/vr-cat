import { useGLTF } from '@react-three/drei'
import React from 'react'

export default function Palmera({position, props}) {
    const { nodes, materials } = useGLTF('/assets/models/palmera/palmera.glb')
    return (
      <RigidBody type='fixed' colliders={"ball"}>
      <group position={position} {...props} dispose={null}>
        <group rotation={[-2.861, 0, -Math.PI]} scale={[0.24, 1, 1]}>
          <mesh
            castShadow
            receiveShadow = {true}
            geometry={nodes.Plane001.geometry}
            material={materials['Palm_leaf.036']}
          />
          <mesh
            castShadow
            receiveShadow = {true}
            geometry={nodes.Plane001_1.geometry}
            material={materials['Palm_wood.003']}
          />
        </group>
      </group>
      </RigidBody>
    )
  }
  
  useGLTF.preload('/assets/models/palmera/palmera.glb')