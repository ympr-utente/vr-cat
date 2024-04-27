import { Color, MeshBasicMaterial } from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import World from "./World/World.jsx";
import Environments from "./environments/Environments.jsx";
import Lights from "./lights/Lights.jsx";
import { Perf } from "r3f-perf";

const Experience    = ({title,subtitle}) => {
    return (
        <>
        <Perf position="top-left"/> 
        <Lights/>   
        <OrbitControls />
        <Environments/>
        <World/>
       </>
    );
}

export default Experience;

//CBCE09

/*<directionalLight position={[2,10,0]} color="#11DFC6" intensity={10}></directionalLight>    
<pointLight position={[0, 2, 0]} color="#8F00FF" intensity={10}/>
*/