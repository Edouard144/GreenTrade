// src/config/db.js
// Connects to Neon PostgreSQL using pg + drizzle

import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Create a connection pool using your Neon DB URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Required by Neon
});

// Wrap the pool with Drizzle for query building
const db = drizzle(pool);

export default db;