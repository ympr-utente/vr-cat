import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Casa(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/casa/casa.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <mesh geometry={nodes.Cube.geometry} material={materials.Techo} />
        <mesh geometry={nodes.roof.geometry} material={materials.roof} />
        <mesh geometry={nodes.chemy.geometry} material={nodes.chemy.material} />
        <mesh geometry={nodes.Door.geometry} material={materials.Material} />
        <mesh geometry={nodes.window.geometry} material={materials.Techo} />
      </group>
    </group>
  )
}

useGLTF.preload('/assets/level-models/casa/casa.glb')