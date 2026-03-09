

// In any route file — this is the pattern you'll use everywhere
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { authorize } from "../../middlewares/role.middleware.js";
import { createProduct } from "./product.controller.js";

const router = Router();

// protect = must be logged in
// authorize("farmer") = must be a farmer
router.post("/", protect, authorize("farmer"), createProduct);

export default router;

// Only logged-in users
router.get("/profile", protect, getProfile);

// Only farmers
router.post("/products", protect, authorize("farmer"), createProduct);

// Only admins
router.delete("/users/:id", protect, authorize("admin"), deleteUser);

// Farmers and admins
router.put("/products/:id", protect, authorize("farmer", "admin"), updateProduct);