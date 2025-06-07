# Trello Clone Project

## Mô tả
Dự án này là một bản sao của Trello với các tính năng chính:
- Đăng ký/đăng nhập người dùng
- Tạo và quản lý boards
- Tạo và quản lý lists trong board
- Tạo và quản lý tasks trong list
- Filter và tìm kiếm tasks
- Gắn nhãn (tags) cho tasks
- Đặt deadline cho tasks

## Các lỗi đã được sửa

### 1. Lỗi Validation
- **Vấn đề**: Hàm `checkData()` thiếu case xử lý cho `"checktitleboard"`
- **Giải pháp**: Thêm validation cho tiêu đề board với các điều kiện:
  - Không được để trống
  - Tối thiểu 3 ký tự
  - Tối đa 100 ký tự

### 2. Lỗi đường dẫn redirect
- **Vấn đề**: Các đường dẫn redirect hardcode không chính xác
- **Giải pháp**: Sửa đường dẫn tương đối từ `"index.html"` thành `"../pages/index.html"`

### 3. Lỗi Authentication Logic
- **Vấn đề**: Kiểm tra path authentication quá cứng nhắc với hardcode path
- **Giải pháp**: Sử dụng `includes()` thay vì so sánh trực tiếp path

### 4. Lỗi CSS Class Names
- **Vấn đề**: Sử dụng class `"display"` thay vì `"displayMessage"` trong signup.js
- **Giải pháp**: Thống nhất sử dụng class `"displayMessage"`

### 5. Lỗi đường dẫn tài nguyên
- **Vấn đề**: Đường dẫn images trong `dataBackgrounds` không chính xác
- **Giải pháp**: Thêm `"../"` vào đầu đường dẫn để đúng context từ file JS

### 6. Lỗi Duplicate Event Listeners
- **Vấn đề**: Hàm `openModal()` thêm event listeners mỗi lần gọi mà không remove cái cũ
- **Giải pháp**: Clone elements để remove event listeners cũ

### 7. Lỗi Logic tạo board
- **Vấn đề**: Thiếu `return` statement khi validation fail
- **Giải pháp**: Thêm `return` để dừng thực thi khi có lỗi

### 8. Lỗi GitHub Pages Compatibility
- **Vấn đề**: Đường dẫn hardcode không hoạt động trên GitHub Pages
- **Giải pháp**: Tạo helper functions `getBasePath()` và `getRedirectPath()` để tự động detect và tạo đường dẫn phù hợp

## Cách chạy dự án

### 1. Cài đặt môi trường
- Cần một web server để chạy dự án (do sử dụng ES6 modules và localStorage)
- Có thể sử dụng:
  - Live Server extension trong VS Code
  - Python: `python -m http.server 8000`
  - Node.js: `npx http-server`

### 2. Cấu trúc thư mục
```
Trello/
├── index.html              # Entry point cho GitHub Pages
├── pages/
│   ├── index.html          # Trang chính (dashboard)
│   ├── login.html          # Trang đăng nhập
│   ├── signup.html         # Trang đăng ký
│   └── board.html          # Trang chi tiết board
├── js/
│   ├── validation.js       # Logic validation và data
│   ├── main.js            # Logic trang chính
│   ├── board.js           # Logic trang board
│   ├── login.js           # Logic đăng nhập
│   └── signup.js          # Logic đăng ký
├── css/
│   ├── style.css          # CSS chung
│   ├── dashboard.css      # CSS trang chính
│   ├── board.css         # CSS trang board
│   ├── login.css         # CSS trang đăng nhập
│   ├── signup.css        # CSS trang đăng ký
│   └── data/             # Images và icons
├── .nojekyll              # Disable Jekyll cho GitHub Pages
└── README.md
```

### 3. Chạy dự án Local
1. Mở terminal trong thư mục `Trello`
2. Chạy web server (ví dụ: `python -m http.server 8000`)
3. Mở trình duyệt và truy cập `http://localhost:8000`

### 4. Deploy lên GitHub Pages

#### Bước 1: Push code lên GitHub
```bash
git add .
git commit -m "Ready for GitHub Pages deployment"
git push origin main
```

#### Bước 2: Enable GitHub Pages
1. Vào repository trên GitHub
2. Click **Settings** > **Pages**
3. Trong **Source**, chọn **Deploy from a branch**
4. Chọn branch **main** và folder **/ (root)**
5. Click **Save**

#### Bước 3: Truy cập
- URL sẽ có dạng: `https://username.github.io/Trello/`
- Ví dụ: `https://letoan0902.github.io/Trello/`

### 5. Tài khoản demo
Dự án có sẵn một tài khoản demo:
- **Email**: trinhhanh261293@gmail.com
- **Password**: 12345678

## Tính năng chính

### Authentication
- Đăng ký tài khoản mới
- Đăng nhập/đăng xuất
- Validation input forms

### Board Management
- Tạo board mới với background tùy chỉnh
- Sửa thông tin board
- Đóng/mở board
- Đánh dấu board yêu thích

### List & Task Management
- Tạo lists trong board
- Tạo tasks trong list
- Đánh dấu task hoàn thành
- Xóa tasks/lists
- Filter tasks theo status, labels, dates

### Advanced Features
- Rich text editor cho task description (CKEditor)
- Date picker cho deadline
- Color labels cho tasks
- Filter và search functionality

## Công nghệ sử dụng
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Storage**: localStorage
- **Libraries**: 
  - CKEditor 5 (Rich text editor)
  - Flatpickr (Date picker)
- **Icons & Images**: Custom icons và background images
- **Deployment**: GitHub Pages

## Lưu ý
- Dự án sử dụng localStorage để lưu dữ liệu, nên data sẽ mất khi clear browser data
- Responsive design cho mobile và desktop
- Tương thích với GitHub Pages thông qua dynamic path detection
- File `.nojekyll` đảm bảo GitHub Pages không xử lý Jekyll

## Live Demo
Xem demo trực tiếp tại: [GitHub Pages URL] 