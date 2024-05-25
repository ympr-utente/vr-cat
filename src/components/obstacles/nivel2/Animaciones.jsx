import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { forwardRef, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useAudio } from '../../../stores/useAudio';

const Obstacle = forwardRef(function Obstacle(props, ref) {
    const audio = useAudio((state) => state.audio);
    const hitSound = useMemo(() => new Audio('./assets/sounds/hit.mp3'), []);

    function onHit({ totalForceMagnitude }) {
        hitSound.currentTime = 0;
        hitSound.volume = Math.min(totalForceMagnitude / 10000, 1);
        hitSound.play();
    }

    useEffect(() => {
        hitSound.muted = !audio;
    }, [audio]);

    return (
        <RigidBody
            ref={ref}
            type="dynamic"
            mass={1}
            linearDamping={0.8}
            angularDamping={0.8}
            onContactForce={onHit}
            {...props}
        >
            <mesh receiveShadow castShadow>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#FF0000" />
            </mesh>
        </RigidBody>
    );
});

const RotatingObstacle = function ({ speed = 1, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            obstacleRef.current.setAngularVelocity({
                x: 0,
                y: speed,
                z: 0
            });
        }
    });

    return <Obstacle ref={obstacleRef} {...props} />;
};

export { RotatingObstacle };
