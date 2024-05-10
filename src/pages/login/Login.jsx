import React from 'react';
import './StylesLogin.css';


export default function Login() {
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
                    <div className='google-button'>
                        <button type='submit'>Login with Google</button>
                    </div>
                    <div className='guest-button'>
                        <button type='submit'>Guest</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


