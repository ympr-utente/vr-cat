import "./styles.css";
import { createRoot } from "react-dom/client";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";

const root = createRoot(document.getElementById("root"));

root.render(<>
    <Canvas
        shadows={true}
    >
        <Experience />
    </Canvas>
    <Loader />
</>

)