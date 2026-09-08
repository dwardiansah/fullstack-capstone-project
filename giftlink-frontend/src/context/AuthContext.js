import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        const token = sessionStorage.getItem('auth-token') || localStorage.getItem('auth-token');
        const name = sessionStorage.getItem('name') || localStorage.getItem('name');
        if (token) {
            setIsLoggedIn(true);
            setAuthToken(token);
            setUserName(name || 'Member');
        }
    }, []);

    const login = (token, name, email) => {
        sessionStorage.setItem('auth-token', token);
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('email', email);
        setIsLoggedIn(true);
        setAuthToken(token);
        setUserName(name);
    };

    const logout = () => {
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        localStorage.removeItem('auth-token');
        localStorage.removeItem('name');
        setIsLoggedIn(false);
        setUserName('');
        setAuthToken('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
