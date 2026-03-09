import db from "../../config/db.js";
import { users } from "../users/user.model.js";
import { products } from "../products/product.model.js";
import { orders } from "../orders/order.model.js";
import { reviews } from "../reviews/review.model.js";
import { eq } from "drizzle-orm";

// Get all users
export const getAllUsers = async () => {
  return await db.select({
    id:        users.id,
    name:      users.name,
    email:     users.email,
    role:      users.role,
    location:  users.location,
    phone:     users.phone,
    createdAt: users.createdAt,
    // password is excluded for security
  }).from(users);
};

// Get single user
export const getUserById = async (id) => {
  const [user] = await db.select({
    id:        users.id,
    name:      users.name,
    email:     users.email,
    role:      users.role,
    location:  users.location,
    createdAt: users.createdAt,
  }).from(users).where(eq(users.id, id));

  if (!user) throw new Error("User not found");
  return user;
};

// Delete a user
export const deleteUser = async (id) => {
  const [deleted] = await db.delete(users)
    .where(eq(users.id, id))
    .returning();

  if (!deleted) throw new Error("User not found");
  return deleted;
};

// Get all products
export const getAllProducts = async () => {
  return await db.select().from(products);
};

// Delete any product
export const deleteProduct = async (id) => {
  const [deleted] = await db.delete(products)
    .where(eq(products.id, id))
    .returning();

  if (!deleted) throw new Error("Product not found");
  return deleted;
};

// Get all orders
export const getAllOrders = async () => {
  return await db.select().from(orders);
};

// Get all reviews
export const getAllReviews = async () => {
  return await db.select().from(reviews);
};

// Delete a review
export const deleteReview = async (id) => {
  const [deleted] = await db.delete(reviews)
    .where(eq(reviews.id, id))
    .returning();

  if (!deleted) throw new Error("Review not found");
  return deleted;
};

// Platform stats summary
export const getPlatformStats = async () => {
  const allUsers    = await db.select().from(users);
  const allProducts = await db.select().from(products);
  const allOrders   = await db.select().from(orders);
  const allReviews  = await db.select().from(reviews);

  return {
    totalUsers:    allUsers.length,
    totalFarmers:  allUsers.filter(u => u.role === "farmer").length,
    totalBuyers:   allUsers.filter(u => u.role === "buyer").length,
    totalProducts: allProducts.length,
    totalOrders:   allOrders.length,
    totalReviews:  allReviews.length,
    ordersByStatus: {
      pending:     allOrders.filter(o => o.status === "pending").length,
      accepted:    allOrders.filter(o => o.status === "accepted").length,
      in_progress: allOrders.filter(o => o.status === "in_progress").length,
      delivered:   allOrders.filter(o => o.status === "delivered").length,
      completed:   allOrders.filter(o => o.status === "completed").length,
      cancelled:   allOrders.filter(o => o.status === "cancelled").length,
      rejected:    allOrders.filter(o => o.status === "rejected").length,
    }
  };
};