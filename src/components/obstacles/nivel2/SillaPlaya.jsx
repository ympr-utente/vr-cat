import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber"
import { RigidBody } from '@react-three/rapier';


export default function SillaPlaya(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/sillaPlaya/sillaPlaya.glb')
  return (
    <RigidBody type='fixed' colliders={"hull"}>
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.fabric}
        position={[0.101, 0.473, -0.028]}
        rotation={[0.382, 0, 0]}
        scale={[0.201, 0.549, 0.549]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.stand010.geometry}
        material={materials.wood}
        position={[0.107, 0.651, -0.505]}
        rotation={[0.327, 0.009, -1.562]}
        scale={[0.008, 0.245, 0.01]}
      />
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/sillaPlaya/sillaPlaya.glb')
