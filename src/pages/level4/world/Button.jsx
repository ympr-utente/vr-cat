import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

export default function Button(props) {
  const { nodes, materials } = useGLTF('/assets/level-models/button/Button.glb');
  const buttonRef = useRef();

  return (
    <group {...props} dispose={null}>
      <RigidBody
        ref={buttonRef}
        type="dynamic" // Tipo de cuerpo dinámico que se moverá por la física
        position={[props.position.x, props.position.y, props.position.z]} // Posición del botón en la escena
        mass={1} // Masa del botón (puedes ajustar este valor según lo necesites)
      >
        <CuboidCollider args={[1, 1, 1]} /> {/* Dimensiones del colisionador del botón */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BRB.geometry}
          material={materials.phong1SG}
        />
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/assets/level-models/button/Button.glb');
