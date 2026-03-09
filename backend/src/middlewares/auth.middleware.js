// src/middlewares/auth.middleware.js
// Checks if the request has a valid JWT token
// Attaches the user info to req.user for next middleware/controller

import { verifyToken } from "../utils/jwt.utils.js";
import { errorResponse } from "../utils/response.utils.js";

export const protect = (req, res, next) => {
  // Token comes in the header like: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Not authorized, no token", 401);
  }

  const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

  try {
    const decoded = verifyToken(token); // { id, role, iat, exp }
    req.user = decoded;                 // attach to request
    next();                             // move to next middleware/controller
  } catch (err) {
    return errorResponse(res, "Token invalid or expired", 401);
  }
};