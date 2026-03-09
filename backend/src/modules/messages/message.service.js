import db from "../../config/db.js";
import { messages } from "./message.model.js";
import { eq, or, and } from "drizzle-orm";

// Send a message
export const sendMessage = async (senderId, { receiverId, content }) => {
  const [message] = await db.insert(messages).values({
    senderId,
    receiverId,
    content,
  }).returning();

  return message;
};

// Get conversation between two users
export const getConversation = async (userId, otherUserId) => {
  return await db.select().from(messages)
    .where(
      or(
        // messages I sent to them
        and(eq(messages.senderId, userId), eq(messages.receiverId, otherUserId)),
        // messages they sent to me
        and(eq(messages.senderId, otherUserId), eq(messages.receiverId, userId))
      )
    );
};

// Get all conversations (inbox) — unique people I talked with
export const getInbox = async (userId) => {
  return await db.select().from(messages)
    .where(
      or(
        eq(messages.senderId, userId),
        eq(messages.receiverId, userId)
      )
    );
};

// Mark messages as read
export const markAsRead = async (senderId, receiverId) => {
  await db.update(messages)
    .set({ isRead: true })
    .where(
      and(eq(messages.senderId, senderId), eq(messages.receiverId, receiverId))
    );
};