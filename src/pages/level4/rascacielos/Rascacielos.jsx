import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Rascacielos(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/rascacielos/rascacielos.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={nodes.Cube.material} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/level-models/rascacielos/rascacielos.glb')