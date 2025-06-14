const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_pg_user',      // <-- replace with your PostgreSQL username
  host: 'localhost',
  database: 'propscape',
  password: 'your_pg_password', // <-- replace with your PostgreSQL password
  port: 5432,
});

const houses = [
  {
    title: 'Savanna Condo',
    description: 'A beautiful condo in the city.',
    current_bid: 500000,
    rental_bid: 2000,
    image: 'https://via.placeholder.com/400x300',
    location: 'Kuala Lumpur',
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    type: 'Condo'
  },
  {
    title: 'Bungalow Villa',
    description: 'Spacious bungalow with garden.',
    current_bid: 1200000,
    rental_bid: 5000,
    image: 'https://via.placeholder.com/400x300',
    location: 'Petaling Jaya',
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    type: 'Bungalow'
  }
  // Add more sample houses as needed
];

async function seed() {
  try {
    await pool.query('TRUNCATE TABLE houses RESTART IDENTITY CASCADE');
    for (const house of houses) {
      await pool.query(
        `INSERT INTO houses 
          (title, description, current_bid, rental_bid, image, location, bedrooms, bathrooms, area, type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          house.title,
          house.description,
          house.current_bid,
          house.rental_bid,
          house.image,
          house.location,
          house.bedrooms,
          house.bathrooms,
          house.area,
          house.type
        ]
      );
    }
    console.log('PostgreSQL database seeded!');
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    await pool.end();
  }
}

seed();