import { BakeShadows, Loader, OrbitControls } from "@react-three/drei";
import World from "./world/World";
import Lights from "./lights/Lights";
import Environments from "./environments/Environments";
import { Perf } from "r3f-perf";
import { Suspense } from "react";

const Experience = () => {
    return (
        <>
            <Perf position="top-left" />
            <BakeShadows />
            <OrbitControls makeDefault />

            <Suspense fallback={null}>
                <Lights />
                <Environments />
                <World />
            </Suspense>
        </>
    )
}

export default Experience;