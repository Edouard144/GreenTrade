// Creates and verifies JWT tokens
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

// Generate a token for a logged-in user
export const generateToken = (payload) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: "7d" });
};

// Verify a token (used in middleware)
export const verifyToken = (token) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};