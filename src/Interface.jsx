import { useKeyboardControls} from '@react-three/drei'
// import { addEffect } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import UseAnimations from 'react-useanimations'
import volume from 'react-useanimations/lib/volume'
import { useAudio } from './stores/useAudio'
import { useGame } from './stores/useGame'

function Interface() {
    const timerRef = useRef()

    const audio = useAudio((state) => state.audio)
    const toggleAudio = useAudio((state) => state.toggleAudio)

    const highScore = useGame((state) => state.highScore)
    const gamePhase = useGame((state) => state.phase)
    const startGame = useGame((state) => state.start)
    const restartGame = useGame((state) => state.restart)

    const controls = useKeyboardControls((state) => state)

    function handleToggleAudio(e) {
        toggleAudio()
        e.target.blur()
    }

    return (
        <div className="interface">
            <button className="audio-toggle" onClick={handleToggleAudio}>
                <UseAnimations animation={volume} reverse={!audio} strokeColor="white" />
            </button>

            {gamePhase === 'ready' && (
                <h2 className="cta" onClick={startGame}>
                    Play
                </h2>
            )}
        </div>
    )
}

export { Interface }
