# MixSpace – MERN Fullstack Project

## Giới thiệu

MixSpace là dự án web sử dụng MERN stack (MongoDB, Express, React, Node.js). Ứng dụng cho phép người dùng nghe nhạc, quản lý playlist, chat, xác thực tài khoản, và có giao diện hiện đại, responsive.

---

## Tính năng nổi bật

- **Nghe nhạc trực tuyến**: Phát các bài hát nổi bật, trending, made-for-you.
- **Quản lý album & bài hát**: Thêm, xóa album/bài hát (dành cho admin).
- **Xác thực người dùng**: Tích hợp Clerk cho đăng nhập, đăng ký, bảo vệ route.
- **Chat realtime**: Gửi tin nhắn giữa người dùng qua Socket.io.
- **Thống kê**: Xem tổng số bài hát, album, nghệ sĩ, người dùng.
- **Giao diện hiện đại**: Sử dụng Tailwind CSS, responsive cho mọi thiết bị.
- **Upload file**: Lưu trữ ảnh và audio qua Cloudinary.
- **Dọn dẹp file tạm**: Cron job tự động xóa file tạm mỗi giờ.

---

## Công nghệ sử dụng

- **Frontend**: React, TypeScript, Tailwind CSS, Clerk, Vite, Radix UI, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Clerk, Cloudinary, Socket.io, node-cron.

---

## Cấu trúc thư mục

```
Spotify-web/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── lib/
│   │   ├── seeds/
│   │   └── server.js
│   └── .env, .gitignore
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── main.tsx, App.tsx
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── .gitignore, README.md
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
- `frontend/src/pages/home/components/FeaturedSection.tsx`: Hiển thị danh sách bài hát nổi bật.
- `backend/src/models/song.model.js`: Định nghĩa schema bài hát.
- `backend/src/models/album.model.js`: Định nghĩa schema album.
- `frontend/src/layouts/components/LeftSidebar.tsx`: Sidebar hiển thị album, menu.
