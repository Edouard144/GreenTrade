// src/middlewares/role.middleware.js
// Checks if the logged-in user has the required role
// Always used AFTER protect middleware

import { errorResponse } from "../utils/response.utils.js";

// Usage: authorize("admin") or authorize("farmer", "admin")
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user was set by protect middleware
    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(
        res,
        `Access denied. Only ${allowedRoles.join(" or ")} can do this`,
        403
      );
    }
    next();
  };
};