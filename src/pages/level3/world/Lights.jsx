import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { PointLightHelper } from "three";

const Lights = () => {
    const pointLightRef = useRef(null);
    const pointLightHelperRef = useRef(null); // Referencia para el helper de la luz

    useHelper(pointLightRef, PointLightHelper); 

    return (
        <>
            <ambientLight intensity={1} /> 
       

        
            <ambientLight intensity={2} color={"blue"} />
            
            {/* La luz puntual */}
            <pointLight
                ref={pointLightRef}
                position={[5, 5, 5]}
                intensity={15}  
                color={"red"}
                distance={30}
                decay={1}
                castShadow={true} 
            />
        </>
    );
}

export default Lights;