import { pgTable, uuid, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.model.js";

export const notifications = pgTable("notifications", {
  id:        uuid("id").defaultRandom().primaryKey(),
  userId:    uuid("user_id").notNull().references(() => users.id), // who receives it
  type:      varchar("type", { length: 50 }).notNull(),
  // types: new_order, order_update, new_message, review, account_alert
  message:   text("message").notNull(),
  isRead:    boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});