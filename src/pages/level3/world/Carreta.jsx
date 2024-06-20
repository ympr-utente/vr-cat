import { useGLTF } from '@react-three/drei';
import React from 'react';

export function Carreta(props) {
  const { nodes, materials } = useGLTF("/assets/models/Carreta/Carreta.glb");
  return (
    <group {...props} dispose={null}>
      <group>
        <group position={[0, 1.4, 0]} rotation={[Math.PI / 2, 0.314, 0]} scale={[1.4, 0.14, 1.4]}>
          <mesh castShadow= {true} geometry={nodes.Cylinder005.geometry} material={materials.Wood} castShadow receiveShadow />
          <mesh castShadow= {true}  geometry={nodes.Cylinder005_1.geometry} material={materials.Steel} castShadow receiveShadow />
          <mesh castShadow= {true}  geometry={nodes.Cylinder005_2.geometry} material={materials['Wood Light']} castShadow receiveShadow />
          <mesh castShadow= {true}   geometry={nodes.Cylinder005_3.geometry} material={nodes.Cylinder005_3.material} castShadow receiveShadow />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/assets/models/Carreta/Carreta.glb");
