import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/level1/Level1'
import './styles.css';
import { createRoot } from 'react-dom/client';
import Experience from './Experience';
import { Canvas } from "@react-three/fiber";
import { StrictMode } from 'react';


const root = createRoot(document.getElementById('root'));


root.render(
    <StrictMode>
        <Experience/>
    </StrictMode>
);
