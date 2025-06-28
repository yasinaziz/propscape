import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
  user: process.env.PGUSER!,
  host: process.env.PGHOST!,
  database: process.env.PGDATABASE!,
  password: process.env.PGPASSWORD!,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
});

export default pool;