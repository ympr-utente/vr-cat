import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Castillo(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/castillo/castillo.glb')
  return (
    <RigidBody type='fixed' colliders={"trimesh"}>
    <group {...props} dispose={null}>
      <group position={[0, -0.29, 0]} scale={[1.272, 1.962, 3.335]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials['Material.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials['Material.002']}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube063.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube065.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube074.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube084.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube137.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube179.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube189.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube201.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube211.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube258.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube283.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube358.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube366.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube368.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube543.geometry}
        material={materials['Material.002']}
        position={[0, 2.652, 4.535]}
      />
    </group>
    </RigidBody>
  )
}

useGLTF.preload('/assets/models/castillo/castillo.glb')