import { useNavigate } from 'react-router-dom';
import './Buttons.css'

export default function Buttons() {

    const navigate = useNavigate();

    const handleClick = (ruta) => {
        navigate(ruta);
    };

    return (
        <main className="buttons-grid">
            <div className="button-container">
                <button className="button" onClick={() => handleClick('/level1')}>Level 1</button>
            </div>
            <div className="button-container">
                <button className="button">Level 2</button>
            </div>
            <div className="button-container">
                <button className="button">Level 3</button>
            </div>
            <div className="button-container">
                <button className="button">Level 4</button>
            </div>
        </main>
    );
}

