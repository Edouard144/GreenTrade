// src/middlewares/error.middleware.js
// Global error handler — catches any error passed via next(err)
// Must have 4 parameters to work as error middleware in Express

export const errorMiddleware = (err, req, res, next) => {

  // Log error in development
  console.error(`[ERROR] ${err.message}`);

  // Multer errors (file upload issues)
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired, please login again",
    });
  }

  // Drizzle / PostgreSQL errors
  if (err.code === "23505") {
    return res.status(409).json({
      success: false,
      message: "Duplicate entry — this record already exists",
    });
  }

  if (err.code === "23503") {
    return res.status(400).json({
      success: false,
      message: "Referenced record not found",
    });
  }

  // Default error — unknown/unhandled
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

// 404 handler — route not found
export const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
};