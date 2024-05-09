import { createRoot } from 'react-dom/client';
import Experience from './Experience';
import { Canvas } from "@react-three/fiber";
import styles from './styles.css';
import { StrictMode } from 'react';



const root = createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <Experience />
    </StrictMode>

);
