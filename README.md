# MixSpace Web

MixSpace là một dự án web nghe nhạc hiện đại sử dụng MERN Stack (MongoDB, Express, React, Node.js).  
Dự án hỗ trợ các tính năng: tìm kiếm bài hát, phát nhạc, quản lý album, chat, đăng nhập bằng Clerk, thêm bài hát vào yêu thích, và nhiều tính năng khác.

## Cấu trúc thư mục

```
MixSpace-web/
│
├── backend/      # Source code server Node.js + Express + MongoDB
├── frontend/     # Source code client React + Vite + Clerk
├── README.md     # Tài liệu dự án
```

## Yêu cầu hệ thống

- Node.js >= 20.x
- MongoDB (local hoặc cloud)
- Tài khoản Clerk (https://clerk.com/) để xác thực người dùng

## Hướng dẫn cài đặt

### 1. Clone dự án

```bash
git clone https://github.com/your-username/MixSpace-web.git
cd MixSpace-web
```

### 2. Cài đặt dependencies

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3. Thiết lập biến môi trường

Tạo file `.env` trong thư mục `backend` với nội dung:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mixspace
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

Tạo file `.env` trong thư mục `frontend` với nội dung:

```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Seed dữ liệu mẫu (tuỳ chọn)

Chạy lệnh seed để tạo dữ liệu mẫu:

```bash
npm run seed:songs --prefix backend
npm run seed:albums --prefix backend
```

### 5. Khởi động dự án

Chạy backend:

```bash
npm run dev --prefix backend
```

Chạy frontend:

```bash
npm run dev --prefix frontend
```

Truy cập website tại [http://localhost:3000](http://localhost:3000)

## Tính năng chính

- Đăng nhập/Đăng ký bằng Clerk
- Tìm kiếm bài hát theo tên hoặc tác giả
- Phát nhạc, chuyển bài, phát album
- Thêm bài hát vào danh sách yêu thích
- Quản lý album, bài hát
- Chat realtime giữa người dùng
- Thống kê số lượng bài hát, album, nghệ sĩ, người dùng
- Upload ảnh, audio qua Cloudinary

## Công nghệ sử dụng

- **Frontend:** React, Vite, Clerk, TailwindCSS, Radix UI
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, Cloudinary
- **Realtime:** Socket.io
- **Xác thực:** Clerk
