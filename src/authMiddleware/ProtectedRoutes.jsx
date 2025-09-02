import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth.jsx";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const user = useAuth(allowedRoles);

    if (user === null) {
        return <div className="text-5xl font-bold text-center my-30">Loading...</div>; // still checking
    }
    if (user === false) {
        return <Navigate to="/login" replace />; // not logged in
    }
    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauth" replace />; // role not allowed
    }

    return <Outlet />; // render nested routes
};

export default ProtectedRoute;
