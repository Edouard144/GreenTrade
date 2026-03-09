import { pgTable, uuid, integer, numeric, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { users } from "../users/user.model.js";
import { products } from "../products/product.model.js";

export const orders = pgTable("orders", {
  id:          uuid("id").defaultRandom().primaryKey(),
  buyerId:     uuid("buyer_id").notNull().references(() => users.id),
  farmerId:    uuid("farmer_id").notNull().references(() => users.id),
  productId:   uuid("product_id").notNull().references(() => products.id),
  quantity:    integer("quantity").notNull(),
  totalPrice:  numeric("total_price", { precision: 10, scale: 2 }).notNull(),
  status:      varchar("status", { length: 20 }).default("pending"),
  // pending → accepted → in_progress → delivered → completed
  note:        text("note"),  // buyer can add a message with the order
  createdAt:   timestamp("created_at").defaultNow(),
});