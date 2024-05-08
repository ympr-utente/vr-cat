import { useEffect, useRef } from "react";
import { useCatModel } from "./CatModelContext";
import { useAnimations, useGLTF } from "@react-three/drei";

function CatModel() {
    const { catModel } = useCatModel();
    const catModelRef = useRef();
    const { nodes, materials, animations } = useGLTF('./geometries/personaje/threedy-realease.glb');
    const { actions } = useAnimations(animations, catModelRef);

    useEffect(() => {
        actions[catModel.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[catModel.animation]) {
                actions[catModel.animation].fadeOut(0.5);
            }
        };
    }, [actions, catModel.animation]);

    return (
        <group ref={catModelRef} name="Scene">
      <group name="Scene">
        <group name="Armature" rotation={[3.12, 0, 0]} scale={0.01}>
          <skinnedMesh
            name="Bigote001"
            geometry={nodes.Bigote001.geometry}
            material={materials['Bigote.001']}
            skeleton={nodes.Bigote001.skeleton}
          />
          <skinnedMesh
            name="Cabeza"
            geometry={nodes.Cabeza.geometry}
            material={materials['Piel.001']}
            skeleton={nodes.Cabeza.skeleton}
          />
          <group name="GafasFacheras">
            <skinnedMesh
              name="Plano001"
              geometry={nodes.Plano001.geometry}
              material={materials.MarcoGafas}
              skeleton={nodes.Plano001.skeleton}
            />
            <skinnedMesh
              name="Plano001_1"
              geometry={nodes.Plano001_1.geometry}
              material={materials.Rojo}
              skeleton={nodes.Plano001_1.skeleton}
            />
            <skinnedMesh
              name="Plano001_2"
              geometry={nodes.Plano001_2.geometry}
              material={materials.Azul}
              skeleton={nodes.Plano001_2.skeleton}
            />
          </group>
          <skinnedMesh
            name="Nariz"
            geometry={nodes.Nariz.geometry}
            material={materials['Nariz.002']}
            skeleton={nodes.Nariz.skeleton}
          />
          <skinnedMesh
            name="Orejas"
            geometry={nodes.Orejas.geometry}
            material={materials.Piel}
            skeleton={nodes.Orejas.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./geometries/personaje/threedy-realease.glb')

export default CatModel;
