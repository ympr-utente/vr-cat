import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export default function LevelJuly(props) {
  const { nodes, materials } = useGLTF('/assets/models/levelJuly/World.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Cubo.geometry}
        material={materials.Material}
        position={[0, 0, 0]}
        scale={[2.5, 1, 17.5]}
      />  
    </group>
  )
}

useGLTF.preload('/assets/models/levelJuly/World.glb')