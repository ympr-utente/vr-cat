import { createRoot } from 'react-dom/client';
import Experience from './Experience';
import { Canvas } from "@react-three/fiber";
import styles from './styles.css';
import World from './World/World.jsx';



const root = createRoot(document.getElementById('root'));

root.render(
    <Canvas shadows={true}>
    <Experience title="Hello" subtitle="World" />
    </Canvas>
);
