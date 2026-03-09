import { pgTable, uuid, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "../users/user.model.js";

export const messages = pgTable("messages", {
  id:         uuid("id").defaultRandom().primaryKey(),
  senderId:   uuid("sender_id").notNull().references(() => users.id),
  receiverId: uuid("receiver_id").notNull().references(() => users.id),
  content:    text("content").notNull(),
  isRead:     boolean("is_read").default(false), // true when receiver opens it
  createdAt:  timestamp("created_at").defaultNow(),
});