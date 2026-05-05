import React, { useState } from 'react';
import Navbar from "./Navbar";

// 1. Centralized categories - Exactly matching ButtonScrollGroup
// We filter out 'All' because you don't assign an item to 'All' in the database
const CATEGORIES = [
    'Clothing', 'Electronics', 'Power Tools', 'Kitchen', 'Cameras', 
    'Sports', 'Music', 'Books', 'Gardening', 'Toys', 'Others'
];

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemCategory, setItemCategory] = useState(CATEGORIES[0]); // Default: Clothing
    const [itemCost, setItemCost] = useState('');
    const [itemImage, setItemImage] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Uploading...");
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));


        // 2. FormData is used to handle the image file upload to Flask
        const formData = new FormData();
        formData.append('item_name', itemName);
        formData.append('item_description', itemDescription);
        formData.append('item_category', itemCategory); // This string now matches the filter buttons
        formData.append('item_cost', itemCost);
        formData.append('item_image', itemImage);
        formData.append('user_id', user.user_id); // Add this line!

        try {
            const response = await fetch('https://quincyj.alwaysdata.net/api/add_item', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            setLoading(false);
            
            if (response.ok) {
                setMessage("Success! Your item is now live.");
                // Reset states
                setItemName('');
                setItemDescription('');
                setItemCost('');
                setItemImage(null);
                // 3. This resets the file input name in the browser UI
                e.target.reset(); 
            } else {
                setMessage(data.message || "Failed to add product.");
            }
        } catch (error) {
            console.error("Error adding item:", error);
            setLoading(false);
            setMessage("Server connection error. Please try again.");
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Navbar/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 card shadow-sm mt-5 p-4 border-0 rounded-4">
                        <h2 className="text-center mb-4 fw-bold">Post New Item</h2>
                        
                        {message && (
                            <div className={`alert ${message.includes('Success') ? 'alert-success' : 'alert-info'} border-0 shadow-sm`}>
                                {message}
                            </div>
                        )}
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Item Name</label>
                                <input 
                                    type="text" className="form-control" placeholder="e.g. Vintage Camera"
                                    value={itemName} onChange={(e) => setItemName(e.target.value)} required 
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Description</label>
                                <textarea 
                                    className="form-control" rows="3" placeholder="Describe the item's condition and features..."
                                    value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required 
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Category</label>
                                    <select 
                                        className="form-select" 
                                        value={itemCategory} 
                                        onChange={(e) => setItemCategory(e.target.value)}
                                    >
                                        {/* 4. Mapping ensures no typos between the list and the dropdown */}
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Price (KES)</label>
                                    <input 
                                        type="number" className="form-control" placeholder="5000"
                                        value={itemCost} onChange={(e) => setItemCost(e.target.value)} required 
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Product Image</label>
                                <input 
                                    type="file" className="form-control" 
                                    onChange={(e) => setItemImage(e.target.files[0])} required 
                                />
                                <small className="text-muted">High-quality images sell faster!</small>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                                disabled={loading}
                            >
                                {loading ? "Uploading..." : "List Item Now"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddItem;