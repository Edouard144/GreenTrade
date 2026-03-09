import { successResponse, errorResponse } from "../../utils/response.utils.js";
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getAllProducts,
  deleteProduct,
  getAllOrders,
  getAllReviews,
  deleteReview,
  getPlatformStats,
} from "./admin.service.js";

// GET /api/admin/stats
export const stats = async (req, res) => {
  try {
    const data = await getPlatformStats();
    return successResponse(res, "Platform stats", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/admin/users
export const getUsers = async (req, res) => {
  try {
    const data = await getAllUsers();
    return successResponse(res, "All users fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/admin/users/:id
export const getUser = async (req, res) => {
  try {
    const data = await getUserById(req.params.id);
    return successResponse(res, "User fetched", data);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// DELETE /api/admin/users/:id
export const removeUser = async (req, res) => {
  try {
    await deleteUser(req.params.id);
    return successResponse(res, "User deleted");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// GET /api/admin/products
export const getProducts = async (req, res) => {
  try {
    const data = await getAllProducts();
    return successResponse(res, "All products fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// DELETE /api/admin/products/:id
export const removeProduct = async (req, res) => {
  try {
    await deleteProduct(req.params.id);
    return successResponse(res, "Product deleted");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// GET /api/admin/orders
export const getOrders = async (req, res) => {
  try {
    const data = await getAllOrders();
    return successResponse(res, "All orders fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/admin/reviews
export const getReviews = async (req, res) => {
  try {
    const data = await getAllReviews();
    return successResponse(res, "All reviews fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// DELETE /api/admin/reviews/:id
export const removeReview = async (req, res) => {
  try {
    await deleteReview(req.params.id);
    return successResponse(res, "Review deleted");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};