import { useAnimations, useGLTF } from "@react-three/drei";
import { forwardRef, useEffect, useRef } from "react";
import { useCatModel } from "../../context/CatModelContext";
import { socket } from "../../socket/socket-manager";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";

const CatModel = forwardRef((props, ref) => {
    const { catModel } = useCatModel();
    const catModelRef = useRef();
    const { nodes, materials, animations } = useGLTF('./assets/character/threedy-realease.glb');
    const { actions } = useAnimations(animations, catModelRef);
    const [sub, get] = useKeyboardControls();
    const player1Ref = useRef();

    useEffect(() => {
        actions[catModel.animation]?.reset().fadeIn(0.5).play();
        return () => {
            if (actions[catModel.animation]) {
                actions[catModel.animation].fadeOut(0.5);
            }
        };
    }, [actions, catModel.animation]);

    useEffect(() => {
        if (ref) {
            ref.current = catModelRef.current;
        }
    }, [ref]);

    useFrame(() => {
        // Get current keyboard input states
        const { forward, backward, leftward, rightward } = get();
    
        // If any movement key is pressed, emit the player's movement data to the server
        if (forward || backward || leftward || rightward) {
          window.setTimeout(() => {
            socket.emit("player-moving", {
              translation: catModelRef.current?.translation(),
              rotation: catModelRef.current?.rotation(),
            });
          }, 100);
        }
      });



    return (
        <group ref={catModelRef} {...props} name="Scene">
            <group  name="Scene" position-y={-0.85}>
                <group name="Armature" rotation={[-3.133, 0, 0]} scale={0.01}>
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        name="Bigote"
                        geometry={nodes.Bigote.geometry}
                        material={materials['Nariz.003']}
                        skeleton={nodes.Bigote.skeleton}
                    />
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        name="Bigote001"
                        geometry={nodes.Bigote001.geometry}
                        material={materials['Bigote.003']}
                        skeleton={nodes.Bigote001.skeleton}
                    />
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        name="Cabeza"
                        geometry={nodes.Cabeza.geometry}
                        material={materials['Piel.003']}
                        skeleton={nodes.Cabeza.skeleton}
                    />
                    <group name="GafasFacheras">
                        <skinnedMesh
                            castShadow
                            receiveShadow
                            name="Plano003"
                            geometry={nodes.Plano003.geometry}
                            material={materials['MarcoGafas.001']}
                            skeleton={nodes.Plano003.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            receiveShadow
                            name="Plano003_1"
                            geometry={nodes.Plano003_1.geometry}
                            material={materials['Rojo.001']}
                            skeleton={nodes.Plano003_1.skeleton}
                        />
                        <skinnedMesh
                            castShadow
                            receiveShadow
                            name="Plano003_2"
                            geometry={nodes.Plano003_2.geometry}
                            material={materials['Azul.001']}
                            skeleton={nodes.Plano003_2.skeleton}
                        />
                    </group>
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        name="Nariz"
                        geometry={nodes.Nariz.geometry}
                        material={materials['Nariz.004']}
                        skeleton={nodes.Nariz.skeleton}
                    />
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        name="Orejas"
                        geometry={nodes.Orejas.geometry}
                        material={materials['Piel.002']}
                        skeleton={nodes.Orejas.skeleton}
                    />
                    <primitive object={nodes.mixamorigHips} />
                </group>
            </group>
        </group>
    );
});
useGLTF.preload('./assets/character/threedy-realease.glb');

export default CatModel;
