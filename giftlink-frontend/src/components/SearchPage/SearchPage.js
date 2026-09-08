import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SearchPage.css';

const allGiftsSample = [
  {
    "id": "1",
    "name": "Mid-Century Wooden Coffee Table",
    "category": "Living",
    "condition": "Good",
    "posted_by": "Sarah Miller",
    "date_added": 1704067200,
    "age_years": 2.5,
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "2",
    "name": "Queen Size Ergonomic Mattress",
    "category": "Bedroom",
    "condition": "Like New",
    "posted_by": "Alex Johnson",
    "date_added": 1704153600,
    "age_years": 0.8,
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "3",
    "name": "Stainless Steel Espresso Machine",
    "category": "Kitchen",
    "condition": "Excellent",
    "posted_by": "Marcus Chen",
    "date_added": 1704240000,
    "age_years": 1.2,
    "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "4",
    "name": "Noise Cancelling Wireless Headphones",
    "category": "Electronics",
    "condition": "Good",
    "posted_by": "Michael Brown",
    "date_added": 1704326400,
    "age_years": 1.5,
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "5",
    "name": "Vintage Acoustic Guitar",
    "category": "Living",
    "condition": "Fair",
    "posted_by": "Rachel Green",
    "date_added": 1704412800,
    "age_years": 4.0,
    "image": "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "6",
    "name": "Ergonomic Mesh Desk Chair",
    "category": "Living",
    "condition": "Like New",
    "posted_by": "Robert Vance",
    "date_added": 1704499200,
    "age_years": 0.5,
    "image": "https://images.unsplash.com/photo-1580481077195-c3a821a58875?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "7",
    "name": "Programmable Slow Cooker 6-Quart",
    "category": "Kitchen",
    "condition": "Good",
    "posted_by": "Monica Geller",
    "date_added": 1704585600,
    "age_years": 2.0,
    "image": "https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "8",
    "name": "Mechanical Gaming Keyboard RGB",
    "category": "Electronics",
    "condition": "Like New",
    "posted_by": "Chandler Bing",
    "date_added": 1704672000,
    "age_years": 0.7,
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "9",
    "name": "Ceramic Table Lamp Set of 2",
    "category": "Bedroom",
    "condition": "Excellent",
    "posted_by": "Phoebe Buffay",
    "date_added": 1704758400,
    "age_years": 1.0,
    "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "10",
    "name": "Cast Iron Dutch Oven 5-Quart",
    "category": "Kitchen",
    "condition": "Good",
    "posted_by": "Gordon Ramsay",
    "date_added": 1704844800,
    "age_years": 3.0,
    "image": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "11",
    "name": "Digital SLR Camera with 18-55mm Lens",
    "category": "Electronics",
    "condition": "Good",
    "posted_by": "Peter Parker",
    "date_added": 1704931200,
    "age_years": 2.2,
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60"
  },
  {
    "id": "12",
    "name": "Nordic Wool Throw Blanket",
    "category": "Living",
    "condition": "Like New",
    "posted_by": "Emma Watson",
    "date_added": 1705017600,
    "age_years": 0.4,
    "image": "https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=500&auto=format&fit=crop&q=60"
  }
];

function SearchPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('All');
    const [condition, setCondition] = useState('All');
    const [ageYears, setAgeYears] = useState(5);
    const [searchResults, setSearchResults] = useState(allGiftsSample);
    const [searched, setSearched] = useState(false);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setSearched(true);

        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) queryParams.append('name', searchQuery.trim());
        if (category && category !== 'All') queryParams.append('category', category);
        if (condition && condition !== 'All') queryParams.append('condition', condition);
        if (ageYears) queryParams.append('age_years', ageYears);

        try {
            const res = await fetch(`/api/gifts/search?${queryParams.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setSearchResults(data);
                return;
            }
        } catch (err) {
            console.log('Search API call fallback to client filter:', err);
        }

        // Local filtering fallback
        let filtered = allGiftsSample.filter(item => {
            const matchesName = !searchQuery.trim() || item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = category === 'All' || item.category === category;
            const matchesCondition = condition === 'All' || item.condition === condition;
            const matchesAge = !ageYears || (item.age_years <= parseFloat(ageYears));
            return matchesName && matchesCategory && matchesCondition && matchesAge;
        });

        setSearchResults(filtered);
    };

    useEffect(() => {
        handleSearch();
    }, [category, condition, ageYears]);

    return (
        <div className="search-page-wrapper py-4 pb-5">
            <div className="container">
                <div className="search-header mb-4">
                    <h1 className="fw-bold text-dark mb-1">Search & Filter Gifts</h1>
                    <p className="text-muted">Find gifts tailored to your specific needs and category</p>
                </div>

                <div className="row g-4">
                    {/* Filters Sidebar */}
                    <div className="col-lg-4 col-md-5">
                        <div className="card filter-card border-0 shadow-sm p-4 rounded-4">
                            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                                <span>🎯</span> Filter Criteria
                            </h5>

                            <form onSubmit={handleSearch}>
                                {/* Search query */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Keyword</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="e.g. Table, Espresso, Chair"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        id="search-input"
                                    />
                                </div>

                                {/* Category dropdown */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Category</label>
                                    <select
                                        className="form-select"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        id="category-select"
                                    >
                                        <option value="All">All Categories</option>
                                        <option value="Living">Living</option>
                                        <option value="Bedroom">Bedroom</option>
                                        <option value="Kitchen">Kitchen</option>
                                        <option value="Electronics">Electronics</option>
                                    </select>
                                </div>

                                {/* Condition dropdown */}
                                <div className="mb-3">
                                    <label className="form-label small fw-semibold text-secondary">Condition</label>
                                    <select
                                        className="form-select"
                                        value={condition}
                                        onChange={(e) => setCondition(e.target.value)}
                                        id="condition-select"
                                    >
                                        <option value="All">Any Condition</option>
                                        <option value="Like New">Like New</option>
                                        <option value="Excellent">Excellent</option>
                                        <option value="Good">Good</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </div>

                                {/* Maximum Age Slider */}
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <label className="form-label small fw-semibold text-secondary mb-0">Max Age</label>
                                        <span className="badge bg-light text-primary border">{ageYears} Years</span>
                                    </div>
                                    <input
                                        type="range"
                                        className="form-range"
                                        min="1"
                                        max="6"
                                        step="0.5"
                                        value={ageYears}
                                        onChange={(e) => setAgeYears(e.target.value)}
                                        id="age-range"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100 rounded-pill fw-bold py-2"
                                    id="search-button"
                                >
                                    Apply Search Filter
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="col-lg-8 col-md-7">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-semibold text-dark">
                                Matching Results: <span className="badge bg-primary rounded-pill">{searchResults.length}</span>
                            </span>
                            {category !== 'All' && (
                                <span className="badge bg-secondary">Category: {category}</span>
                            )}
                        </div>

                        {searchResults.length === 0 ? (
                            <div className="card p-5 text-center border-0 shadow-sm rounded-4">
                                <h4 className="fw-bold text-secondary mb-2">No Gifts Found</h4>
                                <p className="text-muted mb-0">Try changing your category or resetting keyword filters</p>
                            </div>
                        ) : (
                            <div className="row row-cols-1 row-cols-sm-2 g-3" id="search-results-grid">
                                {searchResults.map((item) => (
                                    <div className="col" key={item.id}>
                                        <div className="card h-100 border-0 shadow-sm gift-card">
                                            <div className="gift-img-container" style={{ height: '180px' }}>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60';
                                                    }}
                                                />
                                                <span className="badge-category">{item.category}</span>
                                                <span className="badge-condition badge bg-success">{item.condition}</span>
                                            </div>
                                            <div className="card-body p-3 d-flex flex-column">
                                                <h6 className="fw-bold mb-1 text-truncate" title={item.name}>{item.name}</h6>
                                                <span className="text-muted small mb-2">Posted by {item.posted_by}</span>
                                                <div className="mt-auto pt-2 border-top d-flex justify-content-between align-items-center">
                                                    <span className="badge bg-light text-dark border">Age: {item.age_years} yrs</span>
                                                    <Link to={`/app/gift/${item.id}`} className="btn btn-sm btn-outline-primary rounded-pill px-3">
                                                        View
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
            </div>
        </div>
    );
}

export default SearchPage;
