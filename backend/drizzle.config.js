// drizzle.config.js
// Tells drizzle-kit where your schema is and how to reach Neon

import dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./src/modules/**/*.model.js", // picks all models automatically
  out: "./drizzle",                       // migration files go here
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};