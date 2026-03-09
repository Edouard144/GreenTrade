import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { reviewValidation } from "./review.validation.js";
import { create, getReviews, getRating } from "./review.controller.js";

const router = Router();

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Leave a review (buyer only, completed orders only)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, farmerId, rating]
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: uuid-here
 *               farmerId:
 *                 type: string
 *                 example: uuid-here
 *               rating:
 *                 type: integer
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Fresh tomatoes, fast delivery!
 *     responses:
 *       201:
 *         description: Review submitted
 *       400:
 *         description: Order not completed or already reviewed
 */
router.post("/", protect, authorize("buyer"), reviewValidation, create);

/**
 * @swagger
 * /api/reviews/farmer/{farmerId}:
 *   get:
 *     summary: Get all reviews for a farmer
 *     tags: [Reviews]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews fetched
 */
router.get("/farmer/:farmerId", getReviews);

/**
 * @swagger
 * /api/reviews/farmer/{farmerId}/rating:
 *   get:
 *     summary: Get average rating for a farmer
 *     tags: [Reviews]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: farmerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Rating fetched
 */
router.get("/farmer/:farmerId/rating", getRating);

export default router;