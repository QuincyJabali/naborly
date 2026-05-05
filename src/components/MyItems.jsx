import React, { useState, useEffect, useCallback } from 'react';
import Navbar from "./Navbar";
import axios from "axios";

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Get the logged-in user from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

   useEffect(() => {
    if (user && user.user_id) {
        fetchUserItems();
    }
}, [user, fetchUserItems]); // React is now happy because these are tracked

   const fetchUserItems = useCallback(async () => {
    try {
        const response = await axios.get(`https://quincyj.alwaysdata.net/api/my_items/${user.user_id}`);
        setItems(response.data);
        setLoading(false);
    } catch (error) {
        console.error("Error fetching your items:", error);
        setLoading(false);
    }
}, [user.user_id]); // This function only changes if the user_id changes

    if (!user) {
        return (
            <div className="text-center mt-5">
                <Navbar />
                <h3>Please sign in to view your items.</h3>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold">My Listed Items</h2>
                    <span className="badge bg-primary">{items.length} Items</span>
                </div>

                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                ) : items.length > 0 ? (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {items.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <img 
                                        src={item.image_url} 
                                        className="card-img-top" 
                                        alt={item.item_name}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <h5 className="card-title">{item.item_name}</h5>
                                            <span className="text-success fw-bold">KES {item.item_cost}</span>
                                        </div>
                                        <p className="card-text text-muted small">{item.item_description}</p>
                                    </div>
                                    <div className="card-footer bg-white border-0 d-flex gap-2">
                                        <button className="btn btn-outline-secondary btn-sm w-100">Edit</button>
                                        <button className="btn btn-outline-danger btn-sm w-100">Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-5 shadow-sm bg-light rounded">
                        <h4>You haven't listed any items yet.</h4>
                        <p className="text-muted">Start selling by adding your first product!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyItems;