import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        }
        catch (err) {
            if (err instanceof Error)
                setError(err.message);
        }
    };
    return (_jsxs("form", { onSubmit: handleLogin, className: "container mt-4", children: [_jsx("h2", { children: "Login" }), _jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), className: "form-control mb-2" }), _jsx("input", { type: "password", placeholder: "Password", value: password, onChange: (e) => setPassword(e.target.value), className: "form-control mb-2" }), _jsx("button", { className: "btn-brand-green", children: "Login" }), error && _jsx("p", { className: "text-danger mt-2", children: error })] }));
};
export default Login;
