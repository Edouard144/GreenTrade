import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { me, update, password } from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get my profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched
 *       404:
 *         description: User not found
 */
router.get("/me", protect, me);

/**
 * @swagger
 * /api/users/me:
 *   put:
 *     summary: Update my profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kalisa Jean
 *               location:
 *                 type: string
 *                 example: Kigali
 *               phone:
 *                 type: string
 *                 example: "0788000000"
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put("/me", protect, update);

/**
 * @swagger
 * /api/users/me/change-password:
 *   put:
 *     summary: Change my password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentPassword, newPassword]
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: farm1234
 *               newPassword:
 *                 type: string
 *                 example: newpass123
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 */
router.put("/me/change-password", protect, password);

export default router;