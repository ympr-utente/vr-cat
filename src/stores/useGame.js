import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { getLocalStorage, setLocalStorage } from './utils'

const useGame = create(
    subscribeWithSelector((set) => ({
        countdown: getLocalStorage('countdown') || 60, // Iniciar el temporizador en 60 segundos, o recuperar del almacenamiento local si está disponible
        phase: 'ready',
        start: () =>
            set((state) => {
                if (state.phase === 'ready' || state.phase === 'ended') {
                    return { phase: 'playing' }
                }
                return {}
            }),
        restart: () =>
            set(() => ({
                countdown: 60, // Reiniciar el temporizador a 60 segundos
                phase: 'ready'
            })),
        tick: () =>
            set((state) => {
                if (state.phase === 'playing') {
                    const newCountdown = state.countdown - 1
                    if (newCountdown <= 0) {
                        setLocalStorage('countdown', 60) // Reiniciar el temporizador al valor inicial si llega a cero
                        return { phase: 'ready', countdown: 60 }
                    }
                    setLocalStorage('countdown', newCountdown) // Actualizar el temporizador en el almacenamiento local
                    return { countdown: newCountdown }
                }
                return {}
            })
    }))
)

export { useGame }
