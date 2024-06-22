import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import { GameInterface } from '../../GameInterface';
import { CatModelProvider } from '../../context/CatModelContext';
import { ShortcutManager } from '../../managers/ShortcutManager';
import { SoundManager } from '../../managers/SoundManager';
import { NavigationControls } from '../../utils/NavigationControls';
import Lights from './lights/Lights';
import World from './world/World';


export default function Level4() {
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
              {/* <Title2 /> */}
              <World />
              <ShortcutManager />
              <SoundManager />
            </Physics> 
          </Suspense>
        </Canvas>
        <GameInterface />
        <ShortcutManager />
      </NavigationControls>
    </CatModelProvider>
  );
}
