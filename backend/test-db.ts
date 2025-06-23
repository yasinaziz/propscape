import pool from './db';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

testConnection();