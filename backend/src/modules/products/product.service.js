import db from "../../config/db.js";
import { products } from "./product.model.js";
import { eq, and } from "drizzle-orm";

// Create a new product
export const createProduct = async (farmerId, data) => {
  const [product] = await db.insert(products).values({
    farmerId,
    name:        data.name,
    category:    data.category,
    description: data.description,
    price:       data.price,
    quantity:    data.quantity,
    unit:        data.unit,
    location:    data.location,
    imageUrl:    data.imageUrl || null,
  }).returning();

  return product;
};

// Get all available products (marketplace)
export const getAllProducts = async () => {
  return await db.select().from(products)
    .where(eq(products.status, "available"));
};

// Get single product by id
export const getProductById = async (id) => {
  const [product] = await db.select().from(products)
    .where(eq(products.id, id));

  if (!product) throw new Error("Product not found");
  return product;
};

// Get all products belonging to a farmer
export const getMyProducts = async (farmerId) => {
  return await db.select().from(products)
    .where(eq(products.farmerId, farmerId));
};

// Update a product (only the farmer who owns it)
export const updateProduct = async (id, farmerId, data) => {
  const [updated] = await db.update(products)
    .set(data)
    .where(and(eq(products.id, id), eq(products.farmerId, farmerId)))
    .returning();

  if (!updated) throw new Error("Product not found or not yours");
  return updated;
};

// Delete a product (only the farmer who owns it)
export const deleteProduct = async (id, farmerId) => {
  const [deleted] = await db.delete(products)
    .where(and(eq(products.id, id), eq(products.farmerId, farmerId)))
    .returning();

  if (!deleted) throw new Error("Product not found or not yours");
  return deleted;
};