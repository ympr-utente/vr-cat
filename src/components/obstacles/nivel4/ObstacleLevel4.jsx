import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useAudio } from '../../../stores/useAudio';

const Obstacle = forwardRef(function Obstacle({ color: defaultColor = '#A876F5', ...props }, ref) {
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
            type="kinematicPosition"
            restitution={2}
            friction={1}
            colliders="cuboid"
            onContactForce={onHit}
            {...props}
        >
            <mesh receiveShadow castShadow>
                <boxGeometry args={[10, 1, 1]} />
                <meshStandardMaterial color={defaultColor} />
            </mesh>
        </RigidBody>
    );
});

const PulsingObstacle = function ({ speed = 1, color, ...props }) {
    const obstacleRef = useRef();
    const scale = useRef(new THREE.Vector3(1, 1, 1));

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            const pulse = (Math.sin(time * speed) + 1.5) / 2;
            scale.current.set(pulse, pulse, pulse);
            if (obstacleRef.current.scale) {
                obstacleRef.current.scale.set(scale.current.x, scale.current.y, scale.current.z);
            }
        }
    });

    return <Obstacle ref={obstacleRef} color={color} {...props} />;
};

const FloatingObstacle = function ({ speed = 1, amplitude = 2, color, position, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            const newY = position[1] + Math.sin(time * speed) * amplitude;
            obstacleRef.current.setNextKinematicTranslation({
                x: position[0],
                y: newY,
                z: position[2]
            });
        }
    });

    return <Obstacle ref={obstacleRef} color={color} {...props} />;
};

const RotatingWall = function ({ speed = 1, color, position, ...props }) {
    const obstacleRef = useRef();
    const rotation = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(0, 0, time * speed));
            obstacleRef.current.setNextKinematicRotation(rotation.current);
            obstacleRef.current.setNextKinematicTranslation({
                x: position[0],
                y: position[1],
                z: position[2]
            });
        }
    });

    return <Obstacle ref={obstacleRef} color={color} scale-y={5} {...props} />;
};

const Pendulum = function ({ speed = 1, length = 10, color, position, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            const angle = Math.sin(time * speed) * Math.PI / 4;
            const newX = position[0] + length * Math.sin(angle);
            const newY = position[1] - length * Math.cos(angle);
            obstacleRef.current.setNextKinematicTranslation({
                x: newX,
                y: newY,
                z: position[2]
            });
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <cylinderGeometry args={[1, 1, length * 2, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const OscillatingWall = function ({ speed = 1, amplitude = 5, color, position, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const newY = position[1] + Math.sin(time * speed) * amplitude;

        if (obstacleRef.current) {
            obstacleRef.current.setNextKinematicTranslation({
                x: position[0],
                y: newY,
                z: position[2]
            });
        }
    });

    return <Obstacle ref={obstacleRef} color={color} {...props} />;
};

const RotatingCube = function ({ speed = 1, color, position, ...props }) {
    const obstacleRef = useRef();
    const rotation = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(time * speed, time * speed, time * speed));
            obstacleRef.current.setNextKinematicRotation(rotation.current);
            obstacleRef.current.setNextKinematicTranslation({
                x: position[0],
                y: position[1],
                z: position[2]
            });
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const SwingingSphere = function ({ speed = 1, amplitude = 5, color, position, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const newX = position[0] + Math.sin(time * speed) * amplitude;

        if (obstacleRef.current) {
            obstacleRef.current.setNextKinematicTranslation({
                x: newX,
                y: position[1],
                z: position[2]
            });
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <sphereGeometry args={[2, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const CircularMotionPrism = function ({ speed = 1, radius = 5, color, position, ...props }) {
    const obstacleRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const newX = position[0] + Math.cos(time * speed) * radius;
        const newZ = position[2] + Math.sin(time * speed) * radius;

        if (obstacleRef.current) {
            obstacleRef.current.setNextKinematicTranslation({
                x: newX,
                y: position[1],
                z: newZ
            });
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[2, 2, 6]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const CombinedObstacle = function ({ speed = 1, color, ...props }) {
    const obstacleRef = useRef();
    const rotation = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(time * speed, time * speed, 0));
            obstacleRef.current.setNextKinematicRotation(rotation.current);
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[3, 0, 0]} receiveShadow castShadow>
                <sphereGeometry args={[1.5, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const SpinningObstacle = function ({ speed = 1, color, ...props }) {
    const obstacleRef = useRef();
    const rotation = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(0, time * speed, time * speed));
            obstacleRef.current.setNextKinematicRotation(rotation.current);
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <cylinderGeometry args={[1, 1, 5, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, 2, 0]} receiveShadow castShadow>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

const TwistedObstacle = function ({ speed = 1, color, ...props }) {
    const obstacleRef = useRef();
    const twist = useRef(new THREE.Quaternion());

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();

        if (obstacleRef.current) {
            twist.current.setFromEuler(new THREE.Euler(0, time * speed, Math.sin(time * speed)));
            obstacleRef.current.setNextKinematicRotation(twist.current);
        }
    });

    return (
        <Obstacle ref={obstacleRef} color={color} {...props}>
            <mesh receiveShadow castShadow>
                <coneGeometry args={[2, 4, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>
            <mesh position={[0, -3, 0]} receiveShadow castShadow>
                <torusGeometry args={[1, 0.5, 16, 100]} />
                <meshStandardMaterial color={color} />
            </mesh>
        </Obstacle>
    );
};

Obstacle.PulsingObstacle = PulsingObstacle;
Obstacle.FloatingObstacle = FloatingObstacle;
Obstacle.RotatingWall = RotatingWall;
Obstacle.Pendulum = Pendulum;
Obstacle.OscillatingWall = OscillatingWall;
Obstacle.RotatingCube = RotatingCube;
Obstacle.SwingingSphere = SwingingSphere;
Obstacle.CircularMotionPrism = CircularMotionPrism;
Obstacle.CombinedObstacle = CombinedObstacle;
Obstacle.SpinningObstacle = SpinningObstacle;
Obstacle.TwistedObstacle = TwistedObstacle;

export default Obstacle;
