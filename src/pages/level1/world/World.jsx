import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default function World(props) {   
    const {nodes,materials} = useGLTF('/assets/models/world/mundoconmodelos.glb');
    const PATH = '/assets/textures/floor/';   
    //const PATH = '/assets/textures/prueba/';   
    const propsTextures = useTexture(
        {   
        map: PATH + 'asphalt_02_diff_1k.jpg',
        displacementMap: PATH + 'asphalt_02_disp_1k.png',
        normalMap: PATH + 'asphalt_02_nor_gl_1k.jpg',
        roughnessMap: PATH + 'asphalt_02_rough_1k.jpg',
        }
    );

/*
    const propsTextures = useTexture(
      {   
      map: PATH + 'pavement_02_diff_1k.jpg',
      displacementMap: PATH + 'pavement_02_disp_1k.png',
      normalMap: PATH + 'pavement_02_nor_gl_1k.jpg',
      roughnessMap: PATH + 'pavement_02_rough_1k.jpg',
      }
  );*/

  /*const propsTextures = useTexture(
    {   
    map: PATH + 'coast_sand_01_diff_1k.jpg',
    displacementMap: PATH + 'coast_sand_01_disp_1k.png',
    normalMap: PATH + 'coast_sand_01_nor_gl_1k.jpg',
    roughnessMap: PATH + 'coast_sand_01_rough_1k.jpg',
    }
);*/




    propsTextures.map.repeat.set(5,70);
    propsTextures.map.wrapS = RepeatWrapping;
    propsTextures.map.wrapT = RepeatWrapping;

    propsTextures.displacementMap.repeat.set(5,70);
    propsTextures.displacementMap.wrapS = RepeatWrapping;
    propsTextures.displacementMap.wrapT = RepeatWrapping;

    propsTextures.normalMap.repeat.set(5,70  );
    propsTextures.normalMap.wrapS = RepeatWrapping;
    propsTextures.normalMap.wrapT = RepeatWrapping;

    propsTextures.roughnessMap.repeat.set(5,70 );
    propsTextures.roughnessMap.wrapS = RepeatWrapping;
    propsTextures.roughnessMap.wrapT = RepeatWrapping;

    /*const propsTextures = useTexture(
        {   
        map: PATH + 'coast_sand_01_diff_1k.jpg',
        displacementMap: PATH + 'coast_sand_01_disp_1k.png',
        normalMap: PATH + 'coast_sand_01_nor_gl_1k.jpg',
        roughnessMap: PATH + 'coast_sand_01_rough_1k.jpg',
        }
    );*/
    console.log(propsTextures);

    return(


      <group {...props} dispose={null}>
      <group>
        <mesh
          geometry={nodes.Casa.geometry}
          material={nodes.Casa.material}
          position={[7.31, 0.051, -33.296]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.Carro.geometry}
          material={materials.Material}
          position={[2.521, 1.418, 8.259]}
        />
        <group  position={[-7.471, 0.121, -16.134]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh geometry={nodes.Cube012.geometry} material={materials.Tree} />
          <mesh castShadow={true} geometry={nodes.Cube012_1.geometry} material={materials.leaffs} />
        </group>
        <group  position={[8.548, 0.121, -16.134]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh  geometry={nodes.Cube013.geometry} material={materials.Tree} />
          <mesh castShadow={true} geometry={nodes.Cube013_1.geometry} material={materials.leaffs} />
        </group>
        <mesh
          geometry={nodes.Casa002.geometry}
          material={nodes.Casa002.material}
          position={[7.31, 0.051, -41.935]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.Casa003.geometry}
          material={nodes.Casa003.material}
          position={[7.31, 0.051, -51.442]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
          geometry={nodes.Casa004.geometry}
          material={nodes.Casa004.material}
          position={[-6.891, 0.051, -51.153]}
          rotation={[0, 0.003, 0]}
        />
        <mesh
          geometry={nodes.Casa005.geometry}
          material={nodes.Casa005.material}
          position={[-6.864, 0.051, -42.514]}
          rotation={[0, 0.003, 0]}
        />
        <mesh
          geometry={nodes.Casa006.geometry}
          material={nodes.Casa006.material}
          position={[-6.833, 0.051, -33.006]}
          rotation={[0, 0.003, 0]}
        />
        <group   position={[8.548, 0.121, 15.065]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh geometry={nodes.Cube020.geometry} material={materials.Tree} />
          <mesh castShadow={true} geometry={nodes.Cube020_1.geometry} material={materials.leaffs} />
        </group>
        <group   position={[-7.471, 0.121, 14.791]} rotation={[0, -Math.PI / 6, 0]}>
          <mesh geometry={nodes.Cube021.geometry} material={materials.Tree} />
          <mesh castShadow={true} geometry={nodes.Cube021_1.geometry} material={materials.leaffs} />
        </group>
        <mesh
          geometry={nodes.Carro001.geometry}
          material={materials.Material}
          position={[-2.954, 1.418, 29.677]}
    />
        <mesh
          geometry={nodes.Carro002.geometry}
          material={materials.Material}
          position={[-3.186, 1.418, -17.029]}
        />
        <mesh
          geometry={nodes.Carro003.geometry}
          material={materials.Material}
          position={[2.49, 1.418, -38.45]}
        />
        <mesh
          castShadow={true}
          geometry={nodes.Edificio002.geometry}
          material={materials['Material.001']}
          position={[6.503, 0, 47.165]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio003.geometry}
          material={materials['Material.001']}
          position={[-7.122, 0, 47.165]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio004.geometry}
          material={materials['Material.001']}
          position={[6.503, 0, 54.351]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio005.geometry}
          material={materials['Material.001']}
          position={[-7.122, 0, 54.351]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio006.geometry}
          material={materials['Material.001']}
          position={[6.503, 0, 62.457]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio007.geometry}
          material={materials['Material.001']}
          position={[-7.122, 0, 62.457]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio001.geometry}
          material={materials['Material.001']}
          position={[6.503, 0, 68.179]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio008.geometry}
          material={materials['Material.001']}
          position={[-7.122, 0, 68.179]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio009.geometry}
          material={materials['Material.001']}
          position={[6.503, 0, 76.285]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Edificio010.geometry}
          material={materials['Material.001']}
          position={[-7.122, 0, 76.285]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Casa001.geometry}
          material={nodes.Casa001.material}
          position={[7.31, 0.051, -60.48]}
          rotation={[-Math.PI, 0, -Math.PI]}
        />
        <mesh
        castShadow={true}
          geometry={nodes.Casa007.geometry}
          material={nodes.Casa007.material}
          position={[-6.891, 0.051, -60.19]}
          rotation={[0, 0.003, 0]}
        />
        <mesh geometry={nodes.Floor.geometry} receiveShadow={true} material={materials['Material.001']}>
            <meshStandardMaterial {...propsTextures} />
          </mesh>
      </group>
    </group>

      /*
      Textura
      
      <group {...props} dispose={null}>
      <group>
      <mesh geometry={nodes.Floor.geometry} material={materials['Material.001']}>
            <meshStandardMaterial {...propsTextures} />
          </mesh>
      </group>
    </group>*/


    )
    }

useGLTF.preload('/assets/models/world/World.glb');
