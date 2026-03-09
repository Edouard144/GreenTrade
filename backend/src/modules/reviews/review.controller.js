import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../../utils/response.utils.js";
import { createReview, getFarmerReviews, getFarmerRating } from "./review.service.js";

// POST /api/reviews
export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return errorResponse(res, errors.array()[0].msg, 422);

  try {
    const review = await createReview(req.user.id, req.body);
    return successResponse(res, "Review submitted", review, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/reviews/farmer/:farmerId
export const getReviews = async (req, res) => {
  try {
    const data = await getFarmerReviews(req.params.farmerId);
    return successResponse(res, "Reviews fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// GET /api/reviews/farmer/:farmerId/rating
export const getRating = async (req, res) => {
  try {
    const data = await getFarmerRating(req.params.farmerId);
    return successResponse(res, "Rating fetched", data);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};