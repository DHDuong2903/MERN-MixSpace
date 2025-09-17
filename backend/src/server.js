import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload"; // Middleware xu ly upload file( them truong files vao req)
import path from "path"; // Xu ly duong dan file/folder
import fs from "fs"; // Doc/Ghi/Xoa file he thong
import cron from "node-cron"; // Tao cac cong viec dinh ky
import { createServer } from "http"; // Tao server http (socket)

import { initializeSocket } from "./lib/socket.js";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import authRoutes from "./routes/auth.route.js";
import songRoutes from "./routes/song.route.js";
import albumRoutes from "./routes/album.route.js";
import statRoutes from "./routes/stat.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

// Khoi tao app va server
const __dirname = path.resolve(); // Duong dan thu muc goc cua project
const app = express();
const PORT = process.env.PORT;
const httpServer = createServer(app); // Tao server http
initializeSocket(httpServer); // Khoi tao socket

// Cau hinh middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(clerkMiddleware()); // Them thong tin xac thuc vao request (Them truong auth vao req)
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"), // Luu file tam vao thu muc tmp
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // Gioi han dung luong 10MB
    },
  })
);

// Dinh nghia thu muc tam
const tempDir = path.join(process.cwd(), "tmp"); // Duong dan thu muc luu file tam

// Cron jobs: Xoa dinh ky moi gio cac file tam trong thu muc tmp de tranh day bo nho
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log("error", err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {});
      }
    });
  }
});

// Dinh nghia cac route
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

// Phuc vu frontend trong production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Xu ly loi phu hop voi moi truong
app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message });
});

// Ket noi database va khoi dong server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
