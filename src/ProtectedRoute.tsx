import {Navigate, Outlet} from "react-router";
import {useAuth} from "react-oidc-context";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth(); // Replace with your actual auth hook

    if (isLoading) return <div>Loading...</div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};