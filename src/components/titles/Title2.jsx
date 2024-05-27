import { Center, Float, Text3D } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

const Title2 = (props) => {
    return (
        <RigidBody position={[0, 4, 3]} type="fixed" restitution={8} friction={1}>
            <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                <Center>
                    <Text3D
                font={"/assets/fonts/nivel2/nivel2.json"}
                bevelE
                bevelThickness={0.01}
                height={0.1}
                letterSpacing={0.05}
                size={0.3}
                    >
                    
                        {'LEVEL 2'}
                        <meshPhysicalMaterial color="#ffffff" roughness={0.4} thickness={1} transmission={1.2} opacity={1} />
                    </Text3D>
                </Center> 
            </Float>
        </RigidBody>
    )
}

export {Title2};
