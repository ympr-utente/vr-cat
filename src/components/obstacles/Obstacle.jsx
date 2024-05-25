import { useFrame} from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { forwardRef, useRef, useMemo, useEffect, useState} from 'react'
import * as THREE from 'three'
import { useAudio } from '../../stores/useAudio'

const Obstacle = forwardRef(function Obstacle({ color: defaultColor = '#A876F5', ...props }, ref) {
    const audio = useAudio((state) => state.audio)
    const hitSound = useMemo(() => new Audio('./assets/sounds/hit.mp3'), [])

    function onHit({ totalForceMagnitude }) {
        hitSound.currentTime = 0
        hitSound.volume = Math.min(totalForceMagnitude / 10000, 1)
        hitSound.play()
    }

    useEffect(() => {
        hitSound.muted = !audio
    }, [audio])

    return (
        <RigidBody ref={ref} type="kinematicPosition" position-y={2} restitution={2} friction={1} onContactForce={onHit} {...props}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[10, 1, 1]} />
                <meshStandardMaterial color={defaultColor} />
            </mesh>
        </RigidBody>
    )
});

const Spinner = function ({ speed = 1, initialShift = Math.random() * 10, invert = false, color, ...props }) {
    const obstacleRef = useRef();
    const rotation = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(0, (time * speed + initialShift) * (invert ? -1 : 1), 0));
            obstacleRef.current.setNextKinematicRotation(rotation.current);
        }
    });

    return <Obstacle ref={obstacleRef} color={color} {...props} />
}

const Limbo = function ({ speed = 1, initialShift = 0, color, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const obstacleTranslation = obstacleRef?.current?.translation();

        if (obstacleRef.current) {
            obstacleRef.current.setNextKinematicTranslation({
                x: obstacleTranslation.x,
                y: Math.abs(Math.sin(time * speed + initialShift) * 5) + 2,
                z: obstacleTranslation.z
            });
        }
    });

    return <Obstacle ref={obstacleRef} color={color} scale-x={2} {...props} />;
};

const SlidingWall = function ({ speed = 1, initialShift = 0, color, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            const obstacleTranslation = obstacleRef.current.translation();
            obstacleRef.current.setNextKinematicTranslation({
                x: Math.sin(time * speed + initialShift) * 5,
                y: obstacleTranslation.y,
                z: obstacleTranslation.z
            });
        }
    });

    return <Obstacle ref={obstacleRef} color={color} scale-y={5} position-y={3} {...props} />
}

Obstacle.Spinner = Spinner
Obstacle.Limbo = Limbo
Obstacle.SlidingWall = SlidingWall

export default Obstacle
