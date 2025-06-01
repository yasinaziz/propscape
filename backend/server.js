const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());

const houses = [
  {
    id: '1',
    title: 'Luxury Condo in KLCC',
    description: 'A stunning 3-bedroom condo with a view of the Petronas Towers.',
    currentBid: 2200000,
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Jalan Ampang, Kuala Lumpur, Malaysia',
    bedrooms: 3,
    bathrooms: 2,
    area: 1450,
  },
  {
    id: '2',
    title: 'Modern Terrace in Bangsar',
    description: 'Spacious terrace house in the heart of Bangsar, close to cafes and shops.',
    currentBid: 1350000,
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Lorong Maarof, Bangsar, Kuala Lumpur, Malaysia',
    bedrooms: 4,
    bathrooms: 3,
    area: 1800,
  },
  {
    id: '3',
    title: 'Semi-D in Johor Bahru',
    description: 'Beautiful semi-detached house with a large garden and car porch.',
    currentBid: 950000,
    images: [
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1503389152951-9c3d8b6e7f86?auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Taman Molek, Johor Bahru, Johor, Malaysia',
    bedrooms: 5,
    bathrooms: 4,
    area: 2600,
  },
  {
    id: '4',
    title: 'Condo in Penang',
    description: 'Seaside condo with panoramic views of the Straits of Malacca.',
    currentBid: 1200000,
    images: [
      'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Gurney Drive, George Town, Penang, Malaysia',
    bedrooms: 3,
    bathrooms: 2,
    area: 1300,
  },
  {
    id: '5',
    title: 'Bungalow in Shah Alam',
    description: 'Exclusive bungalow with private pool and spacious compound.',
    currentBid: 3200000,
    images: [
      'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80'
    ],
    location: 'Section 13, Shah Alam, Selangor, Malaysia',
    bedrooms: 6,
    bathrooms: 5,
    area: 4200,
  }
];

app.get('/api/houses', (req, res) => {
  res.json(houses);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});