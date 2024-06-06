import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Arbol(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/arbol/aboles.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <group>
          <mesh geometry={nodes.Cube013.geometry} material={materials.Tree} />
          <mesh geometry={nodes.Cube013_1.geometry} material={materials.leaffs} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/level-models/arbol/aboles.glb')