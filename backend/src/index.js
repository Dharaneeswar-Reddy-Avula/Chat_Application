import express from "express";
import authRoutes from "./routers/auth.route.js"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import MessageRoutes from "./routers/message.route.js"
import cors from"cors"
import {app,server,io} from "./lib/socket.js"
import path from "path"

dotenv.config()
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
const __dirname=path.resolve();
app.use('/api/auth', authRoutes)
app.use('/api/messages', MessageRoutes)

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname,"../frontend/dist")));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
//     })
// }
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT,()=>{
    console.log(`server is running at the port ${PORT}`);
    connectDB();
});
