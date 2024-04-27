import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import Lights from "./world/Lights";
import Environments from "./world/Environments";
import { Suspense } from "react";
import WelcomeText from "./world/WelcomeText";
import LevelJuly from "./world/levelJuly";
import Palmera from "./world/palmera";
import { Canvas } from '@react-three/fiber';
import Person from "./world/person";

const Experience = () => {

    return (

        <>
            
            <OrbitControls
                target={[0, 1.5, -95]}
                enableZoom={false}
                enablePan={false} 
                />
            <Suspense fallback={null}>
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
                <Person 
                    position={[0, -1, -100]}
                    scale={0.2}
                />
                    <WelcomeText position={[0, 1.5, -92]} />
    
            </Suspense>
        </>
        
    )
}

export default Experience;