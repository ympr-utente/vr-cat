import './Main.css'

export default function Main(){
	const logo = '/assets/images/threedy-logo.svg'; 

	return(
		<main className="image-grid">
			<div className="image-container">
        		<img src={logo} alt="imagen 1" className="image-opacity" />
        		<div className="image-text">
          			<p>Level 1</p>
        		</div>

      		</div>
			<div className="image-container">
        		<img src={logo} alt="imagen 2" className="image-opacity" />
        		<div className="image-text">
          			<p>Level 2</p>
        		</div>
      		</div>
			<div className="image-container">
        		<img src={logo} alt="imagen 3" className="image-opacity" />
        		<div className="image-text">
          			<p>Level 3</p>
        		</div>
      		</div>
			<div className="image-container">
        		<img src={logo} alt="imagen 4" className="image-opacity" />
        		<div className="image-text">
          			<p>Level 4</p>
        		</div>
      		</div>
		</main>
	);
}

