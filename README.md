## MixSpace

MixSpace là nền tảng nghe nhạc trực tuyến hiện đại, phát triển với React (frontend) và Node.js/Express (backend), sử dụng MongoDB lưu trữ, xác thực JWT, Cloudinary lưu trữ media, Socket.io cho chat realtime. Dự án hướng tới trải nghiệm giải trí tối ưu, bảo mật, dễ mở rộng và quản trị.

## Kiến trúc dự án

- Monorepo gồm hai phần:
  - `frontend`: React + Vite, TypeScript, TailwindCSS, Radix UI
  - `backend`: Node.js, Express, MongoDB, JWT, Cloudinary, Socket.io
- Xác thực người dùng với JWT
- Quản lý media (ảnh, nhạc) qua Cloudinary
- Chat realtime qua Socket.io
- Quản lý trạng thái frontend bằng hooks, context
- Giao tiếp backend qua REST API

## Tính năng chính

- Đăng nhập/đăng ký bảo mật qua JWT
- Quản lý người dùng, phân quyền admin/người dùng
- Quản lý album, bài hát: thêm/sửa/xóa, upload ảnh cover và file nhạc
- Tìm kiếm, lọc, phân trang danh sách album, bài hát, người dùng
- Nghe nhạc trực tuyến, điều khiển phát nhạc (play, pause, next, previous)
- Chat realtime giữa người dùng
- Quản trị: thống kê số lượng người dùng, album, bài hát, hiển thị bảng và biểu đồ
- Quick Actions: thêm album, thêm bài hát, quản lý người dùng
- Trang quản trị cho admin: quản lý nội dung, người dùng, thống kê

## Cài đặt nhanh

### Yêu cầu hệ thống

- Node.js >= 18.x
- MongoDB
- Tài khoản Cloudinary

### Các bước cài đặt

```bash
git clone https://github.com/DHDuong2903/MERN-Spotify.git
cd MixSpace-web
npm install
cd backend
npm install
cd ../frontend
npm install
```

Tạo file `.env` cho backend và `.env` cho frontend theo mẫu, điền các thông tin API key cho Cloudinary, MongoDB URI, JWT secret.

### Khởi động

```bash
# Khởi động backend
cd backend
npm run dev

# Khởi động frontend
cd ../frontend
npm run dev
```

Truy cập: [http://localhost:5173](http://localhost:5173)

## Công nghệ sử dụng

- Frontend: React, Vite, TypeScript, TailwindCSS, Radix UI, Axios
- Backend: Node.js, Express, MongoDB, JWT, Cloudinary, Socket.io
