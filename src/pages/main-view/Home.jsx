



import Buscador from './Buscador/Buscador';
import Buttons from './Butttons/Buttons';
import './Home.css'
import Main from './Main/Main';
import Welcome from './Welcome/Welcome';


export default function Home(){
    return (
      <div>
        <Buscador/>
        <Welcome text={"Bienvenido"}/>
        <Main/>
        <Buttons/>
      </div>
    );
  }