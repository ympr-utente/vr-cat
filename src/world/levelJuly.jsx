import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { MeshBasicMaterial } from 'three'

export default function LevelJuly(props) {
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
];

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