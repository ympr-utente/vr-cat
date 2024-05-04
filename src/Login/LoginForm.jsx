import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';



function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loginWithGoogle } = useAuth(); // Obtiene la función de inicio de sesión desde el contexto de autenticación

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Aquí puedes manejar el inicio de sesión, por ejemplo, enviando una solicitud HTTP a tu servidor
        const result = await loginWithGoogle(email, password);
        if (result.success) {
            console.log('Inicio de sesión exitoso');
        } else {
            console.error('Error en el inicio de sesión', result.error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Correo electrónico:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <label>
                Contraseña:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default LoginForm;