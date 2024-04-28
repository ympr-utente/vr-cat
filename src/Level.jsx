import { Environment } from '@react-three/drei'
import {CatModel} from './CatModel'
import Floor from './Floor'
import Obstacle from './Obstacle'

export default function Level() {
    return (
        <>
            <Environment
            files = './geometries/hdris/satara_night_no_lamps_4k.hdr'
            background = {true}
            ground={{height: 20, scale: 512, radius: 400}}
            />
            <CatModel position-y={0.5} />
            <Floor scale-y={5} position-z={-45} />
            <Obstacle.Spinner position-z={-10} />
            <Obstacle position-z={-20} />
            <Obstacle.Limbo position-z={-34} />
        </>
    )
}
