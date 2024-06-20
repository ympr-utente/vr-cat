import { Environment, KeyboardControls, OrbitControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation } from 'ecctrl';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import CatModel from '../../../components/characters/CatModel';
import Obstacle from '../../../components/obstacles/Obstacle';
import { Fish } from '../../../components/rewards/Fish';
import { useAuth } from '../../../context/AuthContext';
import { loadCheckpoint } from '../../../stores/loadCheckpoint';
import { saveCheckpoint } from '../../../stores/saveCheckpoint';
import { useGame } from '../../../stores/useGame';
import Floor from '../floor/Floor';
import Trophy from '../trophy/Trophy';
import { Villano1 } from '../villano1/Villano1';
import { useNavigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function World() {
    const { user } = useAuth();
    const characterURL = './assets/character/threedy-realease.glb';
    
    const navigate = useNavigate()

    const nextLevel = () => {
        navigate('/level2')
    }

    const keyboardMap = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'run', keys: ['Shift'] },
        { name: 'action1', keys: ['1'] },
        { name: 'action2', keys: ['2'] },
        { name: 'action3', keys: ['3'] },
        { name: 'action4', keys: ['KeyF'] },
    ];

    const animationSet = {
        idle: 'Listisimo',
        walk: 'CaminarConEstilacho',
        run: 'CorriendoALoMazeRunner',
        jump: 'SaltadorIntrepido',
        jumpIdle: 'AterrizandoConParkour',
        jumpLand: 'AterrizandoConParkour',
        fall: 'Paracaidista',
        action1: 'Izquierdazo',
        action2: 'Derechazo',
        action3: 'PatadaVoladora',
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

    const catRef = useRef(); // Referencia para el modelo del gato

    const successSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/+5.mp3');
        sound.volume = 0.2;
        return sound;
    }, []);

    const onEatFish = (id) => {
        setScore(score + 1);
        useGame.setState((state) => ({
            fishes: state.fishes.filter((fish) => fish.id !== id),
        }));
        useGame.getState().addTime(); // Añadir 5 segundos al temporizador
        successSound.play(); // Reproducir sonido de "+5"
    };

    const onContactYellowSquare = async () => {
        if (catRef.current && user) {
            const catObject = catRef.current;
            const catPosition = new THREE.Vector3();
            catObject.getWorldPosition(catPosition);

            console.log(`Cat Position when contacting yellow square:`, { x: catPosition.x, y: catPosition.y, z: catPosition.z });

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

    // Resetear la visibilidad del "+5" después de 1 segundo
    useEffect(() => {
        if (bonusVisible) {
            const timer = setTimeout(() => {
                resetBonusVisible();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [bonusVisible, resetBonusVisible]);

    // Resetear la posición del gato cuando se reinicia el juego o se carga el checkpoint
    useEffect(() => {
        if (catRef.current) {
            catRef.current.position.set(catPosition.x, catPosition.y, catPosition.z); // Restablecer la posición del gato
        }
    }, [catPosition]);

    // Cargar el checkpoint cuando se presiona 'G'
    useEffect(() => {
        const handleKeyPress = async (event) => {
            if (event.key === 'G' || event.key === 'g') {
                if (user) {
                    console.log("Loading checkpoint for user:", user.uid);
                    await loadCheckpoint(user.uid);
                } else {
                    console.error("No user logged in");
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [user]);

    return (
        <>
            <Environment
                files="./assets/hdris/satara_night_no_lamps_4k.hdr"
                background={true}
                ground={{ height: 20, scale: 512, radius: 400 }}
            />
            <KeyboardControls map={keyboardMap}>
                <Ecctrl
                    animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={gameStarted ? 5 : 0} // Deshabilitar el movimiento si el juego no ha comenzado
                    jumpVel={gameStarted ? 6 : 0} // Deshabilitar el salto si el juego no ha comenzado
                    position={[0, 40, 0]}
                >
                    <EcctrlAnimation characterURL={characterURL} animationSet={animationSet}>
                        <CatModel ref={catRef} />
                    </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>

            {fishes && fishes.map((fish) => (
                <RigidBody
                    scale={0.7}
                    key={fish.id}
                    type="fixed"
                    colliders={"hull"}
                    onCollisionEnter={() => onEatFish(fish.id)}
                >
                    <Fish position={fish.position} />
                </RigidBody>
            ))}

            {/* el coso del checkpoint */}
            <RigidBody
                scale={0.7}
                type="fixed"
                colliders={"hull"}
                onCollisionEnter={onContactYellowSquare}
                position={[0, 2, -35]} 
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </RigidBody>

            <Floor scale-y={5} position-z={-45} />
            <Obstacle.Spinner position-z={-10} />
            <Obstacle position-z={-20} />
            <Obstacle.Limbo position-z={-34} />
            <Obstacle.Limbo position-z={-38} initialShift={0.5} />
            <Obstacle.Limbo position-z={-42} initialShift={1} />
            <Obstacle.SlidingWall position-z={-45} />
            <Obstacle.Spinner position-z={-60} speed={5} />
            <Obstacle.Spinner position-z={-75} speed={5} position-x={4} scale-x={0.75} />
            <Obstacle.Spinner position-z={-75} speed={5} position-x={-4} scale-x={0.75} invert />
            <Villano1 position={[-0.5, 0.3, -45]} rotation-y={0} scale={4} />
            <Trophy onCollide={nextLevel} position-z={-45} position-y={1} />
        </>
    );
}
