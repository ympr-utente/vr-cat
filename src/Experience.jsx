import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import { GameInterface } from './GameInterface'
import Level1 from './pages/level1/Level1'
import Lights from './pages/level1/lights/Lights'
import { NavigationControls } from './utils/NavigationControls'
import { Title } from './components/titles/Title'
import { SoundManager } from './managers/SoundManager'
import { ShortcutManager } from './managers/ShortcutManager'
import { CatModelProvider } from './context/CatModelContext'
import { AuthProvider } from './context/AuthContext'
import RoutesGames from './routes/RoutesGame'


function Experience() {
    return (
        <AuthProvider> 
                <RoutesGames /> 
        </AuthProvider>
    )
}

export default Experience
