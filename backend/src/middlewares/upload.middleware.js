import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Absolute path to /backend/uploads — consistent with app.js static serving
const uploadDir = path.join(__dirname, "../../uploads");

// Auto-create the uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Where and how to store uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Strip directory components, then replace any non-safe characters
    const safe = path.basename(file.originalname).replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const unique = Date.now() + "-" + safe;
    cb(null, unique);
  },
});

// Only allow image files — check both extension AND MIME type
const allowedMime = ["image/jpeg", "image/png", "image/webp"];
const allowedExt  = [".jpg", ".jpeg", ".png", ".webp"];

const fileFilter = (req, file, cb) => {
  const ext  = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedExt.includes(ext) && allowedMime.includes(mime)) {
    cb(null, true);  // accept
  } else {
    cb(new Error("Only jpg, jpeg, png, webp images are allowed"), false); // reject
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
});

export default upload;
