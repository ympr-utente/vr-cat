import React, { useRef, useMemo, useEffect } from 'react'
import { Float, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import { useGame } from '../../../stores/useGame'
import { useAudio } from '../../../stores/useAudio'

export default function Trophy({ onCollide, ...props }) {
    const group = useRef()
    const { nodes, materials } = useGLTF('./assets/plato-gato/plato-gato.glb')

    const endGame = useGame((state) => state.end)
    const audio = useAudio((state) => state.audio)
    const hitSound = useMemo(() => new Audio('./assets/sounds/hit.mp3'), [])

    function onHit({ other }) {
        hitSound.currentTime = 0
        hitSound.volume = Math.random() * 0.1
        hitSound.play()
        if (onCollide) {
            onCollide()  // Llama a la función onCollide al detectar colisión
        }
    }

    useEffect(() => {
        hitSound.muted = !audio
    }, [audio])


    return (
        <RigidBody type="fixed" colliders="hull" restitution={0.2} friction={0} onCollisionEnter={onHit} {...props}>
            <Float speed={2} rotationIntensity={0.1} floatIntensity={1}>
            <group {...props} dispose={null}>
            <group name="Scene">
                <mesh
                name="Orejas"
                castShadow
                receiveShadow
                geometry={nodes.Orejas.geometry}
                material={materials['Material.002']}
                position={[-4.077, 7.675, -2.887]}
                rotation={[2.961, 0.01, 2.433]}
                scale={[1.027, 1.027, 0.653]}
                />
                <mesh
                name="Círculo"
                castShadow
                receiveShadow
                geometry={nodes.Círculo.geometry}
                material={materials['Material.002']}
                position={[0.003, 4.826, -2.624]}
                rotation={[-1.887, -0.001, -3.138]}
                scale={-5.056}
                />
            </group>
            </group>
            </Float>
        </RigidBody>
    )
}

useGLTF.preload('./assets/plato-gato/plato-gato.glb')