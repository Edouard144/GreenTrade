// src/modules/users/user.model.js
// Defines the users table structure in the database

import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id:         uuid("id").defaultRandom().primaryKey(),
  name:       varchar("name", { length: 100 }).notNull(),
  email:      varchar("email", { length: 150 }).notNull().unique(),
  password:   text("password").notNull(),

  // Role controls what the user can do
  // "farmer" can list products, "buyer" can order, "admin" manages all
  role:       varchar("role", { length: 20 }).notNull().default("buyer"),

  location:   varchar("location", { length: 150 }),
  phone:      varchar("phone", { length: 20 }),
  createdAt:  timestamp("created_at").defaultNow(),
});