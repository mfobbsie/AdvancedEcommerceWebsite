import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db, auth } from "./firebaseConfig";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type ProfileState = {
  name: string;
  address: string;
  email: string;
};

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileState>({
    name: "",
    address: "",
    email: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProfile(snap.data() as ProfileState);
      } else {
        const initialProfile: ProfileState = {
          name: "",
          address: "",
          email: user.email ?? "",
        };
        await setDoc(ref, {
          ...initialProfile,
          createdAt: new Date(),
        });
        setProfile(initialProfile);
      }
    }

    if (user) loadProfile();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    if (!user) return;
    await updateDoc(doc(db, "users", user.uid), profile);
    setSaved(true);
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete your account?")) return;

    await deleteDoc(doc(db, "users", user.uid));
    if (auth.currentUser) {
      await deleteUser(auth.currentUser);
    }
    navigate("/");
  };

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>Your Profile</h2>
      <input
        name="name"
        value={profile.name}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Name"
      />

      <input
        name="address"
        value={profile.address}
        onChange={handleChange}
        className="form-control mb-2"
        placeholder="Address"
      />

      <input
        name="email"
        value={profile.email}
        disabled
        className="form-control mb-2"
      />

      <button
        className="btn-brand-green mt-2"
        style={{ borderRadius: "6px" }}
        onClick={handleSave}
      >
        Save Changes
      </button>

      {saved && <p className="text-success mt-2">Profile saved!</p>}

      <button
        className="btn-brand-grey mt-2 ms-2"
        style={{ borderRadius: "6px" }}
        onClick={handleDeleteAccount}
      >
        Delete Account
      </button>
    </div>
  );
}
