import './Buscador.css'
import { Link } from 'react-router-dom'

export default function Buscador(){
	return(
		<div className="section-container">
			<div className="title-logo">
				<h1 className='title-logo'>MeowVR</h1>
			</div>

			<div className="login-container">
				<div className="login-content">
					{/* <Link to="./login" className="login-button">Acceder</Link> */}
				</div>
			</div>
		</div>
	);
}

