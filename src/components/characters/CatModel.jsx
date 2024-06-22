import { useAnimations, useGLTF, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from 'three';
import { RigidBody, BallCollider, useRigidBody } from "@react-three/rapier"; 
import { useCatModel } from "../../context/CatModelContext";
import { socket } from "../../socket/socket-manager";

const CatModel = forwardRef((props, ref) => {
    const { catModel } = useCatModel();
    const catModelRef = useRef();
    const { nodes, materials, animations } = useGLTF('./assets/character/threedy-realease.glb');
    const { actions } = useAnimations(animations, catModelRef);
    const [sub, get] = useKeyboardControls();

    useImperativeHandle(ref, () => ({
        translation: () => {
            const position = new THREE.Vector3();
            if (catModelRef.current) {
                catModelRef.current.getWorldPosition(position);
            }
            return position;
        },
        rotation: () => {
            if (catModelRef.current) {
                return catModelRef.current.rotation;
            }
            return new THREE.Euler();
        }
    }), []);

    useEffect(() => {
        if (actions[catModel.animation]) {
            actions[catModel.animation].reset().fadeIn(0.5).play();
        }
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
                if (ref.current && typeof ref.current.translation === 'function' && typeof ref.current.rotation === 'function') {
                    socket.emit("player-moving", {
                        translation: ref.current.translation(),
                        rotation: ref.current.rotation(),
                    });
                }
            }, 100);
        }
    });

    return (
        <group ref={catModelRef} {...props} name="Scene">
            <group name="Scene" position-y={-0.85}>
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
            <RigidBody/>
        </group>
    );
});

useGLTF.preload('./assets/character/threedy-realease.glb');

export default CatModel;
