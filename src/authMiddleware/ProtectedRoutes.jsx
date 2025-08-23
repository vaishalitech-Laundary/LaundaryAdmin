import { Outlet, Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const user = useAuth(allowedRoles);

    if (user === null) return <div>Loading...</div>; // still checking
    if (!user) return <Navigate to="/login" replace />; // not logged in

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />; // role not allowed
    }

    return <Outlet />; // render nested routes
};

export default ProtectedRoute;
