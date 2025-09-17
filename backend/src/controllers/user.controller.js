import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { Song } from "../models/song.model.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const currentUserId = req.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } }); // $ne: not equal => khong lay user dang dang nhap
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Lay lich su tin nhan giua minh va user khac
export const getMessages = async (req, res, next) => {
  try {
    const myId = req.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      // $or: Lay neu dung chi 1 trong 2 dieu kien
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};

// Them bai hat vao danh sach yeu thich
export const addFavorite = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId; // Lấy user đang login từ Clerk
    const { songId } = req.params;

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ message: "Song not found" });

    const user = await User.findOneAndUpdate(
      { clerkId },
      { $addToSet: { favorites: songId } }, // $addToSet để tránh trùng
      { new: true }
    );

    res.json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
};

// Xoa bai hat khoi danh sach yeu thich
export const removeFavorite = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;
    const { songId } = req.params;

    const user = await User.findOneAndUpdate({ clerkId }, { $pull: { favorites: songId } }, { new: true });

    res.json({ favorites: user.favorites });
  } catch (err) {
    next(err);
  }
};

// Lay danh sach bai hat yeu thich
export const getFavorites = async (req, res, next) => {
  try {
    const clerkId = req.auth.userId;

    const user = await User.findOne({ clerkId }).populate({
      path: "favorites",
      select: "_id title artist imageUrl audioUrl",
    });

    res.json(user?.favorites || []);
  } catch (err) {
    next(err);
  }
};
