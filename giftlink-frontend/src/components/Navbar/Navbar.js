import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

function Navbar() {
    const { isLoggedIn, userName, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg custom-navbar sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
                    <span className="brand-icon">🎁</span>
                    <span className="brand-text">Gift<span className="brand-highlight">Link</span></span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3 gap-lg-2">
                        <li className="nav-item">
                            <Link className="nav-link nav-item-custom" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item-custom" to="/app">Gifts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link nav-item-custom" to="/app/search">Search</Link>
                        </li>
                    </ul>

                    <div className="d-flex align-items-center gap-3">
                        {isLoggedIn ? (
                            <>
                                <div className="user-greeting d-flex align-items-center gap-2" id="user-display">
                                    <div className="avatar-circle">
                                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                                    </div>
                                    <span className="user-name-text">
                                        Welcome, <strong>{userName}</strong>
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1 logout-btn"
                                    id="logout-button"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/app/login"
                                    className="btn btn-outline-primary rounded-pill px-4 py-1-5 auth-btn"
                                    id="login-btn-nav"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/app/register"
                                    className="btn btn-primary rounded-pill px-4 py-1-5 auth-btn register-btn-nav"
                                    id="register-btn-nav"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
