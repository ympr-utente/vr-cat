import { useFrame} from '@react-three/fiber'
import { RigidBody } from '@react-three/rapier'
import { forwardRef, useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useAudio } from '../../../stores/useAudio'

const Obstacle = forwardRef(function Obstacle(props, ref) {
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
        <RigidBody ref={ref} type="kinematicPosition" restitution={1} friction={0.8} onContactForce={onHit} {...props}>
            <mesh receiveShadow castShadow>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#FF0000" />
            </mesh>
        </RigidBody>
    )
})

const RotatingObstacle = function ({ speed = 1, ...props }) {
    const obstacleRef = useRef()
    const rotation = useRef(new THREE.Quaternion())

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()

        if (obstacleRef.current) {
            rotation.current.setFromEuler(new THREE.Euler(0, time * speed, 0))
            obstacleRef.current.setNextKinematicRotation(rotation.current)
        }
    })

    return <Obstacle ref={obstacleRef} {...props} />
}

const MovingObstacle = function ({ speed = 1, amplitude = 1, ...props }) {
    const obstacleRef = useRef()

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()

        if (obstacleRef.current) {
            const obstacleTranslation = obstacleRef.current.translation()
            obstacleRef.current.setNextKinematicTranslation({
                x: Math.sin(time * speed) * amplitude,
                y: obstacleTranslation.y,
                z: obstacleTranslation.z
            })
        }
    })

    return <Obstacle ref={obstacleRef} {...props} />
}

const GrowingObstacle = function ({ speed = 1, maxScale = 2, ...props }) {
    const obstacleRef = useRef()
    const scale = useRef(1)

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime()

        if (obstacleRef.current) {
            scale.current = Math.sin(time * speed) * 0.5 + 1
            obstacleRef.current.setNextKinematicScale({
                x: scale.current,
                y: scale.current,
                z: scale.current
            })
        }
    })

    return <Obstacle ref={obstacleRef} {...props} />
}

export { RotatingObstacle, MovingObstacle, GrowingObstacle }
