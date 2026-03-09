import db from "../../config/db.js";
import { notifications } from "./notification.model.js";
import { eq, and } from "drizzle-orm";

// Create a notification (called internally by other modules)
export const createNotification = async (userId, type, message) => {
  const [notification] = await db.insert(notifications).values({
    userId,
    type,
    message,
  }).returning();

  return notification;
};

// Get all notifications for a user
export const getUserNotifications = async (userId) => {
  return await db.select().from(notifications)
    .where(eq(notifications.userId, userId));
};

// Mark a single notification as read
export const markOneAsRead = async (id, userId) => {
  const [updated] = await db.update(notifications)
    .set({ isRead: true })
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
    .returning();

  if (!updated) throw new Error("Notification not found");
  return updated;
};

// Mark all notifications as read
export const markAllAsRead = async (userId) => {
  await db.update(notifications)
    .set({ isRead: true })
    .where(eq(notifications.userId, userId));
};

// Delete a notification
export const deleteNotification = async (id, userId) => {
  const [deleted] = await db.delete(notifications)
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
    .returning();

  if (!deleted) throw new Error("Notification not found");
  return deleted;
};