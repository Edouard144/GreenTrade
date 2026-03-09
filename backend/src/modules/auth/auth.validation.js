// src/modules/auth/auth.validation.js
// Checks user input before it reaches the database

import { body } from "express-validator";

export const registerValidation = [
  body("name")
    .notEmpty().withMessage("Name is required"),

  body("email")
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),

  body("role")
    .isIn(["farmer", "buyer"]).withMessage("Role must be farmer or buyer"),
];

export const loginValidation = [
  body("email")
    .isEmail().withMessage("Valid email is required"),

  body("password")
    .notEmpty().withMessage("Password is required"),
];