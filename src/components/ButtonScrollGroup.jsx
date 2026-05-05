import React, { useState, useEffect } from 'react';

const ButtonScrollGroup = () => {
  const [products, setProducts] = useState([]); // Database items go here
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(true);

  // Categories list (usually static, but could also be fetched)
  const categories = ['All', 'Clothing', 'Electronics', 'Power Tools', 'Kitchen', 'Cameras', 'Sports', 'Music', 'Books', 'Gardening', 'Toys', 'Others'];

  // This runs ONCE when the component first appears (mounts)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await fetch('https://quincyj.alwaydata.net/get_products');
        const data = await response.json();
        
        setProducts(data); // Save the database items into state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Empty array means "only run once"

  // Filter logic remains the same
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(item => item.category === activeTab);

  if (loading) return <p>Loading products...</p>;

  return (
    <div style={{ padding: '20px' }}>
      {/* Scrollable Buttons */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '10px', marginBottom: '20px' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            style={{
              flex: '0 0 auto',
              padding: '10px 20px',
              borderRadius: '20px',
              backgroundColor: activeTab === cat ? '#007bff' : '#f0f0f0',
              color: activeTab === cat ? '#fff' : '#000',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Displaying the Data */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {filteredProducts.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonScrollGroup;