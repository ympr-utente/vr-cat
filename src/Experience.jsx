import { Color, MeshBasicMaterial } from "three";
import { Environment, OrbitControls } from "@react-three/drei";
import World from "./pages/level1/world/World.jsx";
import Environments from "./pages/level1/environments/Environments.jsx";
import Lights from "./pages/level1/lights/Lights.jsx";
import { Perf } from "r3f-perf";
import RoutesGames from "./routes/RoutesGame.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

const Experience = () => {
    return (
        <AuthProvider>
                    <RoutesGames />
        </AuthProvider>
        
    );
}

export default Experience;

//CBCE09

/*<directionalLight position={[2,10,0]} color="#11DFC6" intensity={10}></directionalLight>    
<pointLight position={[0, 2, 0]} color="#8F00FF" intensity={10}/>
*/