import { Environment, KeyboardControls } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Ecctrl, { EcctrlAnimation } from 'ecctrl';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import CatModel from '../../../components/characters/CatModel';
import Obstacle from '../../../components/obstacles/nivel4/ObstacleLevel4';
import { Fish } from '../../../components/rewards/Fish';
import { useAuth } from '../../../context/AuthContext';
import { loadCheckpoint } from '../../../stores/loadCheckpoint';
import { saveCheckpoint } from '../../../stores/saveCheckpoint';
import { useGame } from '../../../stores/useGame';
import { Carreta } from '../carreta/Carreta';
import Floor from '../floor/Floor';
import { Lampara } from '../lamparas/Lampara';
import Trophy from '../trophy/Trophy';
import Villano3 from '../villano3/Villano3';

export default function World() {
    const { user } = useAuth();
    const characterURL = "./assets/character/threedy-realease.glb";

    const navigate = useNavigate()

    const nextLevel = () => {
        navigate('/level4')
    }

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
                files="./assets/hdris/castle_zavelstein_cellar_4k.hdr"
                background={true}
                ground={{
                    height: 50,
                    scale: 512,
                    radius: 400
                }}
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
                position={[0, 2, -49]}
            >
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="yellow" />
                </mesh>
            </RigidBody>

            <Floor scale-y={5} position-z={-45} />
         
            
           
           
         
            
            
            <Trophy onCollide={nextLevel} position-z={-45} position-y={1} />
            <Lampara position-z={-8} position-y={1} position-x={0} scale={1} />
            <Lampara position-z={-10} position-y={1}position-x={-17.5} scale={1} />
            <Carreta position-z={-60} position-x={8}position-y={1} scale={0.9} rotation-y={2}/>
            <Carreta position-z={-40} position-x={-7} position-y={1}scale={0.9} rotation-y={2}/>
            <Villano3 position={[-0.5, 0.4, -42]} rotation-y={0} scale={3.5}/>
            
     
            
          
            <Obstacle.OscillatingWall position={[-2, 4, -45]} speed={3} amplitude={3} color="grey"scale={2}  />
            <Obstacle.Pendulum position={[-4, 8.5, -35]} speed={3} length={7} color="grey" scale={2} />
            <Obstacle.OscillatingWall position={[-2, 4, -55]} speed={3} amplitude={3} color="grey"scale={2}  />
            <Obstacle.Pendulum position={[-4, 8.5, -65]} speed={3} length={7} color="grey" scale={2} />
            <Obstacle.RotatingWall position={[4, 4, -10]} speed={1} color="gray"  />
            <Obstacle.RotatingWall position={[-4, 4, -10]} speed={1} color="gray"  />
            <Obstacle.CombinedObstacle position={[0, 4, -20]} speed={2} color="grey" />
            <Obstacle.SpinningObstacle position={[-5, 4, -25]} speed={2} color="grey" />
            <Obstacle.TwistedObstacle position={[8, 4, -30]} speed={2} color="grey" />
        </>
    );
}
