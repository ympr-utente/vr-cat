import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function CatModel(props) {
  const group = useRef()
  const { nodes, materials} = useGLTF('/assets/models/personaje/threedy-realease.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[0.009, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Cabeza"
            geometry={nodes.Cabeza.geometry}
            material={materials['Piel.001']}
            skeleton={nodes.Cabeza.skeleton}
          />
          <skinnedMesh
            name="Orejas"
            geometry={nodes.Orejas.geometry}
            material={materials.Piel}
            skeleton={nodes.Orejas.skeleton}
          />
          <primitive object={nodes.root} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/personaje/threedy-realease.glb')
