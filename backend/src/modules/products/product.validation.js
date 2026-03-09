import { body } from "express-validator";

export const productValidation = [
  body("name").notEmpty().withMessage("Product name is required"),
  body("category").notEmpty().withMessage("Category is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("unit").notEmpty().withMessage("Unit is required"),
];