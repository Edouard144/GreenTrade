import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  updateProduct,
  deleteProduct,
} from "./product.service.js";

// POST /api/products
export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array()[0].msg, 422);

  try {
    const product = await createProduct(req.user.id, req.body);
    return successResponse(res, "Product created", product, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/products
export const getAll = async (req, res) => {
  try {
    const data = await getAllProducts();
    return successResponse(res, "Products fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/products/:id
export const getOne = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    return successResponse(res, "Product fetched", product);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// GET /api/products/farmer/my-products
export const getMine = async (req, res) => {
  try {
    const data = await getMyProducts(req.user.id);
    return successResponse(res, "Your products fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// PUT /api/products/:id
export const update = async (req, res) => {
  try {
    const product = await updateProduct(req.params.id, req.user.id, req.body);
    return successResponse(res, "Product updated", product);
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};

// DELETE /api/products/:id
export const remove = async (req, res) => {
  try {
    await deleteProduct(req.params.id, req.user.id);
    return successResponse(res, "Product deleted");
  } catch (err) {
    return errorResponse(res, err.message, 404);
  }
};