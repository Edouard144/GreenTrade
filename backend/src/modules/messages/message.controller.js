import { successResponse, errorResponse } from "../../utils/response.utils.js";
import { sendMessage, getConversation, getInbox, markAsRead } from "./message.service.js";

// POST /api/messages
export const send = async (req, res) => {
  try {
    const message = await sendMessage(req.user.id, req.body);
    return successResponse(res, "Message sent", message, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/messages/inbox
export const inbox = async (req, res) => {
  try {
    const data = await getInbox(req.user.id);
    return successResponse(res, "Inbox fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/messages/:otherUserId
export const conversation = async (req, res) => {
  try {
    const data = await getConversation(req.user.id, req.params.otherUserId);
    return successResponse(res, "Conversation fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// PUT /api/messages/:senderId/read
export const markRead = async (req, res) => {
  try {
    await markAsRead(req.params.senderId, req.user.id);
    return successResponse(res, "Messages marked as read");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};