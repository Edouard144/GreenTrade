import express from "express";
import cors from "cors";
import helmet from "helmet";
import { fileURLToPath } from "url";
import path from "path";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

// Routes
import authRoutes         from "./modules/auth/auth.routes.js";
import productRoutes      from "./modules/products/product.routes.js";
import orderRoutes        from "./modules/orders/order.routes.js";
import messageRoutes      from "./modules/messages/message.routes.js";
import reviewRoutes       from "./modules/reviews/review.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import adminRoutes        from "./modules/admin/admin.routes.js";
import userRoutes         from "./modules/users/user.routes.js";

// Middlewares
import { errorMiddleware, notFoundMiddleware } from "./middlewares/error.middleware.js";

const app = express();

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// --- Core Middleware ---
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Static uploads folder ---
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// --- Swagger Docs ---
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Health Check ---
app.get("/", (req, res) => {
  res.json({ message: "GreenTrade API is running 🌱" });
});

// --- Routes ---
app.use("/api/auth",          authRoutes);
app.use("/api/products",      productRoutes);
app.use("/api/orders",        orderRoutes);
app.use("/api/messages",      messageRoutes);
app.use("/api/reviews",       reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin",         adminRoutes);
app.use("/api/users",         userRoutes);

// --- 404 handler (must be after all routes) ---
app.use(notFoundMiddleware);

// --- Global error handler (must be last) ---
app.use(errorMiddleware);

export default app;