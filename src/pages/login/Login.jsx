import React from 'react';
import './StylesLogin.css';


export default function Login() {
    return (
        <div className='container'>
            <div className='wrapper'>
                <form action=''>
                    <div className="logo-meow">
                        <img src="/assets/images/logo.png" alt="Logo" />

                    </div>
                    <div className='title-login'>
                        <h1>MeowVr</h1>
                    </div>
                    <div className='google-button'>
                        <button type='submit'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


