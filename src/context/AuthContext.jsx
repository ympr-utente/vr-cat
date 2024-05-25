import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../stores/firebase.config';
import { ref, set } from "firebase/database";

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

    useEffect(() => {
        const subscribed = onAuthStateChanged(auth, (currentUser) => {
            !currentUser ? setUserLogged(null) : setUserLogged(currentUser);
        });
        return () => subscribed();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const res = await signInWithPopup(auth, provider);

            const userRef = ref(db, `users/${res.user.uid}`);
            await set(userRef, {
                uid: res.user.uid,
                displayName: res.user.displayName,
                email: res.user.email,
                photoURL: res.user.photoURL
            });

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
        <authContext.Provider value={{ userLogged, loginWithGoogle, logout }}>
            {children}
        </authContext.Provider>
    )
}
