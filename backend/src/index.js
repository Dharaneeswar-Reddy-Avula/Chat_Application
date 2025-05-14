import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routers/auth.route.js";
import MessageRoutes from "./routers/message.route.js";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();
const PORT = process.env.PORT || 5001 // Use Render's port if available, else fallback to 5001
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())
app.use(cors({
    origin:["http://localhost:5173","https://chat-application-hqy4.onrender.com"],
    credentials:true
}))
app.use('/api/auth', authRoutes)
app.use('/api/messages', MessageRoutes)

if (process.env.NODE_ENV === "production") {
   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename);

   // Adjust this path based on where your frontend build folder is located
   const frontendPath = path.resolve(__dirname, "frontend", "dist");

   app.use(express.static(frontendPath));

   app.get("*", (req, res) => {
      res.sendFile(path.join(frontendPath, "index.html"));
   });
}



server.listen(PORT,()=>{
    console.log(`server is running at the port ${PORT}`);
    connectDB();
});
