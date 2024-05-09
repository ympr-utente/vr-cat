import { BrowserRouter, Route, Routes } from "react-router-dom";
import Level1 from "../pages/level1/Level1";
import Login from "../pages/login/Login";
// import Login from "../pages/login/Login";
// import LoginForm from "../pages/login/Login";

export default function RoutesGames() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/level1" element={<Level1 />} />
                {/* <Route path="/level2" element={<Level1 />} />
                <Route path="/level3" element={<Level1 />} />
                <Route path="/level4" element={<Level1 />} /> */}
            </Routes>
        
        </BrowserRouter>
    )
}