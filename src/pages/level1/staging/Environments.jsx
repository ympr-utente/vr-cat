import { Environment, KeyboardControls } from '@react-three/drei'
import { CatModel } from '../characters/CatModel'
import Floor from '../world/Floor'
import Obstacle from '../obstacles/Obstacle'
import Ecctrl from "ecctrl";
import { Fish } from '../rewards/Fish';
import { RigidBody } from '@react-three/rapier';
import { useState } from 'react';

export default function Level() {

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

    const [score, setScore] = useState(0);

    const [fishes, setFishes] = useState([
        { position: [0, 2, -25], id: 1 },
        { position: [0, 2, -45], id: 2 },
        { position: [0, 2, -55], id: 3 }
    ]);

    const onEatFish = (id) => {
        setScore(score + 1);
        setFishes(fishes.filter((fish) => fish.id !== id))
    }

    return (
        <>
            <Environment
                files='./assets/geometries/hdris/satara_night_no_lamps_4k.hdr'
                background={true}
                ground={{ height: 20, scale: 512, radius: 400 }}
            />
            <KeyboardControls map={keyboardMap} capsuleHalfHeight={1} capsuleRadius={0.9}>
                <Ecctrl>
                    <CatModel position-y={-1} />
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
        </>
    )
}
