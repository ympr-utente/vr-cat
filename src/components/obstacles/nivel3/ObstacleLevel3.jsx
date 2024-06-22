import { useFrame } from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useAudio } from '../../../stores/useAudio'

const ObstacleLevel3 = forwardRef(function ObstacleLevel3({ color: defaultColor = '#A876F5', ...props }, ref) {
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

    return <ObstacleLevel3 ref={obstacleRef} color={color} {...props} />
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

    return <ObstacleLevel3 ref={obstacleRef} color={color} scale-x={2} {...props} />;
};

const SlidingWall = function ({ speed, initialShift, color, paused, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current && !paused) {
            const obstacleTranslation = obstacleRef.current.translation();
            obstacleRef.current.setNextKinematicTranslation({
                x: Math.sin(time * speed + initialShift) * 6,
                y: obstacleTranslation.y,
                z: obstacleTranslation.z
            });
        }
    });

    return <ObstacleLevel3 ref={obstacleRef} color={color} scale-y={8} {...props} />
}


ObstacleLevel3.Spinner = Spinner
ObstacleLevel3.Limbo = Limbo
ObstacleLevel3.SlidingWall = SlidingWall

export default ObstacleLevel3
