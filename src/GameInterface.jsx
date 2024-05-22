import { useKeyboardControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import UseAnimations from 'react-useanimations'
import volume from 'react-useanimations/lib/volume'
import { useAudio } from './stores/useAudio'
import { useGame } from './stores/useGame'

function GameInterface() {
    const timerRef = useRef()
    const [bonusVisible, setBonusVisible] = useState(false); 
    const audio = useAudio((state) => state.audio)
    const toggleAudio = useAudio((state) => state.toggleAudio)

    const gamePhase = useGame((state) => state.phase)
    const countdown = useGame((state) => state.countdown)
    const startGame = useGame((state) => state.start)
    const restartGame = useGame((state) => state.restart)
    const gameStarted = useGame((state) => state.gameStarted); 
    const controls = useKeyboardControls((state) => state)

    useEffect(() => {
        let intervalId;

        if (gamePhase === 'playing') {
            intervalId = setInterval(() => {
                useGame.getState().tick();
            }, 1000);
        } else {
            clearInterval(intervalId); 
        }

        return () => clearInterval(intervalId);
    }, [gamePhase]);

    function handleToggleAudio(e) {
        toggleAudio()
        e.target.blur()
    }

 
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'r' || event.key === 'R') {
                window.location.reload(); 
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

  
    useEffect(() => {
        if (bonusVisible) {
            const timer = setTimeout(() => {
                setBonusVisible(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [bonusVisible]);

    useEffect(() => {
        const unsubscribe = useGame.subscribe(
            (state) => state.bonusVisible,
            (visible) => {
                setBonusVisible(visible);
            }
        );
        return () => unsubscribe();
    }, []);

    return (
        <div className="interface">
            <div className="time">
                <h2>{countdown}</h2>
                {bonusVisible && <span className="bonus">+5</span>}
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
                
                <div className="raw">
                    <div className="misc-controls" style={{ right: 'auto', left: '40px' }}>
                        <div className="key shift">Shift</div>
                        <div className="misc-control">
                            <div className="key">1</div>
                        </div>
                        <div className="misc-control">
                            <div className="key">2</div>
                        </div>
                        <div className="misc-control">
                            <div className="key">3</div>
                        </div>
                    </div>
                </div>
                
                <div className="raw">
                    <div className="misc-controls">
                        <div className={`misc-control ${controls.restart ? 'active' : ''}`} onClick={() => window.location.reload()}>
                            <div className="key">R</div>
                            <div className="label">Resetear</div>
                        </div>
                        <div className={`misc-control ${controls.audio ? 'active' : ''}`} onClick={() => handleToggleAudio()}>
                            <div className="key">M</div>
                            <div className="label">Mutear</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { GameInterface }

