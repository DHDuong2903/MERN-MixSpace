import { Server } from "socket.io";
import { Message } from "../models/message.model.js";

// io.on: lang nghe su kien tu client
// io.emit: gui su kien den tat ca client
// io.to(socketId).emit: gui su kien den client co socketId do
// socket.on: lang nghe su kien tu client (chi client do)
// socket.emit: gui su kien den client (chi client do)

// Tao socket server gan vao http server
export const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  // Luu tru thong tin user dang online va hoat dong hien tai
  const userSockets = new Map(); // { userId: socketId }
  const userActivities = new Map(); // { userId: activity }

  io.on("connection", (socket) => {
    // Xu ly khi user ket noi
    socket.on("user_connected", (userId) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Gui cho tat ca client biet co user moi ket noi
      io.emit("user_connected", userId);
      // Gui danh sach user dang online va hoat dong hien tai
      socket.emit("user_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    // Cap nhat hoat dong hien tai cua user
    socket.on("update_activity", (arg1, arg2) => {
      // Hỗ trợ cả 2 dạng: emit(object) hoặc emit(userId, activity)
      let userId;
      let activity;
      if (typeof arg1 === "object" && arg1 !== null) {
        ({ userId, activity } = arg1);
      } else {
        userId = arg1;
        activity = arg2;
      }

      if (userId) {
        userActivities.set(userId, activity);
        io.emit("activity_updated", { userId, activity });
      }
    });

    // Xu ly khi user gui tin nhan
    socket.on("send_message", async (data) => {
      try {
        // Lay du lieu gui len tu client
        const { senderId, receiverId, content } = data;
        // Luu tin nhan vao database
        const message = await Message.create({
          senderId,
          receiverId,
          content,
        });
        // Lay socketId cua nguoi nhan de gui tin nhan
        const receiverSocketId = userSockets.get(receiverId);
        // Neu nguoi nhan dang online thi gui tin nhan
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }
        // Gui lai cho chinh nguoi gui de xac nhan la gui thanh cong
        socket.emit("message_sent", message);
      } catch (error) {
        socket.emit("message_error", error.message);
      }
    });

    // Xu ly khi user ngat ket noi
    socket.on("disconnect", () => {
      let disconnectedUserId;
      // Duyet qua danh sach userSockets (userId -> socketId)
      for (const [userId, socketId] of userSockets.entries()) {
        // Neu socketId khop voi socket vua disconnect
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          // Xoa user va hoat dong khoi danh sach dang online
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }

      // Gui cho tat ca client biet co user ngat ket noi
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
