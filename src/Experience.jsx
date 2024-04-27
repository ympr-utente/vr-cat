import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Carreta } from "./world/Carreta";
import Environments from "./world/Environments";
import Lights from "./world/Lights";
import WelcomeText from "./world/WelcomeText";
import { World } from "./world/World";

const Experience = () => {
    return (
        <>
      
            <OrbitControls
            target={[15, 0, 3.5]}
                enablePan={false}
                maxPolarAngle={Math.PI / 4} 
                minPolarAngle={Math.PI / 2.59} 
                maxDistance={35} 
            />
            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <World />
                <Carreta position={[14, 0, 3.5]} scale={[0.2, 0.2, 0.2]} rotation={[0, Math.PI, 0]} />
                <WelcomeText position={[30, 0, 3.5]} rotation={[0, 0, 0]} />
            </Suspense>
        </>
    );
}

export default Experience;
