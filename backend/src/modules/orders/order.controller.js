import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import {
  placeOrder,
  getBuyerOrders,
  getFarmerOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "./order.service.js";

// POST /api/orders
export const place = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array()[0].msg, 422);

  try {
    const order = await placeOrder(req.user.id, req.body);
    return successResponse(res, "Order placed", order, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/orders/my-orders (buyer)
export const getMyBuyerOrders = async (req, res) => {
  try {
    const data = await getBuyerOrders(req.user.id);
    return successResponse(res, "Your orders fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/orders/farmer-orders (farmer)
export const getMyFarmerOrders = async (req, res) => {
  try {
    const data = await getFarmerOrders(req.user.id);
    return successResponse(res, "Incoming orders fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/orders/:id
export const getOne = async (req, res) => {
  try {
    const order = await getOrderById(req.params.id);
    return successResponse(res, "Order fetched", order);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// PUT /api/orders/:id/status (farmer updates status)
export const updateStatus = async (req, res) => {
  try {
    const order = await updateOrderStatus(req.params.id, req.user.id, req.body.status);
    return successResponse(res, "Order status updated", order);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// PUT /api/orders/:id/cancel (buyer cancels)
export const cancel = async (req, res) => {
  try {
    const order = await cancelOrder(req.params.id, req.user.id);
    return successResponse(res, "Order cancelled", order);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};