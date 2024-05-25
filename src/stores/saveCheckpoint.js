// src/stores/saveCheckpoint.js
import { ref, set } from "firebase/database";
import { database } from "./firebase.config";

const saveCheckpoint = async (catPosition, countdown, fishes) => {
    const checkpointRef = ref(database, 'checkpoints/latest');
    try {
        await set(checkpointRef, {
            catPosition,
            countdown,
            fishes
        });
        console.log("Checkpoint saved successfully!");
    } catch (error) {
        console.error("Error saving checkpoint:", error);
    }
};

export { saveCheckpoint };
