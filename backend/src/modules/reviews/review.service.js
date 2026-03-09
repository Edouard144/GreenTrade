import db from "../../config/db.js";
import { reviews } from "./review.model.js";
import { orders } from "../orders/order.model.js";
import { eq } from "drizzle-orm";

// Buyer leaves a review
export const createReview = async (buyerId, { orderId, farmerId, rating, comment }) => {

  // 1. Check order exists and is completed
  const [order] = await db.select().from(orders)
    .where(eq(orders.id, orderId));

  if (!order) throw new Error("Order not found");
  if (order.status !== "completed") throw new Error("Can only review completed orders");
  if (order.buyerId !== buyerId) throw new Error("This is not your order");

  // 2. Check not already reviewed
  const [existing] = await db.select().from(reviews)
    .where(eq(reviews.orderId, orderId));

  if (existing) throw new Error("You already reviewed this order");

  // 3. Create review
  const [review] = await db.insert(reviews).values({
    buyerId,
    farmerId,
    orderId,
    rating,
    comment: comment || null,
  }).returning();

  return review;
};

// Get all reviews for a farmer
export const getFarmerReviews = async (farmerId) => {
  return await db.select().from(reviews)
    .where(eq(reviews.farmerId, farmerId));
};

// Get average rating for a farmer
export const getFarmerRating = async (farmerId) => {
  const farmerReviews = await db.select().from(reviews)
    .where(eq(reviews.farmerId, farmerId));

  if (farmerReviews.length === 0) return { average: 0, total: 0 };

  const total = farmerReviews.length;
  const average = farmerReviews.reduce((sum, r) => sum + r.rating, 0) / total;

  return { average: parseFloat(average.toFixed(1)), total };
};