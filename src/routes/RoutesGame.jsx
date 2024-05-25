import { BrowserRouter, Route, Routes } from "react-router-dom";
import Level1 from "../pages/level1/Level1";
import Level2 from "../pages/level2/Level2";
import Login from "../pages/login/Login";
import Home from "../pages/main-view/Home";

export default function RoutesGames() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/level1" element={<Level1 />} />
                <Route path="/level2" element={<Level2 />} />
                {/* <Route path="/level3" element={<Level1 />} />
                <Route path="/level4" element={<Level1 />} /> */}
            </Routes>
        </BrowserRouter>
    )
}
