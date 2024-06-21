import React from 'react';
import './styles.css'; // Importa los estilos CSS
import { useGame } from './useGame';

const GameComponent = () => {
    const { notification, saveCheckpoint, loadCheckpoint } = useGame((state) => ({
        notification: state.notification,
        saveCheckpoint: state.saveCheckpoint,
        loadCheckpoint: state.loadCheckpoint
    }));

    return (
        <div className="interface">
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
            <button onClick={() => saveCheckpoint({ x: 1, y: 2, z: 3 }, 50, [{ position: [0, 2, -25], id: 1 }])}>
                Save Checkpoint
            </button>
            <button onClick={loadCheckpoint}>Load Checkpoint</button>
        </div>
    );
};

export default GameComponent;
