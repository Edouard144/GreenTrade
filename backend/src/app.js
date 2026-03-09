import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import authRoutes from "./modules/auth/auth.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import orderRoutes from "./modules/orders/order.routes.js";
import messageRoutes from "./modules/messages/message.routes.js";
import reviewRoutes from "./modules/reviews/review.routes.js";
import notificationRoutes from "./modules/notifications/notification.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger UI at /api/docs
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "GreenTrade API is running 🌱" });
});

export default app;