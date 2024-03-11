import { OrbitControls } from "@react-three/drei";
import World from "./world/World";
// import { useFrame } from "@react-three/fiber";
// import { useRef } from "react";

const Experience = () => {
    // const boxRef = useRef(null);

    // useFrame(({clock}, delta) => {
    //     console.log(clock.getElapsedTime());

    //     boxRef.current.position.y = Math.cos(clock.getElapsedTime());
    //     boxRef.current.position.x += 0.1 * delta;
    // });

    return (
        <>
            <ambientLight />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls makeDefault />
            <World/>
            {/* <mesh
                ref={boxRef}
                position={[0, 0, 0]}
                rotation={[0, Math.PI / 3, 0]}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color="orange" />
            </mesh> */}
        </>

    )
}

export default Experience;