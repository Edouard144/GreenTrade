// src/modules/auth/auth.service.js
// Contains all the business logic for auth

import db from "../../config/db.js";
import { users } from "../users/user.model.js";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/hash.utils.js";
import { generateToken } from "../../utils/jwt.utils.js";

// --- REGISTER ---
export const registerUser = async ({ name, email, password, role, location, phone }) => {

  // 1. Check if email already exists
  const existing = await db.select().from(users).where(eq(users.email, email));
  if (existing.length > 0) throw new Error("Email already registered");

  // 2. Hash the password
  const hashed = await hashPassword(password);

  // 3. Insert user into DB
  const [newUser] = await db.insert(users).values({
    name, email, password: hashed, role, location, phone
  }).returning(); // returning() gives back the created row

  // 4. Generate JWT token
  const token = generateToken({ id: newUser.id, role: newUser.role });

  return { user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role }, token };
};

// --- LOGIN ---
export const loginUser = async ({ email, password }) => {

  // 1. Find user by email
  const [user] = await db.select().from(users).where(eq(users.email, email));
  if (!user) throw new Error("Invalid email or password");

  // 2. Compare passwords
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // 3. Generate JWT token
  const token = generateToken({ id: user.id, role: user.role });

  return { user: { id: user.id, name: user.name, email: user.email, role: user.role }, token };
};