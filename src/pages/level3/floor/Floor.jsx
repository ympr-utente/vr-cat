import { RigidBody } from '@react-three/rapier';
import { MeshStandardMaterial, TextureLoader } from 'three';

export default function Floor(props) {
    // const textureLoader = new TextureLoader();
    // const textureColor = textureLoader.load('./assets/floor-sand/wavy-sand_albedo.png');
    // const textureRoughness = textureLoader.load('./assets/floor-sand/wavy-sand_roughness.png');
    // const textureMetalness = textureLoader.load('./assets/floor-sand/wavy-sand_height.png');

    const textureLoader = new TextureLoader();
    const textureColor = textureLoader.load('./assets/floor-asphalt/asphalt_02_diff_1k.jpg');
    const textureRoughness = textureLoader.load('./assets/floor-asphalt/asphalt_02_rough_1k.png');
    const textureMetalness = textureLoader.load('./assets/floor-asphalt/asphalt_02_disp_1k.png');


    return (
        <RigidBody type="fixed" rotation-x={Math.PI * -0.5} restitution={0.2} friction={4} {...props}>
            <mesh receiveShadow>
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

