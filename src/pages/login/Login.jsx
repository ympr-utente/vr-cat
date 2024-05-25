import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './StylesLogin.css';

export default function Login() {
    const navigate = useNavigate();
    const auth = useAuth();

    const onHandleButtonLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await auth.loginWithGoogle();
            if (result.success) {
                navigate('/home');
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

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
    );
}