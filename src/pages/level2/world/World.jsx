import { Environment, KeyboardControls } from '@react-three/drei'
import {RigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import CatModel from '../../../components/characters/CatModel'
import Obstacle from '../../../components/obstacles/Obstacle'
import Castillo from '../../../components/obstacles/nivel2/Castillo'
import { Fish } from '../../../components/rewards/Fish'
import { useAuth } from '../../../context/AuthContext';
import { loadCheckpoint } from '../../../stores/loadCheckpoint';
import { saveCheckpoint } from '../../../stores/saveCheckpoint';
import Boxer from '../Boxer/Boxer';
import { useGame } from '../../../stores/useGame'
import Spinner from '../../../components/obstacles/Spinner'
import Pendulum from '../../../components/obstacles/Pendulum'
import Floor from '../floor/Floor'
import Trophy from '../trophy/Trophy'
import { Physics } from '@react-three/cannon';
import { Suspense } from 'react';

export default function World() {
    const { user } = useAuth();
    const characterURL = "./assets/character/threedy-realease.glb";

    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },
        { name: "action1", keys: ["1"] },
        { name: "action2", keys: ["2"] },
        { name: "action3", keys: ["3"] },
        { name: "action4", keys: ["KeyF"] },
        { name: "loadCheckpoint", keys: ["g", "G"] }
    ];

    const animationSet = {
        idle: "Listisimo",
        walk: "CaminarConEstilacho",
        run: "CorriendoALoMazeRunner",
        jump: "SaltadorIntrepido",
        jumpIdle: "AterrizandoConParkour",
        jumpLand: "AterrizandoConParkour",
        fall: "Paracaidista",
        action1: "Izquierdazo",
        action2: "Derechazo",
        action3: "PatadaVoladora",
    };

    const [score, setScore] = useState(0);

    const gameStarted = useGame((state) => state.gameStarted);
    const restartGame = useGame((state) => state.restart);
    const fishes = useGame((state) => state.fishes);
    const updateCatPosition = useGame((state) => state.updateCatPosition);
    const catPosition = useGame((state) => state.catPosition);
    const resetBonusVisible = useGame((state) => state.resetBonusVisible);
    const bonusVisible = useGame((state) => state.bonusVisible);
    const setNotification = useGame((state) => state.setNotification);
    const saveCheckpointState = useGame((state) => state.saveCheckpoint);

    const catRef = useRef();

    const successSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/+5.mp3');
        sound.volume = 0.2;
        return sound;
    }, []);

    const onEatFish = (id) => {
        setScore(score + 1);
        useGame.setState((state) => ({
            fishes: state.fishes.filter((fish) => fish.id !== id)
        }));
        useGame.getState().addTime();
        successSound.play();
    };

    const onContactYellowSquare = async () => {
        if (catRef.current && user) {
            const catObject = catRef.current;
            const catPosition = new THREE.Vector3();
            catObject.getWorldPosition(catPosition);

            const catPos = { x: catPosition.x, y: catPosition.y, z: catPosition.z };
            const countdown = useGame.getState().countdown;
            const fishes = useGame.getState().fishes;

            saveCheckpointState(catPos, countdown, fishes);
            setNotification('Checkpoint saved!');
            await saveCheckpoint(user.uid, catPos, countdown, fishes);
        } else {
            console.error("Cat ref is not defined or user is not logged in");
        }
    };

    const handleKeyDown = async (event) => {
        if (keyboardMap.find((key) => key.keys.includes(event.key))) {
            switch (event.key) {
                case 'g':
                case 'G':
                    if (user) {
                        console.log("Loading checkpoint for user:", user.uid);
                        await loadCheckpoint(user.uid);
                    } else {
                        console.error("No user logged in");
                    }
                    break;
                // Handle other key events if necessary
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [user]);

    useEffect(() => {
        if (bonusVisible) {
            const timer = setTimeout(() => {
                resetBonusVisible();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [bonusVisible, resetBonusVisible]);

    useEffect(() => {
        if (catRef.current) {
            catRef.current.position.set(catPosition.x, catPosition.y, catPosition.z);
        }
    }, [gameStarted, catPosition]);

    return (
        <>
            <Environment
                files={"./assets/hdris/belfast_sunset_puresky_4k.hdr"}
                background={true}
                ground={{ height: 20, scale: 512, radius: 400 }}
            />
            <KeyboardControls map={keyboardMap}>
                <Ecctrl animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={gameStarted ? 5 : 0}
                    jumpVel={gameStarted ? 6 : 0}
                    position={[0, 40, 0]}
                >
                    <EcctrlAnimation
                        characterURL={characterURL}
                        animationSet={animationSet}
                    >
                        <CatModel ref={catRef} />
                    </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>

            {fishes.map((fish) => (
                <RigidBody scale={0.7} key={fish.id} type='fixed' colliders={"hull"} onCollisionEnter={() => onEatFish(fish.id)}>
                    <Fish position={fish.position} />
                </RigidBody>
            ))}

            <RigidBody
                scale={0.7}
                type="fixed"
                colliders={"hull"}
                onCollisionEnter={onContactYellowSquare}
                position={[0, 2, -55]}
            >
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </RigidBody>

            <Floor scale-y={5} position-z={-45} />

            <Spinner position={[-8, 4, -26]} speed={8}/>
            <Spinner position={[8, 4, -16]} speed={4} initialShift={1}/>
        ``  <Physics>
            <Suspense fallback={null}>
                <Pendulum position={[0, 5, -45]} impulse={[10, 20, 20]} />
            </Suspense>
            </Physics>``

            <Obstacle color='white' position-z={-4} />
            <Obstacle.SlidingWall color='white' position-z={-45} />
            <Obstacle.Spinner color='white' position-z={-32} speed={5} />
            <Obstacle.Spinner color='white' position-z={-52} speed={5} position-x={6} scale-x={0.75} />
            <Obstacle.Spinner color='white' position-z={-52} speed={5} position-x={-6} scale-x={0.75} invert />
            
            <Boxer position={[-0.5, 2.15, -37.6]} rotation-y={0} scale={35} />
            <Trophy position-z={-45} position-y={1} />
        </>
    );
}
