
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export function Fish(props) {
  const { nodes, materials } = useGLTF('./assets/geometries/pez/pez.glb')
  const material = new MeshBasicMaterial({ color: 'blue' });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={material}
        rotation={[-1.594, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('./geometries/pez/pez.glb')