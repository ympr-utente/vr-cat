import { useKeyboardControls } from '@react-three/drei'
// import { addEffect } from '@react-three/fiber'
import { useState, useEffect, useRef } from 'react'
import UseAnimations from 'react-useanimations'
import volume from 'react-useanimations/lib/volume'
import { useAudio } from './stores/useAudio'
import { useGame } from './stores/useGame'

function Interface() {
    const timerRef = useRef()
    const [countdown, setCountdown] = useState(60); // Estado local para el temporizador
    const audio = useAudio((state) => state.audio)
    const toggleAudio = useAudio((state) => state.toggleAudio)

    const gamePhase = useGame((state) => state.phase)
    const startGame = useGame((state) => state.start)
    const restartGame = useGame((state) => state.restart)

    const controls = useKeyboardControls((state) => state)

       // Manejar el temporizador
       useEffect(() => {
        let intervalId;

        if (gamePhase === 'playing') {
            intervalId = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 0) {
                        return prevCountdown - 1;
                    } else {
                        clearInterval(intervalId); // Detener el temporizador cuando llegue a cero
                        restartGame(); // Reiniciar el juego
                        return 60; // Reiniciar el temporizador
                    }
                });
            }, 1000);
        } else {
            clearInterval(intervalId); // Limpiar el intervalo si el juego no está en fase de juego
            setCountdown(60); // Reiniciar el temporizador cuando el juego no está en curso
        }

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [gamePhase, restartGame]);

    function handleToggleAudio(e) {
        toggleAudio()
        e.target.blur()
    }


    return (
        <div className="interface">
            <div className="time">
                <h2>{countdown}</h2>
            </div>

            <button className="audio-toggle" onClick={handleToggleAudio}>
                <UseAnimations animation={volume} reverse={!audio} strokeColor="white" />
            </button>

            {gamePhase === 'ready' && (
                <h2 className="cta" onClick={startGame}>
                Play
                </h2>
            )}

            {gamePhase === 'ended' && (
                <h2 className="cta" onClick={restartGame}>
                    Empezar de nuevo
                </h2>
            )}

            <div className="controls">
                <div className="raw">
                    <div className={`key ${controls.forward ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key ${controls.left ? 'active' : ''}`}></div>
                    <div className={`key ${controls.backward ? 'active' : ''}`}></div>
                    <div className={`key ${controls.right ? 'active' : ''}`}></div>
                </div>
                <div className="raw">
                    <div className={`key large ${controls.jump ? 'active' : ''}`}></div>
                </div>
                <div className="misc-controls">
                    <div className="misc-control">

                        <div className={`key ${controls.restart? 'active' : ''}`}>R</div>
                        <div className="label">Empezar de nuevo</div>
                    </div>
                    <div className="misc-control">
                        <div className={`key ${controls.audio ? 'active' : ''}`}>M</div>
                        <div className="label">Activar/Desactivar sonido</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Interface }

