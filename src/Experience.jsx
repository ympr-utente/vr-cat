import { OrbitControls } from "@react-three/drei";
import World from "./world/World";

const Experience = () => {
    return (
        <>
            <ambientLight />
            <directionalLight position={[10, 10, 5]} />
            <OrbitControls makeDefault />
            <World/>
        </>
    )
}

export default Experience;