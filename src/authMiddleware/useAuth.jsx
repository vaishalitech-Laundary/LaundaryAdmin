import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useAuth = (allowedRoles = []) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/auth/auth/auth", { withCredentials: true });
                const currentUser = res.data.user;
                // console.log(currentUser.role)

                if (allowedRoles.length && !allowedRoles.includes(currentUser.role)) {
                    navigate("/unauthorized");
                    return;
                }

                setUser(currentUser);
            } catch (err) {
                navigate("/login");
            }
        };

        checkAuth();
    }, [allowedRoles, navigate]);

    return user;
};

export default useAuth;
