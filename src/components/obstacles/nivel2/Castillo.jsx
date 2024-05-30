import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

function Castillo(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/castillo/castillo.glb')
  return (
    <RigidBody type='fixed' colliders={"cuboid"}>
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        scale={[1.272, 1.962, 3.335]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials['Material.001']}
        position={[0, 2.907, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials['Material.002']}
        position={[-3.935, -2.961, 0.616]}
        rotation={[Math.PI / 2, 0, -Math.PI]}
      />
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/castillo/castillo.glb')
export default Castillo;