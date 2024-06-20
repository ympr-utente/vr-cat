export default function Lights() {
    return (
        <>
            <ambientLight
                intensity={-0.2}
            />
            <directionalLight
                castShadow
                position={[10, 10, 0]}
                shadow-mapSize = {[2048, 2048]}
                shadow-camera-far = {50}
                shadow-camera-left = {-10}
                shadow-camera-right = {10}
                shadow-camera-top = {10}
                shadow-camera-bottom = {-10}
            />
            <pointLight
                castShadow
                position={[0, -1, -100]}
                intensity={1000}
                angle={90}
            />
        </>
    )
}
