// import React from 'react';
// import './StylesLogin.css';
// import { useNavigate } from 'react-router-dom';


// export default function Login() {

//     return (
//         <div className='container'>
//             <div className='wrapper'>
//                 <form action=''>
//                     <div className="logo-meow">
//                         <img src="/assets/images/logo.png" alt="Logo" />

//                     </div>
//                     <div className='title-login'>
//                         <h1>MeowVr</h1>
//                     </div>
//                     <div className='google-button'>
//                         <button type='submit'>Login</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }


import React from 'react';
import './StylesLogin.css';
import { useNavigate } from 'react-router-dom';
import { useAuth, loginWithGoogle } from '../../context/AuthContext';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function Login() {
    const navigate = useNavigate();
    //useAuth();
    const auth = useAuth();
    
    const onHandleButtonLogin = async (e) => {
        e.preventDefault()
        // const result = 
        const result = await auth.loginWithGoogle();
        console.log(result)
    }


    return (
        <div className='container'>
            <div className='wrapper'>
                <form action=''>
                    <div className="logo-meow">
                        <img src="/assets/images/threedy-logo.svg" alt="Logo" />

                    </div>
                    <div className='title-login'>
                        <h1>MeowVr</h1>
                    </div>
                    <div onClick={onHandleButtonLogin} className="Button-Start">
                        <button>Login with Google</button>
                    </div>
                    <div className='guest-button'>
                        <button type='submit'>Guest</button>
                    </div>
                </form>
            </div>
        </div>
    )
}




