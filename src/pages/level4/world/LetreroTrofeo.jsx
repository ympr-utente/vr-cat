import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function LetreroTrofeo(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/señal-comida/señal-comida-gato-trofeo.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Orejas.geometry}
        material={materials['Material.002']}
        position={[-4.784, 4.974, 0.65]}
        rotation={[2.961, 0.01, 2.433]}
        scale={[0.071, 0.071, 0.045]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Círculo.geometry}
        material={materials['Material.002']}
        position={[-4.502, 4.777, 0.669]}
        rotation={[-1.887, -0.001, -3.138]}
        scale={-0.349}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TownSign.geometry}
        material={materials['Atlas.050']}
        scale={100}
      />
    </group>
  )
}

useGLTF.preload('/assets/level-models/señal-comida/señal-comida-gato-trofeo.glb')
