import { successResponse, errorResponse } from "../../utils/response.utils.js";
import { getProfile, updateProfile, changePassword } from "./user.service.js";

// GET /api/users/me
export const me = async (req, res) => {
  try {
    const user = await getProfile(req.user.id);
    return successResponse(res, "Profile fetched", user);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// PUT /api/users/me
export const update = async (req, res) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    return successResponse(res, "Profile updated", user);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// PUT /api/users/me/change-password
export const password = async (req, res) => {
  try {
    await changePassword(req.user.id, req.body);
    return successResponse(res, "Password changed successfully");
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};