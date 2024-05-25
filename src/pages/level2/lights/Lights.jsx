import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Color } from "three";

export default function Lights() {

    return (
        <>
            <ambientLight
                intensity={0.2}
            />
            <directionalLight
                castShadow={true}
                position={[10, 10, 0]}
                color={new Color("#FFF700")}
                intensity={-2}
                shadow-mapSize = {[2048, 2048]}
                shadow-camera-far = {50}
                shadow-camera-left = {-10}
                shadow-camera-right = {10}
                shadow-camera-top = {10}
                shadow-camera-bottom = {-10}
            />
            <pointLight
                position={[0, -1, -100]}
                castShadow={true}
                color="yellow"
                intensity={1000}
                angle={90}
            />
        </>
    )
}
