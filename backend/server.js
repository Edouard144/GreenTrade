// server.js
// The starting point of the backend server. It loads environment variables and starts the Express app.
import app from "./src/app.js";
import dotenv from "dotenv";

dotenv.config(); // loading the .env variables so we can use them in our app

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`GreenTrade server running on port ${PORT}`);
});