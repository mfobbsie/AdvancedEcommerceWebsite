import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

export type AuthUser = {
  uid: string;
  email?: string | null;
};

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
    );

    return unsub;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
