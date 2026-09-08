import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './DetailsPage.css';

const fallbackGiftsMap = {
  "1": {
    "id": "1",
    "name": "Mid-Century Wooden Coffee Table",
    "category": "Living",
    "condition": "Good",
    "posted_by": "Sarah Miller",
    "zipcode": "10001",
    "date_added": 1704067200,
    "age_years": 2.5,
    "description": "Solid oak wood coffee table with slight signs of wear on the lower shelf, very sturdy.",
    "image": "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80",
    "comments": [
      { "author": "David", "comment": "Looks really beautiful and well maintained!" }
    ]
  },
  "2": {
    "id": "2",
    "name": "Queen Size Ergonomic Mattress",
    "category": "Bedroom",
    "condition": "Like New",
    "posted_by": "Alex Johnson",
    "zipcode": "10002",
    "date_added": 1704153600,
    "age_years": 0.8,
    "description": "Memory foam queen mattress, used with a waterproof mattress protector for 8 months.",
    "image": "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop&q=80",
    "comments": [
      { "author": "Elena", "comment": "Extremely comfortable and pristine condition." }
    ]
  },
  "3": {
    "id": "3",
    "name": "Stainless Steel Espresso Machine",
    "category": "Kitchen",
    "condition": "Excellent",
    "posted_by": "Marcus Chen",
    "zipcode": "10003",
    "date_added": 1704240000,
    "age_years": 1.2,
    "description": "15-bar pump espresso maker with steam wand for milk frothing. Includes portafilter and tamper.",
    "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800&auto=format&fit=crop&q=80",
    "comments": [
      { "author": "Jessica", "comment": "Makes fantastic coffee, love the steam wand." }
    ]
  }
};

function DetailsPage() {
    const { id } = useParams();
    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [claimed, setClaimed] = useState(false);

    useEffect(() => {
        const fetchGiftDetails = async () => {
            try {
                const res = await fetch(`/api/gifts/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setGift(data);
                    setComments(data.comments || []);
                } else {
                    const fallback = fallbackGiftsMap[id] || fallbackGiftsMap["1"];
                    setGift(fallback);
                    setComments(fallback.comments || []);
                }
            } catch (err) {
                console.log('Using local fallback item for details view:', err);
                const fallback = fallbackGiftsMap[id] || fallbackGiftsMap["1"];
                setGift(fallback);
                setComments(fallback.comments || []);
            } finally {
                setLoading(false);
            }
        };

        fetchGiftDetails();
    }, [id]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentObj = {
            author: sessionStorage.getItem('name') || 'Community Member',
            comment: newComment.trim()
        };

        setComments([...comments, commentObj]);
        setNewComment('');
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Recently';
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading gift details...</span>
                </div>
            </div>
        );
    }

    if (!gift) {
        return (
            <div className="container py-5 text-center">
                <h3>Gift Not Found</h3>
                <Link to="/app" className="btn btn-primary mt-3">Return to Catalog</Link>
            </div>
        );
    }

    return (
        <div className="details-container py-5">
            <div className="container">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/app">All Gifts</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{gift.name}</li>
                    </ol>
                </nav>

                <div className="row g-4 mb-5">
                    {/* Image Column */}
                    <div className="col-lg-6">
                        <div className="details-image-card shadow-sm rounded-4 overflow-hidden border">
                            <img
                                src={gift.image}
                                alt={gift.name}
                                className="img-fluid w-100 main-details-img"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80';
                                }}
                            />
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="col-lg-6">
                        <div className="ps-lg-3">
                            <div className="d-flex gap-2 mb-3">
                                <span className="badge bg-dark rounded-pill px-3 py-2 text-uppercase">
                                    {gift.category}
                                </span>
                                <span className="badge bg-success rounded-pill px-3 py-2">
                                    Condition: {gift.condition}
                                </span>
                            </div>

                            <h1 className="fw-bold text-dark mb-3" id="gift-detail-title">{gift.name}</h1>
                            <p className="lead text-muted mb-4">{gift.description}</p>

                            <div className="specs-card bg-light p-3 rounded-3 mb-4 border">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <span className="d-block small text-muted">Posted By</span>
                                        <strong className="text-dark">{gift.posted_by}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="d-block small text-muted">Date Added</span>
                                        <strong className="text-dark">{formatDate(gift.date_added)}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="d-block small text-muted">Item Age</span>
                                        <strong className="text-dark">{gift.age_years ? `${gift.age_years} years` : 'Less than 1 year'}</strong>
                                    </div>
                                    <div className="col-6">
                                        <span className="d-block small text-muted">Zipcode / Location</span>
                                        <strong className="text-dark">{gift.zipcode || '10001'}</strong>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex gap-3">
                                <button
                                    onClick={() => setClaimed(true)}
                                    className={`btn btn-lg rounded-pill px-4 fw-bold flex-grow-1 ${claimed ? 'btn-success' : 'btn-primary'}`}
                                    id="claim-gift-button"
                                    disabled={claimed}
                                >
                                    {claimed ? '✓ Claim Request Sent!' : '🎁 Request This Gift'}
                                </button>
                                <Link to="/app" className="btn btn-outline-secondary btn-lg rounded-pill px-4">
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h3 className="fw-bold mb-4">Community Comments & Reviews</h3>

                            {comments.length === 0 ? (
                                <p className="text-muted">No comments yet. Be the first to ask a question or leave feedback!</p>
                            ) : (
                                <div className="comments-list mb-4">
                                    {comments.map((c, index) => (
                                        <div key={index} className="comment-item p-3 rounded-3 mb-3 bg-light border">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <strong className="text-dark">{c.author || 'Visitor'}</strong>
                                                <span className="sentiment-badge sentiment-positive">
                                                    ✓ Positive Feedback
                                                </span>
                                            </div>
                                            <p className="mb-0 text-secondary">{c.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Add Comment Form */}
                            <form onSubmit={handleAddComment} className="mt-3">
                                <div className="mb-3">
                                    <label className="form-label fw-semibold">Leave a comment</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Ask a question about dimensions, pickup times, or say thanks..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark rounded-pill px-4 fw-semibold">
                                    Post Comment
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;
