import db from "../../config/db.js";
import { users } from "./user.model.js";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword } from "../../utils/hash.utils.js";

// Get my profile
export const getProfile = async (userId) => {
  const [user] = await db.select({
    id:        users.id,
    name:      users.name,
    email:     users.email,
    role:      users.role,
    location:  users.location,
    phone:     users.phone,
    createdAt: users.createdAt,
    // password excluded
  }).from(users).where(eq(users.id, userId));

  if (!user) throw new Error("User not found");
  return user;
};

// Update my profile
export const updateProfile = async (userId, { name, location, phone }) => {
  const [updated] = await db.update(users)
    .set({
      ...(name     && { name }),
      ...(location && { location }),
      ...(phone    && { phone }),
    })
    .where(eq(users.id, userId))
    .returning({
      id:        users.id,
      name:      users.name,
      email:     users.email,
      role:      users.role,
      location:  users.location,
      phone:     users.phone,
      createdAt: users.createdAt,
    });

  if (!updated) throw new Error("User not found");
  return updated;
};

// Change password
export const changePassword = async (userId, { currentPassword, newPassword }) => {

  // 1. Get user with password
  const [user] = await db.select().from(users)
    .where(eq(users.id, userId));

  if (!user) throw new Error("User not found");

  // 2. Check current password is correct
  const isMatch = await comparePassword(currentPassword, user.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  // 3. Hash new password and save
  const hashed = await hashPassword(newPassword);

  await db.update(users)
    .set({ password: hashed })
    .where(eq(users.id, userId));
};