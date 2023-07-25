// app.js
import express from "express";
import http from "http";
import cors from "cors";
import apiRoutes from "./routes.js";

const app = express();
const server = http.createServer(app);

// Enable cross-origin requests if needed (for frontend to communicate with backend)
app.use(cors());

// Start the server
app.use("/api", apiRoutes);
const port = 3001; // or any port you prefer
server.listen(port, () => {
  console.log(`API up and running on http://localhost:${port}`);
});
