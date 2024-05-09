import { BakeShadows, useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { Color, SpotLightHelper } from "three";
import { color, step } from "three/examples/jsm/nodes/Nodes.js";

const Lights = () => {

    const spotLightRef = useRef();
    useHelper(spotLightRef, SpotLightHelper);
    const optionsSpotLight = useMemo(() => {
        return {
            intensitySL: { value: 100, min: 0, max: 100, step: 1 },
            colorSL: { value: "##3331db" }
        }
    }, []);

    const {intensitySL,colorSL} = useControls("Spot Light", optionsSpotLight);


    return (
        <>

            <ambientLight castShadow={true} intensity={0.1}  color={new Color("#B78200")}/>
            <BakeShadows/>
            <directionalLight
                castShadow={true}
                position={[2, 10, 0]}
                color="#B78200"
                intensity={10}></directionalLight>
            
            {/* <pointLight position={[0, 10, 0]} color="#8F00FF" intensity={10} /> */}
            <hemisphereLight 
            castShadow={true}
            position={[2,10,-2]}
            intensity={3}
            skyColor={new Color(0x8F00FF)}
            groundColor={new Color(0x8F00FF)}
            ></hemisphereLight>
            <spotLight 
            ref={spotLightRef}
            position={[0,2,0]}
             angle={Math.PI / 3} 
             color={colorSL} 
             intensity={intensitySL}  
             distance={4}/>
             
        </>
    )
}


export default Lights;