import { Color, MeshBasicMaterial } from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import World from "./world/World.jsx";
import Environments from "./environments/Environments.jsx";
import Lights from "./lights/Lights.jsx";
import { Perf } from "r3f-perf";
// import WelcomeText from "./level1/World/WelcomeText.jsx";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

export default function Level1() {
    return (
        <>
            
            {/* <OrbitControls /> */}
            <Suspense fallback={null}>
            <Canvas shadows={true}>
                {/* <Perf position="top-left" /> */}
                <Lights />
                <OrbitControls />
                <Environments />
                {/* <WelcomeText position={[0, 0, 0]} /> */}
                <World />
            </Canvas>
            </Suspense>
        </>
    )
}   