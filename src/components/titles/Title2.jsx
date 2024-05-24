import { Center, Float, Html, Text, Text3D } from "@react-three/drei";

const Title2 = (props) => {
    const text = "Level 2";

    return (
        <Float
            speed={3}
            rotationIntensity={0.01}
            floatIntensity={0.5}
            floatingRange={[1, 2]}

        >
        <Center
            position={[0, 4, 3]}
        >
            <Text3D
                font={"/assets/fonts/nivel2/nivel2.json"}
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
export {Title2};
