import { KeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation } from 'ecctrl';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import CatModel from '../../../components/characters/CatModel';
import Obstacle from '../../../components/obstacles/nivel4/ObstacleLevel4'; // Asegúrate de ajustar la ruta según sea necesario
import { Fish } from '../../../components/rewards/Fish';
import { useAuth } from '../../../context/AuthContext';
import { loadCheckpoint } from '../../../stores/loadCheckpoint';
import { saveCheckpoint } from '../../../stores/saveCheckpoint';
import { useGame } from '../../../stores/useGame';
import Boxer from '../Boxer/Boxer';
import Trophy from '../trophy/Trophy';

export default function World1() {
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
    const [fishPositions, setFishPositions] = useState([
        { id: 1, position: [2, 9, 16] },
        { id: 2, position: [60, 20, -6] },
        { id: 3, position: [80, 20, 12] },
    ]);

    const gameStarted = useGame((state) => state.gameStarted);
    const restartGame = useGame((state) => state.restart);
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
        setFishPositions((prev) => prev.filter((fish) => fish.id !== id));
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
                        <CatModel ref={catRef} scale={[0.4, 0.4, 0.4]} />
                    </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>

            {fishPositions.map((fish) => (
                <RigidBody scale={0.3} key={fish.id} type='fixed' colliders={"hull"} onCollisionEnter={() => onEatFish(fish.id)}>
                    <Fish position={fish.position} />
                </RigidBody>
            ))}

            <RigidBody
                scale={0.7}
                type="fixed"
                colliders={"hull"}
                onCollisionEnter={onContactYellowSquare}
                position={[0, 2, -49]}
            >
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </RigidBody>

            <Boxer position={[-0.5, 2.15, -42]} rotation-y={0} scale={35} />
            <Trophy position={[29, 1, 8]} rotation={[2, 12, 5]} /> {/* Rotación ajustada a 45 grados en el eje Y */}
            <Obstacle.RotatingCube position={[27 , 2, 3]} speed={1} color="#9400D3" />
            <Obstacle.SwingingSphere position={[30, 2, -21      ]} speed={1} amplitude={2} size={5} color="#FFA500" /> {/* Tamaño incrementado */}
                       <Obstacle.CircularMotionPrism position={[8, 1, 0]} speed={1} radius={3} color="#008080" />
            <Obstacle.OscillatingWall position={[15  , 2, -2]} speed={1} amplitude={5} color="#FF4500" />
            <Obstacle.Pendulum position={[20 , 11, -13]} speed={1.5} length={10} color="#DAA520" />
            <Obstacle.RotatingWall position={[28, 2, -10]} speed={0.5} color="#4682B4" />

        </>
    );
}
