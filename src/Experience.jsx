import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


const Experience = () => {
    const boxRef = useRef();

    useFrame((state, delta) => {
        boxRef.current.rotation.x +=1 * delta;
    });
    
    return(
        <>
        <directionalLight position={[10, 10, 5]} intensity={2} />
        <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="purple" />
        </mesh> 
        </>
    );
}

export default Experience;