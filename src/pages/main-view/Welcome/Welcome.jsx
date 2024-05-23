import './Welcome.css'

export default function Welcome({ text }){
	return (
        <div className="title-main-container">
            <h1 className='title-main'>{text}</h1>
        </div>
    );
}

