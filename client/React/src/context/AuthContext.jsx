import React, { createContext } from "react";
import api from "../utils/axios";

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) { // ← was "storageUser"
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => { 
        try {
            const { data } = await api.post('/auth/login', { email, password });
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
            return data;
        } catch (err) {
            console.error("Login failed:", err);
            throw err;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post('/auth/register', { name, email, password });
            setUser(data);
            return data;
        } catch (err) {
            console.error("Registration failed", err);
            throw err;
        }
    };

    const verifyOtp = async (email, otp) => {  
        try {
            const { data } = await api.post('/auth/verify-otp', { email, otp }); 
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("token", data.token);
        } catch (err) {
            console.error("OTP verification failed : ", err);
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, verifyOtp, register }}>
            {children}
        </AuthContext.Provider>
    );
};