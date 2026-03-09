import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { send, inbox, conversation, markRead } from "./message.controller.js";

const router = Router();

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message to another user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [receiverId, content]
 *             properties:
 *               receiverId:
 *                 type: string
 *                 example: uuid-here
 *               content:
 *                 type: string
 *                 example: Hi Kalisa, is your stock still available?
 *     responses:
 *       201:
 *         description: Message sent
 */
router.post("/", protect, send);

/**
 * @swagger
 * /api/messages/inbox:
 *   get:
 *     summary: Get all messages in inbox
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inbox fetched
 */
router.get("/inbox", protect, inbox);

/**
 * @swagger
 * /api/messages/{otherUserId}:
 *   get:
 *     summary: Get conversation with a specific user
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: otherUserId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Conversation fetched
 */
router.get("/:otherUserId", protect, conversation);

/**
 * @swagger
 * /api/messages/{senderId}/read:
 *   put:
 *     summary: Mark messages from a sender as read
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: senderId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Messages marked as read
 */
router.put("/:senderId/read", protect, markRead);

export default router;