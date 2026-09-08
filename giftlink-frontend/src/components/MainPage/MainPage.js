import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MainPage.css';

// Fallback gifts data in case backend server is spinning up
const fallbackGifts = [
  {
    "id": "1",
    "name": "Mid-Century Wooden Coffee Table",
    "category": "Living",
    "condition": "Good",
    "posted_by": "Sarah Miller",
    "date_added": 1704067200,
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Looks really beautiful and well maintained!" }]
  },
  {
    "id": "2",
    "name": "Queen Size Ergonomic Mattress",
    "category": "Bedroom",
    "condition": "Like New",
    "posted_by": "Alex Johnson",
    "date_added": 1704153600,
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Extremely comfortable and pristine condition." }]
  },
  {
    "id": "3",
    "name": "Stainless Steel Espresso Machine",
    "category": "Kitchen",
    "condition": "Excellent",
    "posted_by": "Marcus Chen",
    "date_added": 1704240000,
    "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Makes fantastic coffee, love the steam wand." }]
  },
  {
    "id": "4",
    "name": "Noise Cancelling Wireless Headphones",
    "category": "Electronics",
    "condition": "Good",
    "posted_by": "Michael Brown",
    "date_added": 1704326400,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Sound quality is incredible and battery holds up great." }]
  },
  {
    "id": "5",
    "name": "Vintage Acoustic Guitar",
    "category": "Living",
    "condition": "Fair",
    "posted_by": "Rachel Green",
    "date_added": 1704412800,
    "image": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Great starter guitar with rich resonance." }]
  },
  {
    "id": "6",
    "name": "Ergonomic Mesh Desk Chair",
    "category": "Living",
    "condition": "Like New",
    "posted_by": "Robert Vance",
    "date_added": 1704499200,
    "image": "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Saved my back during long work from home days." }]
  },
  {
    "id": "7",
    "name": "Programmable Slow Cooker 6-Quart",
    "category": "Kitchen",
    "condition": "Good",
    "posted_by": "Monica Geller",
    "date_added": 1704585600,
    "image": "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Cooks stew perfectly, very handy." }]
  },
  {
    "id": "8",
    "name": "Mechanical Gaming Keyboard RGB",
    "category": "Electronics",
    "condition": "Like New",
    "posted_by": "Chandler Bing",
    "date_added": 1704672000,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Keys feel crisp and lighting effects look amazing." }]
  },
  {
    "id": "9",
    "name": "Ceramic Table Lamp Set of 2",
    "category": "Bedroom",
    "condition": "Excellent",
    "posted_by": "Phoebe Buffay",
    "date_added": 1704758400,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Warm ambient light and very stylish on nightstands." }]
  },
  {
    "id": "10",
    "name": "Cast Iron Dutch Oven 5-Quart",
    "category": "Kitchen",
    "condition": "Good",
    "posted_by": "Gordon Ramsay",
    "date_added": 1704844800,
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Heavy duty and makes wonderful artisan bread." }]
  },
  {
    "id": "11",
    "name": "Digital SLR Camera with 18-55mm Lens",
    "category": "Electronics",
    "condition": "Good",
    "posted_by": "Peter Parker",
    "date_added": 1704931200,
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Great camera for beginner photographers." }]
  },
  {
    "id": "12",
    "name": "Nordic Wool Throw Blanket",
    "category": "Living",
    "condition": "Like New",
    "posted_by": "Emma Watson",
    "date_added": 1705017600,
    "image": "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Cozy, warm, and zero scratching." }]
  },
  {
    "id": "13",
    "name": "Solid Pine 3-Drawer Nightstand",
    "category": "Bedroom",
    "condition": "Fair",
    "posted_by": "Liam Neeson",
    "date_added": 1705104000,
    "image": "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Solid build, great potential for a repaint project." }]
  },
  {
    "id": "14",
    "name": "Smart Wi-Fi Air Purifier with HEPA Filter",
    "category": "Living",
    "condition": "Excellent",
    "posted_by": "Bruce Wayne",
    "date_added": 1705190400,
    "image": "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Clears pollen and dust remarkably quickly." }]
  },
  {
    "id": "15",
    "name": "High-Power Nutrient Blender",
    "category": "Kitchen",
    "condition": "Good",
    "posted_by": "Diana Prince",
    "date_added": 1705276800,
    "image": "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Blends frozen fruit and kale in seconds without chunks." }]
  },
  {
    "id": "16",
    "name": "Compact 4K Portable Video Projector",
    "category": "Electronics",
    "condition": "Like New",
    "posted_by": "Tony Stark",
    "date_added": 1705363200,
    "image": "https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500&auto=format&fit=crop&q=60",
    "comments": [{ "comment": "Sharp image and super portable for movie night." }]
  }
];

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const response = await fetch('/api/gifts');
                if (response.ok) {
                    const data = await response.json();
                    setGifts(data.length > 0 ? data : fallbackGifts);
                } else {
                    setGifts(fallbackGifts);
                }
            } catch (err) {
                console.log('Backend not reached, using local catalog data:', err);
                setGifts(fallbackGifts);
            } finally {
                setLoading(false);
            }
        };

        fetchGifts();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recently';
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getConditionBadgeClass = (condition) => {
        switch (condition?.toLowerCase()) {
            case 'like new': return 'bg-success text-white';
            case 'excellent': return 'bg-primary text-white';
            case 'good': return 'bg-info text-dark';
            case 'fair': return 'bg-warning text-dark';
            default: return 'bg-secondary text-white';
        }
    };

    return (
        <div className="mainpage-container pb-5">
            {/* Header / Sub-banner */}
            <div className="bg-white border-bottom py-4 mb-4 shadow-sm">
                <div className="container d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div>
                        <h1 className="h3 fw-bold text-dark mb-1">Available Community Gifts</h1>
                        <p className="text-muted mb-0">Browse through {gifts.length} free community items available for pickup</p>
                    </div>
                    <Link to="/app/search" className="btn btn-outline-primary rounded-pill px-3 py-2 fw-medium">
                        🔍 Advanced Filter Search
                    </Link>
                </div>
            </div>

            {/* Catalog Grid */}
            <div className="container">
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading gifts...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4" id="gift-list">
                        {gifts.map((gift) => (
                            <div className="col" key={gift.id || gift._id}>
                                <div className="gift-card card h-100 shadow-sm border-0">
                                    <div className="gift-img-container">
                                        <img
                                            src={gift.image}
                                            alt={gift.name}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60';
                                            }}
                                        />
                                        <span className="badge-category">{gift.category}</span>
                                        <span className={`badge-condition badge ${getConditionBadgeClass(gift.condition)}`}>
                                            {gift.condition}
                                        </span>
                                    </div>
                                    <div className="card-body d-flex flex-direction-column flex-column p-3">
                                        <h5 className="card-title fw-bold text-truncate mb-1" title={gift.name}>
                                            {gift.name}
                                        </h5>
                                        <p className="text-muted small mb-2">
                                            Posted by <span className="fw-semibold text-dark">{gift.posted_by}</span>
                                        </p>
                                        <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                                            <span className="small text-muted">{formatDate(gift.date_added)}</span>
                                            <Link
                                                to={`/app/gift/${gift.id || gift._id}`}
                                                className="btn btn-sm btn-primary rounded-pill px-3 fw-semibold view-details-btn"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MainPage;
