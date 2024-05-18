import { RigidBody } from "@react-three/rapier";
import { Castillo } from "./Castillo";
import PelotaPlayaCircular from "./PelotaPlayaCircular";
import { PelotaPlayaLineal } from "./PelotaPlayaLineal";
import SillaPlaya from "./SillaPlaya";


export default function PelotasPlaya() {

    return <>
        <PelotaPlayaLineal position={[-2, 0, -50]} /> 
        <PelotaPlayaCircular position={[0, 0, -80]} />
        <SillaPlaya scale={2} position={[-1.5, -1, -90]} />
        <Castillo scale={0.1} position={[0.5, -0.5, -95]} />
        <RigidBody type="fixed" colliders={"cuboid"}>
        <SillaPlaya scale={2} position={[1, -1, -90]} />
        </RigidBody>
        <PelotaPlayaLineal position={[-2, 0, -43]} /> 
        
    </>
}