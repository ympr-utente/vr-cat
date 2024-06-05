// src/stores/saveCheckpoint.js
import { ref, set } from "firebase/database";
import { database } from "./firebase.config";

const saveCheckpoint = async (uid, catPosition, countdown, fishes) => {
    if (!uid) {
        console.error("No user logged in");
        return;
    }

    const checkpointRef = ref(database, `checkpoints/${uid}/latest`);
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

