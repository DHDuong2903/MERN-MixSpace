# MixSpace – MERN Fullstack Project

## Giới thiệu

MixSpace là dự án web nghe nhạc sử dụng MERN stack (MongoDB, Express, React, Node.js). Ứng dụng cho phép người dùng nghe nhạc, quản lý playlist, chat realtime, xác thực tài khoản, giao diện hiện đại, responsive và nhiều tính năng mở rộng.

---

## Tính năng nổi bật

- **Nghe nhạc trực tuyến**: Phát các bài hát nổi bật, trending, tìm kiếm bài hát, album, nghệ sĩ.
- **Quản lý album & bài hát**: Thêm, xóa, chỉnh sửa album/bài hát (dành cho admin).
- **Xác thực người dùng**: Tích hợp Clerk cho đăng nhập, đăng ký, bảo vệ route, quản lý phiên đăng nhập.
- **Chat realtime**: Gửi tin nhắn giữa người dùng qua Socket.io, hiển thị trạng thái online.
- **Quản lý playlist & yêu thích**: Thêm/xóa bài hát vào playlist cá nhân, danh sách yêu thích.
- **Thống kê**: Xem tổng số bài hát, album, nghệ sĩ, người dùng, thống kê lượt nghe.
- **Giao diện hiện đại**: Sử dụng Tailwind CSS, responsive cho mọi thiết bị, dark mode.
- **Upload file**: Lưu trữ ảnh và audio qua Cloudinary, hỗ trợ drag & drop.
- **Dọn dẹp file tạm**: Cron job tự động xóa file tạm mỗi giờ.
- **Thông báo realtime**: Hiển thị thông báo khi có tin nhắn mới, bài hát mới.
- **Tìm kiếm thông minh**: Tìm kiếm theo tên bài hát, nghệ sĩ, album.
- **Quản lý tài khoản**: Xem và chỉnh sửa thông tin cá nhân, avatar.
- **Bảo mật**: Sử dụng JWT, Clerk, phân quyền admin/user.

---

## Công nghệ sử dụng

- **Frontend**: React, TypeScript, Tailwind CSS, Clerk, Vite, Radix UI, Axios, React Router, Zustand, Socket.io-client.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Clerk, Cloudinary, Socket.io, node-cron, JWT, dotenv.
- **Khác**: Cloudinary (lưu trữ media), Clerk (xác thực), Radix UI (UI components), Zustand (state management).

---

## Cấu trúc thư mục

```
MixSpace-web/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   ├── seeds/
│   │   └── server.js
│   ├── .env
│   └── .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── providers/
│   │   └── main.tsx, App.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore, README.md
├── README.md
```

---

## Hướng dẫn cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/yourusername/MixSpace-web.git
cd MixSpace-web
```

### 2. Cài đặt backend

```bash
cd backend
npm install
```

- Tạo file `.env` và điền các biến môi trường:
  ```
  MONGODB_URI=your_mongodb_uri
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  CLERK_SECRET_KEY=your_clerk_secret
  PORT=5000
  ```

### 3. Cài đặt frontend

```bash
cd ../frontend
npm install
```

### 4. Chạy dự án

- **Backend**:
  ```bash
  cd backend
  npm start
  ```
- **Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```

Truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

---

## Seed dữ liệu mẫu

Chạy các file seed trong backend để tạo dữ liệu mẫu cho album và bài hát:

```bash
node src/seeds/albums.js
node src/seeds/songs.js
```

---

## Một số file chính

- `backend/src/server.js`: Khởi tạo server, socket, route, cron job.
- `backend/src/routes/`: Định nghĩa các API cho bài hát, album, user, chat, favorite.
- `backend/src/models/song.model.js`: Định nghĩa schema bài hát.
- `backend/src/models/album.model.js`: Định nghĩa schema album.
- `frontend/src/pages/home/components/FeaturedSection.tsx`: Hiển thị danh sách bài hát nổi bật.
- `frontend/src/pages/favorite/FavoritesPage.tsx`: Quản lý danh sách bài hát yêu thích.
- `frontend/src/layouts/components/LeftSidebar.tsx`: Sidebar hiển thị album, menu.
- `frontend/src/providers/AuthProvider.tsx`: Quản lý xác thực Clerk, token phiên đăng nhập.
- `frontend/src/stores/useFavoriteStore.ts`: Quản lý state danh sách yêu thích với Zustand.

---

## Lưu ý & Troubleshooting

- Nếu gặp lỗi xác thực hoặc load dữ liệu, kiểm tra lại cấu hình Clerk và token đăng nhập.
- Đảm bảo các biến môi trường `.env` đã điền đầy đủ và đúng thông tin.
- Nếu upload file không thành công, kiểm tra lại cấu hình Cloudinary.
- Để chat realtime hoạt động, backend phải chạy và kết nối đúng port với frontend.

---

## License

MIT License © 2025 yourusername