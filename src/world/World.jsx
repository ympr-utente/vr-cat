import { useGLTF, useTexture } from "@react-three/drei"
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
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

    const leavesRef = useRef(null);

    propsTexture.map.repeat.set(4, 64);
    propsTexture.map.wrapS = propsTexture.map.wrapT = RepeatWrapping;

    propsTexture.normalMap.repeat.set(4, 64);
    propsTexture.normalMap.wrapS = propsTexture.normalMap.wrapT = RepeatWrapping;

    propsTexture.roughnessMap.repeat.set(4, 64);
    propsTexture.roughnessMap.wrapS = propsTexture.roughnessMap.wrapT = RepeatWrapping;

    propsTexture.displacementMap.repeat.set(4, 64);
    propsTexture.displacementMap.wrapS = propsTexture.displacementMap.wrapT = RepeatWrapping;

    useFrame((state, delta)=>{
        leavesRef.current.rotation.y += 1 * delta;
    } )
    return (
        <group {...props} dispose={null}>
            <group>
                {/* <mesh geometry={nodes.Walls.geometry} material={materials.Material} /> */}
                <mesh receiveShadow={true} geometry={nodes.Floor.geometry} >
                    <meshStandardMaterial {...propsTexture} opacity={1} transparent={false}/>
                </mesh>
                <mesh castShadow={true} geometry={nodes.WoodenFence.geometry}>
                    <meshStandardMaterial
                        color={"#FF8E07"}
                        metalness={0}
                        roughness={0.5}
                    />
                </mesh>
                <group>
                    <mesh ref={leavesRef} castShadow={true} geometry={nodes.Tree_1.geometry} material={materials.leaves_material} />
                    <mesh castShadow={true} geometry={nodes.Tree_2.geometry} material={materials.root_material} />
                </group>
            </group>
        </group>
    );
}

useGLTF.preload("/assets/models/world/WorldSquidGames.glb");

