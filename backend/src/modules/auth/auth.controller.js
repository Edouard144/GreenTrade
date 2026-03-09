// src/modules/auth/auth.controller.js
// Receives HTTP requests, calls service, sends response

import { registerUser, loginUser } from "./auth.service.js";
import { validationResult } from "express-validator";
import { successResponse, errorResponse } from "../../utils/response.utils.js";

// POST /api/auth/register
export const register = async (req, res) => {
  // Check validation errors from auth.validation.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, 422);
  }

  try {
    const result = await registerUser(req.body);
    return successResponse(res, "Registration successful", result, 201);
  } catch (err) {
    return errorResponse(res, err.message);
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array()[0].msg, 422);
  }

  try {
    const result = await loginUser(req.body);
    return successResponse(res, "Login successful", result);
  } catch (err) {
    return errorResponse(res, err.message, 401);
  }
};
