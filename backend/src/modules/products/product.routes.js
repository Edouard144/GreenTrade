import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { productValidation } from "./product.validation.js";
import { create, getAll, getOne, getMine, update, remove } from "./product.controller.js";
import upload from "../../middlewares/upload.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all available products with search and filters
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: tomatoes
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: vegetables
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         example: 100
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         example: 1000
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         example: Musanze
 *       - in: query
 *         name: unit
 *         schema:
 *           type: string
 *         example: kg
 *     responses:
 *       200:
 *         description: Products fetched
 */
router.get("/", getAll);

/**
 * @swagger
 * /api/products/farmer/my-products:
 *   get:
 *     summary: Get logged-in farmer's products
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Your products fetched
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied
 */
router.get("/farmer/my-products", protect, authorize("farmer"), getMine);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: uuid-here
 *     responses:
 *       200:
 *         description: Product fetched
 *       404:
 *         description: Product not found
 */
router.get("/:id", getOne);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (farmer only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, category, price, quantity, unit]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Fresh Tomatoes
 *               category:
 *                 type: string
 *                 example: vegetables
 *               description:
 *                 type: string
 *                 example: Organic tomatoes from Musanze
 *               price:
 *                 type: number
 *                 example: 500
 *               quantity:
 *                 type: integer
 *                 example: 100
 *               unit:
 *                 type: string
 *                 example: kg
 *               location:
 *                 type: string
 *                 example: Musanze
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         description: Not authorized
 *       403:
 *         description: Access denied
 */
router.post(
     "/",
     protect, 
     authorize("farmer"), 
     upload.single("image"),
     productValidation, 
     create
    );

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product (farmer only)
 *     tags: [Products]
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
 *               price:
 *                 type: number
 *                 example: 450
 *               quantity:
 *                 type: integer
 *                 example: 80
 *     responses:
 *       200:
 *         description: Product updated
 *       404:
 *         description: Product not found or not yours
 */
router.put("/:id",
     protect, 
     authorize("farmer"),
     upload.single("image"), 
     update
    );

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product (farmer only)
 *     tags: [Products]
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
 *         description: Product deleted
 *       404:
 *         description: Product not found or not yours
 */
router.delete("/:id", protect, authorize("farmer"), remove);

export default router;
