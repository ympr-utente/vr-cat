import create from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useGame = create(
    subscribeWithSelector((set) => ({
        countdown: 60,
        phase: 'ready',
        bonusVisible: null,
        gameStarted: false,
        catPosition: { x: 0, y: 0, z: 0 },
        fishes: [
            { position: [0, 2, -25], id: 1 },
            { position: [0, 2, -45], id: 2 },
            { position: [0, 2, -55], id: 3 }
        ],
        checkpoint: null,
        notification: null,
        start: () =>
            set((state) => {
                if (state.phase === 'ready' || state.phase === 'ended') {
                    return { phase: 'playing', gameStarted: true };
                }
                return {};
            }),
        restart: () =>
            set(() => ({
                countdown: 60,
                phase: 'ready',
                bonusVisible: null,
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
                    const newCountdown = state.countdown - 1;
                    if (newCountdown <= 0) {
                        return { phase: 'ready', countdown: 60 };
                    }
                    return { countdown: newCountdown };
                }
                return {};
            }),
        addTime: () =>
            set((state) => {
                if (state.phase === 'playing') {
                    const newCountdown = state.countdown + 5;
                    return { countdown: newCountdown, bonusVisible: { type: 'add' } };
                }
                return {};
            }),
        subtractTime: () =>
            set((state) => {
                if (state.phase === 'playing') {
                    const newCountdown = state.countdown - 5;
                    return { countdown: newCountdown, bonusVisible: { type: 'subtract' } };
                }
                return {};
            }),
        resetBonusVisible: () =>
            set(() => ({
                bonusVisible: null
            })),
        updateCatPosition: (position) =>
            set(() => ({
                catPosition: position
            })),
        setNotification: (message) => {
            set(() => ({
                notification: message
            }));
            setTimeout(() => {
                set(() => ({
                    notification: null
                }));
            }, 3000); // Desaparece después de 3 segundos
        },
        clearNotification: () =>
            set(() => ({
                notification: null
            })),
        saveCheckpoint: (catPosition, countdown, fishes) =>
            set(() => ({
                checkpoint: { catPosition, countdown, fishes },
                notification: 'Checkpoint saved!'
            })),
        loadCheckpoint: () =>
            set((state) => {
                if (state.checkpoint) {
                    const { catPosition, countdown, fishes } = state.checkpoint;
                    return {
                        catPosition,
                        countdown,
                        fishes,
                        phase: 'ready',
                        gameStarted: false,
                        notification: 'Checkpoint loaded!'
                    };
                }
                return {};
            })
    }))
);

export { useGame };

