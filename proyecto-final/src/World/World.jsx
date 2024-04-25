import { useGLTF, useTexture } from "@react-three/drei";
import { RepeatWrapping } from "three";

export default function World(props) {   
    const {nodes,materials} = useGLTF('/assets/models/world/WorldSquidGamesFInal.glb');
    const PATH = '/assets/textures/floor/';   
    //const PATH = '/assets/textures/prueba/';   
    /*const propsTextures = useTexture(
        {   
        map: PATH + 'asphalt_02_diff_1k.jpg',
        displacementMap: PATH + 'asphalt_02_disp_1k.png',
        normalMap: PATH + 'asphalt_02_nor_gl_1k.jpg',
        roughnessMap: PATH + 'asphalt_02_rough_1k.jpg',
        }
    );
*/
    const propsTextures = useTexture(
      {   
      map: PATH + 'pavement_02_diff_1k.jpg',
      displacementMap: PATH + 'pavement_02_disp_1k.png',
      normalMap: PATH + 'pavement_02_nor_gl_1k.jpg',
      roughnessMap: PATH + 'pavement_02_rough_1k.jpg',
      }
  );

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
      <mesh geometry={nodes.Floor.geometry} material={materials['Material.001']}>
            <meshStandardMaterial {...propsTextures} />
          </mesh>
      </group>
    </group>


       /* <group {...props} dispose={null}>
        <group>
          <mesh geometry={nodes.Floor.geometry} material={materials['Material.001']}>
            <meshStandardMaterial {...propsTextures} />
          </mesh>
        </group>
      </group>*/
    )
    }

useGLTF.preload('/assets/models/world/World.glb');
