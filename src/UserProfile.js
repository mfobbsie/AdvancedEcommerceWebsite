import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { db, auth } from "./firebaseConfig";
import { doc, getDoc, updateDoc, setDoc, deleteDoc } from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function UserProfile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState({
        name: "",
        address: "",
        email: "",
    });
    const [saved, setSaved] = useState(false);
    useEffect(() => {
        async function loadProfile() {
            if (!user)
                return;
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                setProfile(snap.data());
            }
            else {
                const initialProfile = {
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
        if (user)
            loadProfile();
    }, [user]);
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
        setSaved(false);
    };
    const handleSave = async () => {
        if (!user)
            return;
        await updateDoc(doc(db, "users", user.uid), profile);
        setSaved(true);
    };
    const handleDeleteAccount = async () => {
        if (!user)
            return;
        if (!confirm("Are you sure you want to delete your account?"))
            return;
        await deleteDoc(doc(db, "users", user.uid));
        if (auth.currentUser) {
            await deleteUser(auth.currentUser);
        }
        navigate("/");
    };
    if (!user) {
        return _jsx("p", { children: "Please log in to view your profile." });
    }
    return (_jsxs("div", { className: "container mt-4", children: [_jsx("h2", { children: "Your Profile" }), _jsx("input", { name: "name", value: profile.name, onChange: handleChange, className: "form-control mb-2", placeholder: "Name" }), _jsx("input", { name: "address", value: profile.address, onChange: handleChange, className: "form-control mb-2", placeholder: "Address" }), _jsx("input", { name: "email", value: profile.email, disabled: true, className: "form-control mb-2" }), _jsx("button", { className: "btn-brand-green mt-2", style: { borderRadius: "6px" }, onClick: handleSave, children: "Save Changes" }), saved && _jsx("p", { className: "text-success mt-2", children: "Profile saved!" }), _jsx("button", { className: "btn-brand-grey mt-2 ms-2", style: { borderRadius: "6px" }, onClick: handleDeleteAccount, children: "Delete Account" })] }));
}
