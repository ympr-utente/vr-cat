import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { Interface } from './pages/level1/temporizer/Interface'
import Level from './pages/level1/staging/Environments'
import Lights from './pages/level1/lights/Lights'
import { NavigationControls } from './utils/NavigationControls'
import { Title } from './pages/level1/abstractions/Title'
import { SoundManager } from './pages/level1/sonido/SoundManager'
import '@fontsource/inter'
import { ShortcutManager } from './pages/level1/sonido/ShortcutManager'
import { AuthProvider } from './context/AuthContext'
import RoutesGames from './routes/RoutesGame'

const Experience = () => {
    return (
        // <Physics debug>
        //     <Title />
        //     <Level />
        //     <SoundManager />
        // </Physics>
        <AuthProvider>
            <RoutesGames />
        </AuthProvider>
    )
}


export default Experience;