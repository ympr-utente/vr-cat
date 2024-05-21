import { onAuthStateChanged, signOut, updateCurrentUser, signInWithRedirect } from "firebase/auth";
import { useEffect } from "react";
import { auth } from '../firebase/firebase.config';
import { getAuth } from "firebase/auth";
import { createContext, useContext, useState} from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { si } from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.error("useAuth must be used within an AuthProvider");
        return;
    }
    return context;
}

export function AuthProvider({ children }) {
    const [userLogged, setUserLogged] = useState(null);
    useEffect(()=> {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            !currentUser ? setUserLogged(null) : setUserLogged(currentUser);
        });
        return () => suscribed();

     }, []);



    const loginWithGoogle = async () => {
        console.log('Iniciando inicio de sesión con Google...');
        try {
            const provider = new GoogleAuthProvider();
            console.log('Proveedor de Google creado:', provider);
            const res = await signInWithPopup(auth, provider);
            console.log('Respuesta de signInWithPopup:', res);
            return { success: true, user: res.user };
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            return { success: false, error: error };
        }
    }




    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, error: error};
        }
    };

    return (
        <authContext.Provider value={{ userLogged, loginWithGoogle, logout}}>
            {children}
        </authContext.Provider>
    )
}
