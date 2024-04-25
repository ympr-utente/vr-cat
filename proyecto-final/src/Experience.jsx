import { Color, MeshBasicMaterial } from "three";
import { OrbitControls } from "@react-three/drei";
import World from "./World/World.jsx";

const Experience    = ({title,subtitle}) => {
    return (
        
       <mesh position-x={20} rotation-y={-Math.PI * 0.25} scale={4}>
        <OrbitControls />
        <ambientLight color={new Color("#D4FAF7")}   intensity={0.5}></ambientLight>
        <directionalLight position={[10,10,5]} intensity={2}></directionalLight>    
        <World/>
       </mesh>
    );
}

export default Experience;