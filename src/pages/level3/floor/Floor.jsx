import { RigidBody } from '@react-three/rapier';
import { useEffect } from 'react';
import { RepeatWrapping, TextureLoader } from 'three';

export default function Floor(props) {
    const textureLoader = new TextureLoader();

    // Cargar las texturas usando TextureLoader
    const textureColor = textureLoader.load('/assets/textures/cobblestone_floor_001_diff_2k.jpg');
    const textureNormal = textureLoader.load('/assets/textures/cobblestone_floor_001_nor_gl_2k.jpg');
    const textureRoughness = textureLoader.load('/assets/textures/cobblestone_floor_001_rough_2k.jpg');
    const textureDisplacement = textureLoader.load('/assets/textures/cobblestone_floor_001_disp_2k.jpg');

    // Configurar las texturas para que se repitan
    useEffect(() => {
        const textures = [textureColor, textureNormal, textureRoughness, textureDisplacement];
        textures.forEach(texture => {
            texture.wrapS = RepeatWrapping;
            texture.wrapT = RepeatWrapping;
            texture.repeat.set(18, 18); // Ajustar el factor de repetición para coincidir con la geometría
        });
    }, [textureColor, textureNormal, textureRoughness, textureDisplacement]);

    return (
        <RigidBody type="fixed" rotation-x={Math.PI * -0.5} restitution={0.2} friction={4} {...props}>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[20, 20, 1]} />
                <meshStandardMaterial
                    map={textureColor}
                    normalMap={textureNormal}
                    roughnessMap={textureRoughness}
                    displacementMap={textureDisplacement}
                    metalness={0} // Establecer metalness en 0 para evitar el efecto espejo
                    roughness={0.8} // Aumentar roughness para obtener una apariencia más mate
                />
            </mesh>
        </RigidBody>
    );
}
