import './Buscador.css'
import { Link } from 'react-router-dom'

export default function Buscador(){
	const logo = '/assets/images/threedy-logo.svg';

	return(
		<div className="title-container">
			<div className="title-logo">
				<h1 className='title-text'>MeowVR</h1>
			</div>

			<div className="logo-container">
				<img src={logo} alt="imagen 1" className="image-opacity" />
			</div>
		</div>
	);
}

