import { successResponse, errorResponse } from "../../utils/response.utils.js";
import {
  getUserNotifications,
  markOneAsRead,
  markAllAsRead,
  deleteNotification,
} from "./notification.service.js";

// GET /api/notifications
export const getAll = async (req, res) => {
  try {
    const data = await getUserNotifications(req.user.id);
    return successResponse(res, "Notifications fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// PUT /api/notifications/:id/read
export const readOne = async (req, res) => {
  try {
    const data = await markOneAsRead(req.params.id, req.user.id);
    return successResponse(res, "Notification marked as read", data);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// PUT /api/notifications/read-all
export const readAll = async (req, res) => {
  try {
    await markAllAsRead(req.user.id);
    return successResponse(res, "All notifications marked as read");
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// DELETE /api/notifications/:id
export const remove = async (req, res) => {
  try {
    await deleteNotification(req.params.id, req.user.id);
    return successResponse(res, "Notification deleted");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};