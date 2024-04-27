import { Center, Text3D } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";
import { Euler } from "three";

const WelcomeText = () => {
    const text = "Welcome to Fairhaven";

    // Crea una referencia para el texto
    const textRef = useRef();

    
    useFrame(({ clock }) => {
        const rotationSpeed = 0.5; 
        const rotationRange = Math.PI / 12; 
        const rotation = Math.sin(clock.elapsedTime * rotationSpeed) * rotationRange; // Calcula el ángulo de rotación basado en el tiempo
        if (textRef.current) {
            textRef.current.rotation.y = rotation;
        }
    });

    return (
        <Center position={[25, 7, 6]}>
            <Text3D
                font={"/assets/fonts/Something in the Cloud_Regular.json"}
                bevelEnabled
                bevelSize={0.005}
                bevelThickness={0.01}
                height={0.1}
                letterSpacing={0.05}
                size={0.5}
                rotation={new Euler(0, Math.PI / 2, 0)}
                ref={textRef} 
            >
                <meshBasicMaterial attach="material" color="#8B4513" />
                {text}
            </Text3D>
        </Center>
    );
};

export default WelcomeText;