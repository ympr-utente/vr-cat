import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import React, { Suspense } from 'react';
import { GameInterface } from '../../GameInterface';
import { Title } from '../../components/titles/Title';
import { CatModelProvider } from '../../context/CatModelContext';
import { ShortcutManager } from '../../managers/ShortcutManager';
import { SoundManager } from '../../managers/SoundManager';
import Lights from '../../pages/level1/lights/Lights';
import { NavigationControls } from '../../utils/NavigationControls';
import World from './world/World';


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
