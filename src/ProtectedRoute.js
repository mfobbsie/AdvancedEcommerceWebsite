import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";
export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) {
        return _jsx("p", { children: "Loading..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
