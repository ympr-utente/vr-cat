import { ref, set } from 'firebase/database';
import { database } from '../stores/firebase.config';

const saveCheckpointData = (catPosition, countdown, fishes) => {
    const checkpointRef = ref(database, 'checkpoints/' + Date.now());
    set(checkpointRef, {
        catPosition,
        countdown,
        fishes
    }).then(() => {
        console.log('Checkpoint data saved successfully.');
    }).catch((error) => {
        console.error('Error saving checkpoint data:', error);
    });
};

export { saveCheckpointData };
