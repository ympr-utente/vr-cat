// src/context/AuthContext.jsx
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../stores/firebase.config';

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
    const [user, setUser] = useState(null);
    useEffect(() => {
        const subscribed = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
        return () => subscribed();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
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
            return { success: false, error: error };
        }
    };

    return (
        <authContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </authContext.Provider>
    )
}
