import { Center, Float, Html, Text, Text3D } from "@react-three/drei";

const WelcomeText = (props) => {
    const text = "VR CAT";

    return (
        <Float
            speed={3}
            rotationIntensity={0.01}
            floatIntensity={0.5}
            floatingRange={[1, 2]}

        >
        <Center
            position={props.position}
        >
            <Text3D
                font={"/assets/fonts/VrCat.json"}
                bevelEnabled
                bevelSize={0.005}
                bevelThickness={0.01}
                height={0.1}
                //lineHeight={2}
                letterSpacing={0.05}
                size={0.3}
            >
                <meshNormalMaterial />
                {text}
            </Text3D>
        </Center>
        </Float>
        
    )
}
export default WelcomeText;
