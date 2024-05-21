import { Environment, KeyboardControls } from '@react-three/drei'
import CatModel from '../../../components/characters/CatModel'
import Floor from '../floor/Floor'
import Obstacle from '../../../components/obstacles/Obstacle'
import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { Fish } from '../../../components/rewards/Fish';
import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';
import Trophy from '../trophy/Trophy'
import { useGame} from '../../../stores/useGame'

export default function World() {

    const characterURL = "./assets/character/threedy-realease.glb";
  
    const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
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
    //action3: "BreakDanceALoPro",
    };

    const [score, setScore] = useState(0);

    const [fishes, setFishes] = useState([
        {position: [0,2,-25], id: 1},
        {position: [0,2,-45], id: 2},
        {position: [0,2,-55], id: 3}
    ]);

    const onEatFish = (id) => {
        setScore(score + 1);
        setFishes(fishes.filter((fish) => fish.id !== id))
    }

    return (
        <>
            <Environment
            files = './assets/hdris/satara_night_no_lamps_4k.hdr'
            background = {true}
            ground={{height: 20, scale: 512, radius: 400}}
            />
                <KeyboardControls map={keyboardMap}>
                    <Ecctrl animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={5}
                    jumpVel={6}
                    position={[0, 40, 0]}
                    >
                        <EcctrlAnimation
                        characterURL={characterURL}
                        animationSet={animationSet}
                        >
                        <CatModel/>
                        </EcctrlAnimation>
                    </Ecctrl>
                </KeyboardControls>
             
             {fishes.map((fish) => (
                <RigidBody scale={0.7} key={fish.id} type='fixed' colliders={"hull"} onCollisionEnter={() => onEatFish(fish.id)}>
                <Fish 
                    position={fish.position}
                />
                </RigidBody>
             ))}
            

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
            <Trophy position-z={-45} position-y={1}/>
        </>
    )
}
