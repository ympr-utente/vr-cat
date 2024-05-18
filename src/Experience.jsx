import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import Lights from "./world/Lights/Lights";
import Environments from "./world/Environments/Environments";
import { Suspense } from "react";
import WelcomeText from "./world/text/WelcomeText";
import LevelJuly from "./world/levelJuly";
import Palmera from "./world/palmera/palmera";
import { Canvas } from '@react-three/fiber';
import Person from "./world/person/person";
import { Physics } from "@react-three/rapier";
import PelotasPlaya from "./world/obstaculos/obstaculos";
import SillaPlaya from "./world/obstaculos/SillaPlaya";

const Experience = () => {

    return (

        <>
        
            
            <OrbitControls
                target={[0, 3, -110]}
                enableZoom={true}
                enablePan={false} 
                />
            <Suspense fallback={null}>
            <Physics debug={true}>
                <Lights />
                <Environments />
                <Palmera position={[-2, 3.9, -105]}/>
                <Palmera position={[-2, 3.9, -103]}/>
                <Palmera position={[-2, 3.9, -100]}/>
                <Palmera position={[-2, 3.9, -97]}/>
                <Palmera position={[-2, 3.9, -94]}/>
                <Palmera position={[-2, 3.9, -91]}/>
                <Palmera position={[-2, 3.9, -88]}/>
                <Palmera position={[-2, 3.9, -85]}/>
                <Palmera position={[-2, 3.9, -82]}/>
                <Palmera position={[-2, 3.9, -79]}/>
                <Palmera position={[-2, 3.9, -76]}/>
                <Palmera position={[-2, 3.9, -73]}/>
                <Palmera position={[2, 3.9, -73]}/>
                <Palmera position={[2, 3.9, -76]}/>
                <Palmera position={[2, 3.9, -79]}/>
                <Palmera position={[2, 3.9, -82]}/>
                <Palmera position={[2, 3.9, -85]}/>
                <Palmera position={[2, 3.9, -88]}/>
                <Palmera position={[2, 3.9, -91]}/>
                <Palmera position={[2, 3.9, -94]}/>
                <Palmera position={[2, 3.9, -97]}/>
                <Palmera position={[2, 3.9, -100]}/>
                <Palmera position={[2, 3.9, -103]}/>
                <Palmera position={[2, 3.9, -105]}/>
                <LevelJuly 
                    position={[0, 0, -90]}
                />
                        <PelotasPlaya />
                        {/* <SillaPlaya /> */}
                        <Person 
                          position={[0, -1, -105]}
                            scale={0.2}
                    />
            </Physics>
                
                    <WelcomeText position={[0, 1.5, -70]} />
    
            </Suspense>
        </>
        
    )
}

export default Experience;