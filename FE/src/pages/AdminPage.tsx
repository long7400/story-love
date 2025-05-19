import {useState, useEffect} from "react";
import LoginPage from "@/components/admin/LoginPage";
import Dashboard from "@/components/admin/Dashboard";

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = sessionStorage.getItem("love_story_admin_auth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (status: boolean) => {
        setIsAuthenticated(status);
    };

    const handleLogout = () => {
        sessionStorage.removeItem("love_story_admin_auth");
        setIsAuthenticated(false);
    };

    return isAuthenticated ? (
        <Dashboard onLogout={handleLogout}/>
    ) : (
        <LoginPage onLogin={handleLogin}/>
    );
}