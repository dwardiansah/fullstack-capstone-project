import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div className="landing-container">
            {/* Hero Section */}
            <section className="landing-hero text-center text-white py-5">
                <div className="container py-lg-5">
                    <span className="badge rounded-pill bg-light text-primary px-3 py-2 mb-3 fw-semibold shadow-sm">
                        ✨ Connecting Communities Across Generations
                    </span>
                    <h1 className="display-3 fw-extrabold mb-3">
                        Share What You Have, <br />
                        <span className="text-gradient">Find What You Need</span>
                    </h1>
                    <p className="lead text-light mb-4 mx-auto landing-subtitle">
                        GiftLink connects neighbors and generous individuals with community members looking for everyday household goods, electronics, books, and more. Sustainable, local, and 100% free.
                    </p>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <Link to="/app" className="btn btn-warning btn-lg px-4 py-3 fw-bold shadow-lg rounded-pill get-started-btn" id="get-started-button">
                            Get Started
                        </Link>
                        <Link to="/app/register" className="btn btn-outline-light btn-lg px-4 py-3 fw-bold rounded-pill">
                            Join GiftLink Community
                        </Link>
                    </div>
                </div>
            </section>

            {/* Feature Highlights */}
            <section className="container my-5 py-4">
                <div className="text-center mb-5">
                    <h2 className="fw-bold text-dark">How GiftLink Works</h2>
                    <p className="text-muted">Simple, transparent, and built for neighborly kindness</p>
                </div>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="feature-card p-4 rounded-4 shadow-sm text-center">
                            <div className="feature-icon-wrapper mb-3">
                                <span className="feature-icon">📦</span>
                            </div>
                            <h4 className="fw-bold mb-2">1. Post Unused Items</h4>
                            <p className="text-muted mb-0">
                                Give pre-loved goods a second life. List furniture, electronics, kitchen items, and more in seconds.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="feature-card p-4 rounded-4 shadow-sm text-center">
                            <div className="feature-icon-wrapper mb-3">
                                <span className="feature-icon">🔍</span>
                            </div>
                            <h4 className="fw-bold mb-2">2. Search & Filter</h4>
                            <p className="text-muted mb-0">
                                Easily find items by category, condition, age, or distance using our smart search filters.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="feature-card p-4 rounded-4 shadow-sm text-center">
                            <div className="feature-icon-wrapper mb-3">
                                <span className="feature-icon">🤝</span>
                            </div>
                            <h4 className="fw-bold mb-2">3. Connect & Collect</h4>
                            <p className="text-muted mb-0">
                                Connect directly with community donors, view verified reviews, and pick up your gifts locally.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Action CTA */}
            <section className="landing-cta py-5 my-5 rounded-4 container text-center text-white">
                <h3 className="fw-bold mb-3">Ready to find a gift or share with neighbors?</h3>
                <p className="mb-4 text-white-50">Browse over a dozen freshly posted items right now.</p>
                <Link to="/app" className="btn btn-light btn-lg px-4 py-2 rounded-pill fw-bold text-primary shadow">
                    View Catalog
                </Link>
            </section>
        </div>
    );
}

export default LandingPage;
