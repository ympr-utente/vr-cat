import { Environment, KeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation } from 'ecctrl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import * as THREE from 'three';
import CatModel from '../../../components/characters/CatModel';
import Spinner from '../../../components/obstacles/Spinner';
import ObstacleLevel3 from '../../../components/obstacles/nivel3/ObstacleLevel3';
import { Fish } from '../../../components/rewards/Fish';
import { useAuth } from '../../../context/AuthContext';
import { loadCheckpoint } from '../../../stores/loadCheckpoint';
import { saveCheckpoint } from '../../../stores/saveCheckpoint';
import { useGame } from '../../../stores/useGame';
import Arbol from '../Arbol/Arbol';
import Boxer from '../Boxer/Boxer';
import Casa from '../casa/Casa';
import Floor from '../floor/Floor';
import Trophy from '../trophy/Trophy';

import { Rope } from "./Rope.tsx";
import HangingThing from "./HangingThing.tsx";
import LetreroTrofeo from "./LetreroTrofeo"
import Obstacle from '../../../components/obstacles/Obstacle';
import { Confetti } from './Confetti'
import { useNavigate } from 'react-router-dom'
import CatModel2 from '../../../components/characters/CatModel2';

export default function World() {
    const { user } = useAuth();
    const characterURL = "./assets/character/threedy-realease.glb";
    const characterURL2 = "./assets/character/threedy-realease2.glb";


    // const keyboardMap = [
    //     { name: "forward", keys: ["ArrowUp", "KeyW"] },
    //     { name: "backward", keys: ["ArrowDown", "KeyS"] },
    //     { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    //     { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    //     { name: "jump", keys: ["Space"] },
    //     { name: "run", keys: ["Shift"] },
    //     { name: "action1", keys: ["1"] },
    //     { name: "action2", keys: ["2"] },
    //     { name: "action3", keys: ["3"] },
    //     { name: "action4", keys: ["KeyF"] },
    //     { name: "loadCheckpoint", keys: ["g", "G"] }
    // ];

    const navigate = useNavigate()

    const nextLevel = () => {
        navigate('/level1')
    }

    const [animationsPaused, setAnimationsPaused] = useState(false);

    const handleButtonPress = () => {
        setAnimationsPaused(true);
    };

    const handleButtonRelease = () => {
        setAnimationsPaused(false);
    };

    const handleButtonHover = () => {
        setAnimationsPaused(true);
    };

    const handleButtonHoverOut = () => {
        setAnimationsPaused(false);
    };


    const keyboardMap = [
        { name: "forward", keys: ["ArrowUp"] },
        { name: "backward", keys: ["ArrowDown"] },
        { name: "leftward", keys: ["ArrowLeft"] },
        { name: "rightward", keys: ["ArrowRight"] },
        { name: "jump", keys: ["Space"] },
        { name: "run", keys: ["Shift"] },
        { name: "action1", keys: ["1"] },
        { name: "action2", keys: ["2"] },
        { name: "action3", keys: ["3"] },
        { name: "action4", keys: ["KeyF"] },
        { name: "loadCheckpoint", keys: ["g", "G"] }
    ];
    
    const keyboardMap2 = [
        { name: "forward", keys: ["KeyW"] },
        { name: "backward", keys: ["KeyS"] },
        { name: "leftward", keys: ["KeyA"] },
        { name: "rightward", keys: ["KeyD"] },
        { name: "jump", keys: ["KeyJ"] },
        { name: "run", keys: ["KeyK"] },
        { name: "action1", keys: ["KeyU"] },
        { name: "action2", keys: ["KeyI"] },
        { name: "action3", keys: ["KeyO"] },
        { name: "action4", keys: ["KeyP"] },
        { name: "loadCheckpoint", keys: ["q", "Q"] }
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

    const animationSet2 = {
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
    const catRef2 = useRef();
    const socketRef = useRef();
    const otherPlayers = useRef({});
    const previousPosition = useRef(new THREE.Vector3());

    const successSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/+5.mp3');
        sound.volume = 0.2;
        return sound;
    }, []);

    useEffect(() => {
        socketRef.current = io("http://localhost:8080");

        socketRef.current.on("connect", () => {
            console.log("Connected to the server");
        });

        socketRef.current.on("disconnect", () => {
            console.log("Disconnected from the server");
        });

        socketRef.current.on("player-moving", (data) => {
            const { id, position } = data;
            if (!otherPlayers.current[id]) {
                otherPlayers.current[id] = new THREE.Object3D();
                // Create a new model for the other player if necessary
                // and add it to your scene here
            }
            otherPlayers.current[id].position.set(position.x, position.y, position.z);
        });

        return () => {
            socketRef.current.disconnect();
        };
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

    useEffect(() => {
        const handlePlayerMovement = () => {
            if (catRef.current) {
                const catObject = catRef.current;
                const currentPosition = new THREE.Vector3();
                catObject.getWorldPosition(currentPosition);

                if (!currentPosition.equals(previousPosition.current)) {
                    const transforms = {
                        position: { x: currentPosition.x, y: currentPosition.y, z: currentPosition.z },
                    };

                    socketRef.current.emit("player-moving", transforms);
                    previousPosition.current.copy(currentPosition);
                }
            }
        };

        const interval = setInterval(handlePlayerMovement, 100); // Check for movement every 100ms

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Environment
                files="./assets/hdris/shanghai_bund_4k.hdr"
                background={true}
                ground={{ height: 50, scale: 512, radius: 400 }}
            />
            <KeyboardControls map={keyboardMap}>
                <Ecctrl animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={gameStarted ? 5 : 0}
                    jumpVel={gameStarted ? 6 : 0}
                    position={[0, 40, 0]}
            followLight
            springK={2}
            dampingC={0.2}
            autoBalance={false}
                >
                    <EcctrlAnimation
                        characterURL={characterURL}
                        animationSet={animationSet}
                    >
                        <CatModel ref={catRef} />
                    </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>

            <KeyboardControls map={keyboardMap2}>
                <Ecctrl animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={gameStarted ? 5 : 0}
                    jumpVel={gameStarted ? 6 : 0}
                    position={[5, 40, 0]}
                >
                    <EcctrlAnimation
                        characterURL={characterURL2}
                        animationSet={animationSet2}
                    >
                        <CatModel2 ref={catRef2} />
                    </EcctrlAnimation>
                </Ecctrl>
            </KeyboardControls>


            {fishes.map((fish) => (
                <RigidBody scale={0.7} key={fish.id} type='fixed' colliders={"hull"} onCollisionEnter={() => onEatFish(fish.id)}>
                    <Fish position={fish.position} />
                </RigidBody>
            ))}

            <Floor scale-y={5} position-z={-45} />
{/*
            <Spinner position={[-2, 4, -12]} speed={2} />
            <Spinner position={[2, 4, -27]} speed={2} invert />
*/}
{/*

            <ObstacleLevel3.Spinner color='white' position-z={-50} position-x={6} speed={0.5} scale-x={0.6} />
            <Casa position-z={-40} position-x={-8} scale={0.9} />
            <Casa position-z={-60} position-x={8} scale={0.9} rotation-y={3} />
            <ObstacleLevel3.Limbo position-z={-57} initialShift={0.5} scale-x={1} position-x={-4.8} />
 */}

        <mesh
          position={[-2, 1, -2]}
          onClick={handleButtonPress}
          onPointerUp={handleButtonRelease}
          onPointerOver={handleButtonHover}
          onPointerOut={handleButtonHoverOut}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>

            <ObstacleLevel3.SlidingWall speed={8} initialShift={1} color='red' position-z={-6} paused={animationsPaused} />
            <ObstacleLevel3.SlidingWall speed={8} initialShift={3} color='red' position-z={-10} paused={animationsPaused} />
            <ObstacleLevel3.SlidingWall speed={8} initialShift={2} color='red' position-z={-14} paused={animationsPaused} />
            <ObstacleLevel3.SlidingWall speed={8} initialShift={4} color='red' position-z={-18} paused={animationsPaused} />


        <mesh
          position={[-6, 1, -23]}
          onClick={handleButtonPress}
          onPointerUp={handleButtonRelease}
          onPointerOver={handleButtonHover}
          onPointerOut={handleButtonHoverOut}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="red" />
        </mesh>

            <Obstacle color='#88E6FF' position-y={2} position-z={-79} />
            <Obstacle color='#88E6FF' position-y={4} position-z={-82} />
            <Obstacle color='#88E6FF' position-y={6} position-z={-85} />

            <Obstacle color='#88E6FF' position-y={3} position-z={-80} />
            <Obstacle color='#88E6FF' position-y={5} position-z={-83} />
            <Obstacle color='#88E6FF' position-y={7} position-z={-86} />
            
            <Boxer position={[-0.5, 2.15, -22]} rotation-y={0} scale={35} />
            <Arbol position-z={-30} position-x={0.7} scale={1} />
            <Arbol position-z={-30} position-x={-17.5} scale={1} />
            <Arbol position-z={-40} position-x={0.7} scale={1} />
            <Arbol position-z={-40} position-x={-17.5} scale={1} />

            <HangingThing position={[2, 5.5, -60]} />
            <HangingThing position={[5, 5.5, -60]} />
            <HangingThing position={[7, 5.5, -60]} />

            <HangingThing position={[-2, 5.5, -60]} />
            <HangingThing position={[-5, 5.5, -60]} />
            <HangingThing position={[-7, 5.5, -60]} />

            <LetreroTrofeo position={[7, 0.5, -40]} scale={1.8}/>
            <Rope length={20}/>
            <Trophy ponCollide={nextLevel} position-z={-42} position-y={4} />
            <group position-z={90}>
                <Confetti />
            </group> 
            </>
    );
} 