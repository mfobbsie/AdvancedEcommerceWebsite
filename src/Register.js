import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const uid = userCredential.user.uid;
            await setDoc(doc(db, "users", uid), {
                name,
                address,
                email,
                createdAt: new Date(),
            });
            setSuccess(true);
            setTimeout(() => navigate("/"), 1200);
        }
        catch (err) {
            if (err instanceof Error)
                setError(err.message);
            else
                setError("An unknown error occurred");
        }
    };
    return (_jsxs("form", { onSubmit: handleRegister, className: "container mt-4", children: [_jsx("h2", { children: "Create Account" }), _jsx("input", { type: "text", placeholder: "Full Name", value: name, onChange: (e) => setName(e.target.value), className: "form-control mb-2", required: true }), _jsx("input", { type: "text", placeholder: "Address", value: address, onChange: (e) => setAddress(e.target.value), className: "form-control mb-2", required: true }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "form-control mb-2", required: true }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "form-control mb-2", required: true }), _jsx("button", { className: "btn-brand-green mt-2", style: { borderRadius: "12px" }, children: "Register" }), error && _jsx("p", { className: "text-danger mt-2", children: error }), success && _jsx("p", { className: "text-success mt-2", children: "Account created!" })] }));
}
