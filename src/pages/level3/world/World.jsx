import { useGLTF, useTexture } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import React from 'react';
import { RepeatWrapping } from 'three';

export function World(props) {
    const { nodes, materials } = useGLTF("/assets/models/world/Modelo_Base_Az.glb");
    const PATH = "/assets/textures/";
    const propsTexture = useTexture({
        map: PATH + "brown_mud_leaves_01_diff_1k.jpg",
        normalMap: PATH + "brown_mud_leaves_01_disp_1k.jpg",
        roughnessMap: PATH + "brown_mud_leaves_01_rough_1k.jpg",
        displacementMap: PATH + "brown_mud_leaves_01_disp_1k.jpg",
    });

    // Configurar las texturas para repetir
    propsTexture.map.repeat.set(20, 20);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(20, 20);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;
    propsTexture.roughnessMap.repeat.set(20, 20);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;
    propsTexture.displacementMap.repeat.set(20, 20);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
            <RigidBody type="fixed" colliders="trimesh" position={[0, 0, 0]} rotation={[0, 0, 0]}>
                <mesh receiveShadow geometry={nodes.piso.geometry}>
                    <meshStandardMaterial {...propsTexture} />
                </mesh>
                <group>
                    <mesh geometry={nodes.casas_1.geometry} material={materials.MAIN} />
                    <mesh geometry={nodes.casas_2.geometry} material={materials.Window} />
                    <mesh geometry={nodes.casas_3.geometry} material={materials.ROOFM} />
                </group>
                <mesh geometry={nodes.cilindro.geometry} material={materials['MAIN.001']} />
                <mesh geometry={nodes.madera.geometry} material={materials['MAIN.002']} />
                <group position={[24.728, 0, 4.553]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh geometry={nodes.lamp2.geometry} material={materials['MAIN.004']} />
                    <mesh geometry={nodes.lamp2_1.geometry} material={materials['Window.002']} />
                    <mesh geometry={nodes.lamp2_2.geometry} material={materials['ROOFM.002']} />
                </group>
                <group position={[12.667, 0, -2.422]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh geometry={nodes.lampa003.geometry} material={materials['MAIN.004']} />
                    <mesh geometry={nodes.lampa003_1.geometry} material={materials['Window.002']} />
                    <mesh geometry={nodes.lampa003_2.geometry} material={materials['ROOFM.002']} />
                </group>
                <group position={[3.935, 0, -2.785]} rotation={[0, -Math.PI / 2, 0]}>
                    <mesh geometry={nodes.lamp001.geometry} material={materials['MAIN.004']} />
                    <mesh geometry={nodes.lamp001_1.geometry} material={materials['Window.002']} />
                    <mesh geometry={nodes.lamp001_2.geometry} material={materials['ROOFM.002']} />
                </group>
                <group position={[14.156, 0, 4.32]} rotation={[0, 1.571, 0]}>
                    <mesh geometry={nodes.lamp.geometry} material={materials['MAIN.004']} />
                    <mesh geometry={nodes.lamp_1.geometry} material={materials['Window.002']} />
                    <mesh geometry={nodes.lamp_2.geometry} material={materials['ROOFM.002']} />
                </group>
            </RigidBody>
        </group>
    );
}

useGLTF.preload("/assets/models/world/Modelo_Base_Az.glb");
