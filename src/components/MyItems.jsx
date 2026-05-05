import React, { useState, useEffect, useCallback } from 'react';
import Navbar from "./Navbar";
import axios from "axios";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    
    // 1. Safety Check: Get user data safely
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;

    // 2. Wrap fetch in useCallback to satisfy dependency rules
    const fetchUserItems = useCallback(async () => {
        if (!user || !user.user_id) return;

        try {
            setLoading(true);
            const response = await axios.get(`https://quincyj.alwaysdata.net/api/my_items/${user.user_id}`);
            setItems(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching your items:", error);
            setErrorMessage("Could not load your items. Please try again later.");
            setLoading(false);
        }
    }, [user?.user_id]); // Only recreate if user_id changes

    useEffect(() => {
        fetchUserItems();
    }, [fetchUserItems]);

    // 3. Prevent white screen: If no user, show a friendly message instead of crashing
    if (!user) {
        return (
            <div>
                <Navbar />
                <div className="container text-center mt-5">
                    <div className="alert alert-warning">
                        <h4>Access Denied</h4>
                        <p>You must be signed in to view your items.</p>
                        <a href="/signin" className="btn btn-primary">Sign In</a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">My Listed Items</h2>
                    <span className="badge bg-primary fs-6">{items.length} Items Found</span>
                </div>

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : items.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {items.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 shadow-sm border-0 rounded-3">
                                    <img 
                                        src={item.image_url} 
                                        className="card-img-top" 
                                        alt={item.item_name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=No+Image"; }}
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <h5 className="card-title text-truncate">{item.item_name}</h5>
                                            <span className="text-success fw-bold">KES {item.item_cost}</span>
                                        </div>
                                        <p className="card-text text-muted small" style={{ height: '40px', overflow: 'hidden' }}>
                                            {item.item_description}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-white border-0 d-flex gap-2 pb-3">
                                        <button className="btn btn-outline-secondary btn-sm w-100">Edit</button>
                                        <button className="btn btn-outline-danger btn-sm w-100">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 bg-light rounded-4">
                        <h4 className="text-secondary">You haven't listed any items yet.</h4>
                        <p>Ready to sell? Click "Add Item" in the menu.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyItems;