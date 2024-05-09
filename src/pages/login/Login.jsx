import React from 'react';
import './Login.css';


export default function Login ()
{
    return (
            <div className='wrapper'>
                <form action=''>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='Username' />
                    </div>
                    <div className='input-box'>
                        <input type='password' placeholder='Password' />
                    </div>
                    <div className='google-button'>
                        <button type='submit'>Google</button>
                    </div>
                </form>
            </div>
    )
}


