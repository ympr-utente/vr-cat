import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

export default function SandFloor(props) {
    // Cargar las texturas
    const [albedoMap, aoMap, heightMap, metallicMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
        './assets/floor-sand/wavy-sand_albedo.png',
        './assets/floor-sand/wavy-sand_ao.png',
        './assets/floor-sand/wavy-sand_height.png',
        './assets/floor-sand/wavy-sand_metallic.png',
        './assets/floor-sand/wavy-sand_normal-dx.png',
        './assets/floor-sand/wavy-sand_roughness.png'
    ]);

    return (
        <RigidBody type="fixed" rotation-x={Math.PI * -0.5} restitution={0.2} friction={4} {...props}>
            <mesh receiveShadow>
                <boxGeometry args={[20, 20, 1]} />
                <meshStandardMaterial
                    map={albedoMap}
                    aoMap={aoMap}
                    displacementMap={heightMap}
                    metalnessMap={metallicMap}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                />
            </mesh>
        </RigidBody>
    );
}
