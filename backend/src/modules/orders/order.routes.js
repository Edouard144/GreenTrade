import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { orderValidation } from "./order.validation.js";
import { place, getMyBuyerOrders, getMyFarmerOrders, getOne, updateStatus, cancel } from "./order.controller.js";

const router = Router();

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Place an order (buyer only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId, quantity]
 *             properties:
 *               productId:
 *                 type: string
 *                 example: uuid-here
 *               quantity:
 *                 type: integer
 *                 example: 10
 *               note:
 *                 type: string
 *                 example: Please deliver in the morning
 *     responses:
 *       201:
 *         description: Order placed
 *       400:
 *         description: Not enough stock
 */
router.post("/", protect, authorize("buyer"), orderValidation, place);

/**
 * @swagger
 * /api/orders/my-orders:
 *   get:
 *     summary: Get buyer's own orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Your orders fetched
 */
router.get("/my-orders", protect, authorize("buyer"), getMyBuyerOrders);

/**
 * @swagger
 * /api/orders/farmer-orders:
 *   get:
 *     summary: Get all incoming orders for farmer
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Incoming orders fetched
 */
router.get("/farmer-orders", protect, authorize("farmer"), getMyFarmerOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order fetched
 *       404:
 *         description: Order not found
 */
router.get("/:id", protect, getOne);

/**
 * @swagger
 * /api/orders/{id}/status:
 *   put:
 *     summary: Update order status (farmer only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [accepted, in_progress, delivered, completed, rejected]
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Order status updated
 */
router.put("/:id/status", protect, authorize("farmer"), updateStatus);

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel an order (buyer only, pending only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order cancelled
 *       400:
 *         description: Only pending orders can be cancelled
 */
router.put("/:id/cancel", protect, authorize("buyer"), cancel);

export default router;