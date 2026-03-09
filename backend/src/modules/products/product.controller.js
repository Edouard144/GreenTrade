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
    // If image was uploaded, build its public URL
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const product = await createProduct(req.user.id, { ...req.body, imageUrl });
    return successResponse(res, "Product created", product, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/products
export const getAll = async (req, res) => {
  try {

    // req.body is the one that contains all URLs.
    const data = await getAllProducts(req.query);
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
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : undefined; // undefined means don't overwrite existing image

    // Whitelist allowed fields to prevent mass assignment
    const { name, category, description, price, quantity, unit, location } = req.body;
    const data = { name, category, description, price, quantity, unit, location };
    if (imageUrl !== undefined) data.imageUrl = imageUrl;

    const product = await updateProduct(req.params.id, req.user.id, data);
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