import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    // Dùng Promise.all để thực hiện song song 4 truy vấn đến MongoDB để tối ưu tốc độ.
    const [totalSongs, totalUsers, totalAlbums, uniqueArtists] = await Promise.all([
      Song.countDocuments(),
      User.countDocuments(),
      Album.countDocuments(),

      // $unionWith: kết hợp hai collection songs và albums thành một luồng dữ liệu.
      // $group: { _id: "$artist" }: gom nhóm theo tên nghệ sĩ → loại bỏ trùng.
      // $count: "count": đếm số lượng nhóm → chính là số nghệ sĩ khác nhau.
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$artist",
          },
        },
        {
          $count: "count",
        },
      ]),
    ]);

    res.status(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalArtists: uniqueArtists[0]?.count || 0, // Dùng uniqueArtists[0]?.count || 0 để tránh lỗi nếu không có dữ liệu
    });
  } catch (error) {
    next(error);
  }
};
