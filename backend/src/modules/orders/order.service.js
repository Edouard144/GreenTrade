import db from "../../config/db.js";
import { orders } from "./order.model.js";
import { products } from "../products/product.model.js";
import { eq, and } from "drizzle-orm";
import { createNotification } from "../notifications/notification.service.js";

// Buyer places an order
export const placeOrder = async (buyerId, { productId, quantity, note }) => {
  // 1. Get the product to calculate total price and get farmerId
  const [product] = await db.select().from(products)
    .where(eq(products.id, productId));

  if (!product) throw new Error("Product not found");
  if (product.quantity < quantity) throw new Error("Not enough stock available");

  // 2. Calculate total price
  const totalPrice = parseFloat(product.price) * quantity;

  // 3. Create the order
  const [order] = await db.insert(orders).values({
    buyerId,
    farmerId: product.farmerId,
    productId,
    quantity,
    totalPrice,
    note: note || null,
  }).returning();

  // 4. Notify the farmer
  await createNotification(
    product.farmerId,
    "new_order",
    `You have a new order for ${product.name} — ${quantity} ${product.unit}`
  );

  return order;
};

// Get all orders for a buyer
export const getBuyerOrders = async (buyerId) => {
  return await db.select().from(orders)
    .where(eq(orders.buyerId, buyerId));
};

// Get all orders for a farmer
export const getFarmerOrders = async (farmerId) => {
  return await db.select().from(orders)
    .where(eq(orders.farmerId, farmerId));
};

// Get single order by id
export const getOrderById = async (id) => {
  const [order] = await db.select().from(orders)
    .where(eq(orders.id, id));

  if (!order) throw new Error("Order not found");
  return order;
};

// Farmer updates order status
export const updateOrderStatus = async (id, farmerId, status) => {
  const allowed = ["accepted", "in_progress", "delivered", "completed", "rejected"];
  if (!allowed.includes(status)) throw new Error("Invalid status");

  const [updated] = await db.update(orders)
    .set({ status })
    .where(and(eq(orders.id, id), eq(orders.farmerId, farmerId)))
    .returning();

  if (!updated) throw new Error("Order not found or not yours");

  // Notify the buyer
  await createNotification(
    updated.buyerId,
    "order_update",
    `Your order status has been updated to: ${status}`
  );

  return updated;
};

// Buyer cancels an order (only if still pending)
export const cancelOrder = async (id, buyerId) => {
  const [order] = await db.select().from(orders)
    .where(and(eq(orders.id, id), eq(orders.buyerId, buyerId)));

  if (!order) throw new Error("Order not found");
  if (order.status !== "pending") throw new Error("Only pending orders can be cancelled");

  const [cancelled] = await db.update(orders)
    .set({ status: "cancelled" })
    .where(eq(orders.id, id))
    .returning();

  return cancelled;
};
