import { pgTable, uuid, integer, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.model.js";
import { orders } from "../orders/order.model.js";

export const reviews = pgTable("reviews", {
  id:         uuid("id").defaultRandom().primaryKey(),
  buyerId:    uuid("buyer_id").notNull().references(() => users.id),
  farmerId:   uuid("farmer_id").notNull().references(() => users.id),
  orderId:    uuid("order_id").notNull().references(() => orders.id).unique(), // one review per order
  rating:     integer("rating").notNull(),   // 1 to 5
  comment:    text("comment"),
  createdAt:  timestamp("created_at").defaultNow(),
});