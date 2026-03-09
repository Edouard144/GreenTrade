// Handles password hashing and comparing
import bcrypt from "bcryptjs";

// Hash a plain password before saving
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare plain password with stored hash
export const comparePassword = async (password, hash) => {
  return bcrypt.compare(password, hash);
};