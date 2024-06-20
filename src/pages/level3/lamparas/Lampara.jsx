import { useGLTF } from '@react-three/drei'
import React from 'react'

export function Lampara(props) {
  const { nodes, materials } = useGLTF('/assets/models/lampara/lamparas.glb')
  return (
    <group {...props} dispose={null}>
      <group>
        <group position={[9.266, -0.714, 8.861]} rotation={[0, -Math.PI / 2, 0]} scale={3}>
          <mesh geometry={nodes.Plane006.geometry} material={materials['MAIN.001']} />
          <mesh geometry={nodes.Plane006_1.geometry} material={materials['Window.001']} />
          <mesh geometry={nodes.Plane006_2.geometry} material={materials['ROOFM.001']} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/assets/models/lampara/lamparas.glb')
