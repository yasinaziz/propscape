import React from 'react';

const AdvertisementCard: React.FC = () => (
  <div style={{
    background: '#f9f9f9',
    borderRadius: 12,
    padding: 24,
    boxShadow: '0 2px 8px #eee',
    textAlign: 'center'
  }}>
    <h3>Advertisement</h3>
    <p>Your ad here!</p>
    <img src="https://placehold.co/300x200?text=Ad" alt="Ad" style={{ width: '100%', borderRadius: 8 }} />
  </div>
);

export default AdvertisementCard;