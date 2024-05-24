import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Suspense } from 'react';
import { GameInterface } from '../../GameInterface';
import Lights from '../level1/lights/Lights';
import { NavigationControls } from '../../utils/NavigationControls';
import { Title } from '../../components/titles/Title';
import { SoundManager } from '../../managers/SoundManager';
import { CatModelProvider } from '../../context/CatModelContext';
import World from './world/World';
import { ShortcutManager } from '../../managers/ShortcutManager';


export default function Level1() {
  return (
    <CatModelProvider>
      <NavigationControls>
        <Canvas
          shadows
          camera={{
            position: [0, 5, 10]
          }}>
          <color attach="background" args={['#FEF9F7']} />

          <Lights />

          <Suspense fallback={null}>
            <Physics>
              <Title />
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
