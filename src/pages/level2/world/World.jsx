import { Environment, KeyboardControls } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import Ecctrl, { EcctrlAnimation } from 'ecctrl'
import { useEffect, useMemo, useRef, useState } from 'react'
import CatModel from '../../../components/characters/CatModel'
import { RotatingObstacle, MovingObstacle, GrowingObstacle } from '../../../components/obstacles/nivel2/Animaciones'
import Castillo from '../../../components/obstacles/nivel2/Castillo'
import { Fish } from '../../../components/rewards/Fish'
import { useGame } from '../../../stores/useGame'
import Floor from '../floor/Floor'
import Trophy from '../trophy/Trophy'

export default function World() {
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

    const catRef = useRef(); // Referencia para el modelo del gato

    const successSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/+5.mp3')
        sound.volume = 0.2
        return sound
    }, [])

    const onEatFish = (id) => {
        setScore(score + 1);
        useGame.setState((state) => ({
            fishes: state.fishes.filter((fish) => fish.id !== id)
        }));
        useGame.getState().addTime(); // Añadir 5 segundos al temporizador
        successSound.play(); // Reproducir sonido de "+5"
    }

    // Resetear la visibilidad del "+5" después de 1 segundo
    useEffect(() => {
        if (bonusVisible) {
            const timer = setTimeout(() => {
                resetBonusVisible();
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [bonusVisible, resetBonusVisible]);

    // Resetear la posición del gato cuando se reinicia el juego
    useEffect(() => {
        if (catRef.current) {
            catRef.current.position.set(catPosition.x, catPosition.y, catPosition.z); // Restablecer la posición inicial del gato
        }
    }, [gameStarted, catPosition]);

    return (
        <>
            <Environment
                files={"./assets/hdris/belfast_sunset_puresky_4k.hdr"}
                background = {true}
                ground={{height: 20, scale: 512, radius: 400}}
            />
            <KeyboardControls map={keyboardMap}>
                <Ecctrl animated={true}
                    camInitDis={-8}
                    camMaxDis={-8}
                    maxVelLimit={gameStarted ? 5 : 0} // Deshabilitar el movimiento si el juego no ha comenzado
                    jumpVel={gameStarted ? 6 : 0} // Deshabilitar el salto si el juego no ha comenzado
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
                    <Fish 
                        position={fish.position}
                    />
                </RigidBody>
            ))}
            <Floor scale-y={5} position-z={-45} />
            <RotatingObstacle position={[10, 5, -15]} speed={2} />
            <RigidBody type="fixed" colliders={'trimesh'} position={[0, 0, -20]}>
                <Castillo />
            </RigidBody>
            <MovingObstacle position={[3, 2, -30]} speed={1.5} amplitude={3} />
            <GrowingObstacle position={[-5, 1, -4]} speed={1} maxScale={2} />
            <Trophy position-z={-45} position-y={1}/>
        </>
    )
}
