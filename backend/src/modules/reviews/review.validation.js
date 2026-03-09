import { body } from "express-validator";

export const reviewValidation = [
  body("orderId").notEmpty().withMessage("Order ID is required"),
  body("farmerId").notEmpty().withMessage("Farmer ID is required"),
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("comment").optional().isString(),
];
