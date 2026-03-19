import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                });
            }
            else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsub;
    }, []);
    return (_jsx(AuthContext.Provider, { value: { user, loading }, children: children }));
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
