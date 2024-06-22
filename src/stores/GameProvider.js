import React from 'react';
import { useGame } from './useGame'

const GameProvider = ({ children }) => {
    return (
        <useGame.Provider>
            {children}
        </useGame.Provider>
    );
};

export { GameProvider };

