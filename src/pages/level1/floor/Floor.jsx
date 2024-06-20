import { RigidBody } from '@react-three/rapier';
import { MeshStandardMaterial, TextureLoader } from 'three';

export default function Floor(props) {
    const textureLoader = new TextureLoader();
    const textureColor = textureLoader.load('./assets/floor/oakfloor_basecolor.png');
    const textureRoughness = textureLoader.load('./assets/floor/oakfloor_roughness.png');
    const textureMetalness = textureLoader.load('./assets/floor/oakfloor_Height.png');

    return (
        <RigidBody type="fixed" rotation-x={Math.PI * -0.5} restitution={0.2} friction={4} {...props}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[20, 20, 1]} />
                <meshStandardMaterial
                    map={textureColor}
                    roughnessMap={textureRoughness}
                    metalnessMap={textureMetalness}
                />
            </mesh>
        </RigidBody>
    )
}
