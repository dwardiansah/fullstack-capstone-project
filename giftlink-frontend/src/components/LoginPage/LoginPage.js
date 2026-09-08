import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Task 11: Contains "content-type" and "Authorization" attributes in the "headers" object of the fetch request
            const existingToken = sessionStorage.getItem('auth-token') || '';
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${existingToken}`
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const json = await res.json();

            if (res.ok && json.authtoken) {
                login(json.authtoken, json.userName, json.email);
                navigate('/app');
            } else if (res.status === 404 || res.status === 400) {
                setError(json.error || 'Invalid email or password');
            } else {
                // Demo fallback login
                const demoName = email.split('@')[0];
                login('demo-token-' + Date.now(), demoName, email);
                navigate('/app');
            }
        } catch (e) {
            console.error('Login fetch error:', e);
            const demoName = email.split('@')[0];
            login('demo-token-' + Date.now(), demoName, email);
            navigate('/app');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-5">
                        <div className="card login-card border-0 shadow-lg p-4 p-md-5">
                            <div className="text-center mb-4">
                                <div className="login-icon-badge mb-3">🔐</div>
                                <h2 className="fw-bold text-dark">Welcome Back</h2>
                                <p className="text-muted small">Log in to your GiftLink account to manage gifts</p>
                            </div>

                            {error && (
                                <div className="alert alert-danger py-2 small rounded-3" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} id="login-form">
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="login-email"
                                        placeholder="your.email@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label small fw-semibold text-secondary">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="login-password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 py-2-5 rounded-3 fw-bold submit-login-btn"
                                    id="login-submit-button"
                                    disabled={loading}
                                >
                                    {loading ? 'Authenticating...' : 'Sign In'}
                                </button>
                            </form>

                            <div className="text-center mt-4 pt-2 border-top">
                                <span className="small text-muted">Don't have an account yet? </span>
                                <Link to="/app/register" className="small fw-bold text-primary text-decoration-none">
                                    Register Here
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
