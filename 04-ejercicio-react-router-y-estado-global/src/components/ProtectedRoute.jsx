import { useAuthstore } from "./store/Authstore";
import { Navigate } from "react-router";

export function ProtectedRoute({ children }) {
    const { isLoggedIn } = useAuthstore()
    if (!isLoggedIn) {
        return <Navigate to='/login' replace />
    }
    return children
}