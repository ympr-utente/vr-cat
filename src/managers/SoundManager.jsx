import { useEffect, useMemo } from 'react'
import { useAudio } from '../stores/useAudio'
import { useGame } from '../stores/useGame'

function SoundManager() {
    const audio = useAudio((state) => state.audio)
    const gamePhase = useGame((state) => state.phase)
    const bonusVisible = useGame((state) => state.bonusVisible)

    const successSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/success.mp3')
        sound.volume = 0.2
        return sound
    }, [])
    const backgroundSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/background.mp3')
        sound.loop = true
        return sound
    }, [])
    const bonusSound = useMemo(() => {
        const sound = new Audio('./assets/sounds/+5.mp3')
        sound.volume = 0.2
        return sound
    }, [])

    useEffect(() => {
        if (gamePhase === 'ready') {
            backgroundSound.volume = 0.05
        }
        if (gamePhase === 'playing') {
            backgroundSound.volume = 0.05
            backgroundSound.play()
        }
        if (gamePhase === 'ended') {
            backgroundSound.volume = 0.2
            successSound.currentTime = 0
            successSound.play()
        }
    }, [gamePhase])

    useEffect(() => {
        backgroundSound.muted = !audio
        successSound.muted = !audio
        bonusSound.muted = !audio
    }, [audio])

    useEffect(() => {
        if (bonusVisible) {
            bonusSound.currentTime = 0
            bonusSound.play()
        }
    }, [bonusVisible])

    return null
}

export { SoundManager }

