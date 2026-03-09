import { pgTable, uuid, varchar, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.model.js";

export const products = pgTable("products", {
  id:          uuid("id").defaultRandom().primaryKey(),
  farmerId:    uuid("farmer_id").notNull().references(() => users.id),
  name:        varchar("name", { length: 150 }).notNull(),
  category:    varchar("category", { length: 100 }).notNull(), // grains, vegetables, fruits, dairy
  description: text("description"),
  price:       numeric("price", { precision: 10, scale: 2 }).notNull(),
  quantity:    integer("quantity").notNull(),
  unit:        varchar("unit", { length: 50 }).notNull(),      // kg, liters, bags
  location:    varchar("location", { length: 150 }),
  imageUrl:    text("image_url"),
  status:      varchar("status", { length: 20 }).default("available"), // available, out_of_stock
  createdAt:   timestamp("created_at").defaultNow(),
});