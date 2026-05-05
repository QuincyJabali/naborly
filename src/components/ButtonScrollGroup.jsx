import React, { useState, useEffect } from 'react';

// Centralized list - keep this identical in AddItem.jsx
export const CATEGORIES = ['All', 'Clothing', 'Electronics', 'Power Tools', 'Kitchen', 'Cameras', 'Sports', 'Music', 'Books', 'Gardening', 'Toys', 'Others'];

const ButtonScrollGroup = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://quincyj.alwaysdata.net/api/get_items');
        const data = await response.json();
        setProducts(data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Matching logic: item.item_category (from DB) vs activeTab (from Button)
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(item => item.item_category === activeTab);

  if (loading) return <p style={{ textAlign: 'center', padding: '20px' }}>Loading products...</p>;

  return (
    <div style={{ padding: '10px' }}>
      {/* Scrollable Buttons */}
      <div className="scroll-container" style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px', paddingBottom: '10px', scrollbarWidth: 'none' }}>
        <style>{`.scroll-container::-webkit-scrollbar { display: none; }`}</style>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              flex: '0 0 auto',
              padding: '8px 20px',
              borderRadius: '25px',
              backgroundColor: activeTab === cat ? '#007bff' : '#fff',
              color: activeTab === cat ? '#fff' : '#555',
              border: activeTab === cat ? 'none' : '1px solid #ddd',
              fontWeight: '500',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '15px' }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <img 
              src={item.image_url || 'https://via.placeholder.com/150'} 
              alt={item.item_name} 
              style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <h5 style={{ margin: '10px 0 5px', fontSize: '16px' }}>{item.item_name}</h5>
            <p style={{ fontSize: '12px', color: '#777', height: '35px', overflow: 'hidden' }}>{item.item_description}</p>
            <p style={{ fontWeight: 'bold', color: '#28a745', marginBottom: '0' }}>KES {item.item_cost}</p>
            <span className="badge bg-light text-dark" style={{ fontSize: '10px' }}>{item.item_category}</span>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          <h5>No items found in {activeTab}</h5>
          <p>Be the first to add something to this category!</p>
        </div>
      )}
    </div>
  );
};

export default ButtonScrollGroup;