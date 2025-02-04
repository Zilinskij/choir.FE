import { Navigate } from "react-router-dom";
import { AuthContext } from "./components/Auth/AuthContext";
import { useContext } from "react";

const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    if (!token) {
        return <Navigate to={'/login'} replace />
    }
    return children
}

export default PrivateRoute;