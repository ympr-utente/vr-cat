import { useGLTF } from '@react-three/drei'
import React from 'react'
import { RigidBody } from '@react-three/rapier';

export default function Palmera({position, props}) {
    const { nodes, materials } = useGLTF('/assets/level-models/palmera/palmera.glb')
    return (
      <RigidBody type='fixed' colliders={"cuboid"}>
      <group position={position} {...props} dispose={null}>
        <group rotation={[-2.861, 0, -Math.PI]} scale={[0.24, 1, 1]}>
          <mesh
            castShadow
            receiveShadow 
            geometry={nodes.Plane001.geometry}
            material={materials['Palm_leaf.036']}
          />
          <mesh
            castShadow
            receiveShadow 
            geometry={nodes.Plane001_1.geometry}
            material={materials['Palm_wood.003']}
          />
        </group>
      </group>
      </RigidBody>
    )
  }
  
  useGLTF.preload('/assets/level-models/palmera/palmera.glb')