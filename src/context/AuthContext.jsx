import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from '../stores/firebase.config';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser || null);
        });
        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);
            setUser(res.user); // Actualiza el estado del usuario tras el inicio de sesión
            return { success: true, user: res.user };
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            return { success: false, error: error };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null); // Limpia el estado del usuario tras el cierre de sesión
            return { success: true };
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            return { success: false, error: error };
        }
    };

    return (
        <AuthContext.Provider value={{ user, loginWithGoogle, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
