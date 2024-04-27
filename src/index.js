
// import "./styles.css";
// import { createRoot } from "react-dom/client";
// import Experience from "./Experience";
// import { Canvas } from "@react-three/fiber";
// import { Loader } from "@react-three/drei";
// import Pane from "./layout/Pane";
// import { useEffect, useState } from "react";

// const root = createRoot(document.getElementById("root"));

// const App = () => {
//     const [audio] = useState(new Audio("/sounds/run.wav"));
//     const [isPlaying, setIsPlaying] = useState(false);

//     const handlePlay = () => {
//         audio.play();
//         setIsPlaying(true);
//     };

//     useEffect(() => {
//         return () => {
//             audio.pause();
//         };
//     }, [audio]);

//     return (
//         <>
//             {!isPlaying && <button onClick={handlePlay} style={{ fontSize: '20px', padding: '10px', borderRadius: '5px', backgroundColor: 'purple', color: 'white' }}>Play Music</button>}
//             <Canvas
//                 camera={
//                     {
//                         position: [0, 1.5, -90],
                        
//                     }
//                 }
//                 shadows={true}
//             >
//                 <Experience />
//             </Canvas>
//             <Loader />
//         </>
//     );
// }

// root.render(<App />);

import "./styles.css";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Pane from "./layout/Pane";
import { useEffect, useState } from "react";

const root = createRoot(document.getElementById("root"));

const App = () => {
    const [audio] = useState(new Audio("/sounds/run.wav"));
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        audio.play();
        setIsPlaying(true);
    };

    useEffect(() => {
        audio.loop = true;

        return () => {
            audio.pause();
        };
    }, [audio]);

    return (
        <>
            {!isPlaying && <button onClick={handlePlay} style={{ fontSize: '20px', padding: '10px', borderRadius: '5px', backgroundColor: 'purple', color: 'white' }}>Play Music</button>}
            <Canvas
                camera={
                    {
                        position: [0, 1.5, -90],
                        
                    }
                }
                shadows={true}
            >
                <Experience />
            </Canvas>
            <Loader />
        </>
    );
}

root.render(<App />);