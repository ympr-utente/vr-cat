import './Main.css'

export default function Main(){
	const level1 = '/assets/images/level1.png'; 
	const level2 = '/assets/images/level2.png'; 
	const level3 = '/assets/images/level3.png'; 
	const level4 = '/assets/images/level4.png'; 

	return(
		<main className="image-grid">
			<div className="image-container">
        		<img src={level1} alt="imagen 1" className="image-opacity" />
        		{/* <div className="image-text">
          			<p>Level 1</p>
        		</div> */}

      		</div>
			<div className="image-container">
        		<img src={level2} alt="imagen 2" className="image-opacity" />
        		{/* <div className="image-text">
          			<p>Level 2</p>
        		</div> */}
      		</div>
			<div className="image-container">
        		<img src={level3} alt="imagen 3" className="image-opacity" />
        		{/* <div className="image-text">
          			<p>Level 3</p>
        		</div> */}
      		</div>
			<div className="image-container">
        		<img src={level4} alt="imagen 4" className="image-opacity" />
        		{/* <div className="image-text">
          			<p>Level 4</p>
        		</div> */}
      		</div>
		</main>
	);
}

