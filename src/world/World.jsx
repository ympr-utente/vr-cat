import { useGLTF, useTexture } from "@react-three/drei"
import { RepeatWrapping } from "three";

export default function World(props) {
    const { nodes, materials } = useGLTF("/assets/models/world/WorldSquidGames.glb")
    const PATH = "/assets/textures/floor/";

    const propsTexture = useTexture({
        map: PATH + "coast_sand_01_diff_1k.jpg",
        normalMap: PATH + "coast_sand_01_nor_gl_1k.jpg",
        roughnessMap: PATH + "coast_sand_01_rough_1k.jpg",
        displacementMap: PATH + "coast_sand_01_rough_1k.jpg",
    });

    propsTexture.map.repeat.set(4, 64);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 64);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 64);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 64);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    return (
        <group {...props} dispose={null}>
            <group>
                <mesh geometry={nodes.Walls.geometry} material={materials.Material} />
                <mesh geometry={nodes.Floor.geometry}>
                    <meshStandardMaterial {...propsTexture}/>
                </mesh>
            </group>
        </group>
    );
}

useGLTF.preload("/assets/models/world/WorldSquidGames.glb");

