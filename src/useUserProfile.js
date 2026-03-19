import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "./useAuth";
export function useUserProfile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        if (!user)
            return;
        const ref = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(ref, (snap) => {
            if (snap.exists()) {
                setProfile(snap.data());
            }
        });
        return unsubscribe;
    }, [user]);
    return { profile };
}
