// src/stores/loadCheckpoint.js
import { get, ref } from "firebase/database";
import { database } from "./firebase.config";
import { useGame } from "./useGame";

const loadCheckpoint = async () => {
    const checkpointRef = ref(database, 'checkpoints/latest');
    try {
        const snapshot = await get(checkpointRef);
        if (snapshot.exists()) {
            const checkpoint = snapshot.val();
            useGame.setState((state) => ({
                catPosition: checkpoint.catPosition || { x: 0, y: 0, z: 0 },
                countdown: checkpoint.countdown || 60,
                fishes: checkpoint.fishes || [],
                phase: 'ready',
                gameStarted: false,
                notification: 'Checkpoint loaded!'
            }));
            console.log("Checkpoint loaded:", checkpoint);
        } else {
            console.log("No checkpoint found");
        }
    } catch (error) {
        console.error("Error loading checkpoint:", error);
    }
};

export { loadCheckpoint };