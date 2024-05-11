import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { Interface } from './temporizer/Interface'
import Level from './staging/Environments'
import Lights from './lights/Lights'
import { NavigationControls } from '../../utils/NavigationControls'
import { Title } from './abstractions/Title'
import { SoundManager } from './sonido/SoundManager'
import '@fontsource/inter'
import { ShortcutManager } from './sonido/ShortcutManager'
import Experience from '../../Experience'

// function Experience() {
//     return (
//         <Physics debug>
//             <Title />
//             <Level />
//             <SoundManager />
//         </Physics>
//     )
// }

export default function Level1() {

    return (
        <NavigationControls>
            <Canvas
                shadows
                camera={{
                    position: [0, 5, 10]
                }}>
                <color attach="background" args={['#FEF9F7']} />

                <Lights />

                <Suspense fallback={null}>
                    {/* CAMBIO AQUI  */}
                    {/* <Experience /> */}
                    <Physics debug>
                        <Title />
                        <Level />
                        <SoundManager />
                    </Physics>
                </Suspense>
            </Canvas>
            <Interface />
            <ShortcutManager />
        </NavigationControls>
    )
}

