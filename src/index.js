import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import "./styles.css";

const root = createRoot(document.getElementById("root"));

root.render(<>
    <Canvas
        camera={
            {
                position: [600,-1, -45],
                rotation: [0, 0, 0]
            }
        }
        shadows={true}
    >
        <Experience />
    </Canvas>
    <Loader />
</>

)