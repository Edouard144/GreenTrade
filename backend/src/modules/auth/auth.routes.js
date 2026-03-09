import { Router } from "express";
import { register, login } from "./auth.controller.js";
import { registerValidation, loginValidation } from "./auth.validation.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kalisa Jean
 *               email:
 *                 type: string
 *                 example: kalisa@gmail.com
 *               password:
 *                 type: string
 *                 example: farm1234
 *               role:
 *                 type: string
 *                 enum: [farmer, buyer]
 *                 example: farmer
 *               location:
 *                 type: string
 *                 example: Musanze
 *               phone:
 *                 type: string
 *                 example: "0788000000"
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Email already registered
 *       422:
 *         description: Validation error
 */
router.post("/register", registerValidation, register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login and get JWT token
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: kalisa@gmail.com
 *               password:
 *                 type: string
 *                 example: farm1234
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid email or password
 */
router.post("/login", loginValidation, login);

export default router;