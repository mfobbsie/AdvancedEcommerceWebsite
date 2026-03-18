import { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { doc, onSnapshot, type DocumentData } from "firebase/firestore";
import { useAuth } from "./useAuth";

export function useUserProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<DocumentData | null>(null);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    // Real-time listener
    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as DocumentData);
      }
    });

    return unsubscribe;
  }, [user]);

  return { profile };
}
