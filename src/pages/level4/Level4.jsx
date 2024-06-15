import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import { GameInterface } from '../../GameInterface';
import { CatModelProvider } from '../../context/CatModelContext';
import { ShortcutManager } from '../../managers/ShortcutManager';
import { SoundManager } from '../../managers/SoundManager';
import { NavigationControls } from '../../utils/NavigationControls';
import { Carreta } from "./world/Carreta";
import Environments from "./world/Environments";
import Lights from "./world/Lights";
import { World } from "./world/World";
import World1 from "./world/World1";

export default function Experience() {
  return (
    <CatModelProvider>
      <NavigationControls>
        <Canvas
          shadows
          camera={{
            position: [0, 5, 10]
          }}>
          <OrbitControls />
          <color attach="background" args={['#FEF9F7']} />
          <Lights />
          <Suspense fallback={null}>
            <Physics>
              <World scale={[4,4, 4]} />
              <World1/>
            
              
              <ShortcutManager />
              <SoundManager />
            </Physics>
            <Lights />
            <Environments />
            <Carreta position={[14, 0, 3.5]} scale={[0.2, 0.2, 0.2]} rotation={[0, Math.PI, 0]} />
          </Suspense>
        </Canvas>
        <GameInterface />
        <ShortcutManager />
      </NavigationControls>
    </CatModelProvider>
  );
}
