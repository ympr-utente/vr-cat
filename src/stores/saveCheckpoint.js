// src/stores/saveCheckpoint.js
import { get, ref, set } from "firebase/database";
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

const loadCheckpoint = async (uid) => {
    if (!uid) {
        console.error("No user logged in");
        return null;
    }

    const checkpointRef = ref(database, `checkpoints/${uid}/latest`);
    try {
        const snapshot = await get(checkpointRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No checkpoint found");
            return null;
        }
    } catch (error) {
        console.error("Error loading checkpoint:", error);
        return null;
    }
};

export { loadCheckpoint, saveCheckpoint };

