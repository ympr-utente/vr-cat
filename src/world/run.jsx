import { useEffect, useState } from "react";

function RunSoundComponent() {
    const [runSound, setRunSound] = useState(null);
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setRunSound(new Audio("/assets/sounds/run.wav"));
    }, []);

    useEffect(() => {
        if (play && runSound) {
            runSound.currentTime = 0;
            runSound.volume = Math.random();
            runSound.play().catch((error) => {
                console.error("Error al reproducir el sonido:", error);
            });
        }
    }, [play, runSound]);

    return (
        <button onClick={() => setPlay(true)}>Play Sound</button>
    );
}

export default RunSoundComponent;