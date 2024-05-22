import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useGame = create(
    subscribeWithSelector((set) => ({
        countdown: 60, 
        phase: 'ready',
        bonusVisible: false,
        gameStarted: false, 
        catPosition: { x: 0, y: 0, z: 0 }, 
        fishes: [
            { position: [0, 2, -25], id: 1 },
            { position: [0, 2, -45], id: 2 },
            { position: [0, 2, -55], id: 3 }
        ], // Estado inicial de los peces
        start: () =>
            set((state) => {
                if (state.phase === 'ready' || state.phase === 'ended') {
                    return { phase: 'playing', gameStarted: true }
                }
                return {}
            }),
        restart: () =>
            set(() => ({
                countdown: 60, 
                phase: 'ready',
                bonusVisible: false,
                gameStarted: false,
                catPosition: { x: 0, y: 0, z: 0 }, 
                fishes: [
                    { position: [0, 2, -25], id: 1 },
                    { position: [0, 2, -45], id: 2 },
                    { position: [0, 2, -55], id: 3 }
                ] 
            })),
        tick: () =>
            set((state) => {
                if (state.phase === 'playing') {
                    const newCountdown = state.countdown - 1
                    if (newCountdown <= 0) {
                        return { phase: 'ready', countdown: 60 }
                    }
                    return { countdown: newCountdown }
                }
                return {}
            }),
        addTime: () =>
            set((state) => {
                if (state.phase === 'playing') {
                    const newCountdown = state.countdown + 5
                    return { countdown: newCountdown, bonusVisible: true }
                }
                return {}
            }),
        updateCatPosition: (position) =>
            set(() => ({
                catPosition: position
            })),
    }))
)

export { useGame };

