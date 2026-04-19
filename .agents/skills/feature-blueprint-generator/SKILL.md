---
name: feature-blueprint-generator
description: Tạo danh sách chức năng (Feature List) chuẩn chỉnh, chuyên nghiệp dưới dạng bảng Markdown. Sử dụng khi người dùng yêu cầu lập kế hoạch tính năng, blueprint cho dự án, hoặc liệt kê các chức năng của hệ thống theo cấu trúc chuẩn CleanZ. Skill này đảm bảo tính đầy đủ (Comprehensive), phân cấp rõ ràng (Categorized), và thẩm mỹ (Clean Markdown).
---

# Feature Blueprint Generator

Skill này được thiết kế để tạo ra các bản "Bản đồ chức năng" (Feature Blueprints) chất lượng cao, giúp định hình toàn bộ phạm vi dự án một cách chuyên nghiệp.

## Quy tắc cấu trúc (Structure Rules)

1. **Tiêu đề**: Phải bắt đầu bằng `# Danh Sách Tính Năng [Tên Dự Án]`.
2. **Định dạng bảng**: Luôn sử dụng bảng Markdown với 6 cột chính xác:
   | STT | Phân Quyền | Nhóm Chức Năng | Chức Năng | Mô Tả | Yêu Cầu Dự Án |
   |-----|------------|----------------|-----------|-------|---------------|
3. **Dòng Tiêu đề Nhóm**: Mỗi nhóm chức năng mới phải có một dòng tiêu đề in đậm để phân cách, ví dụ:
   `| [STT] | | **Tên Nhóm Chức Năng** | | | |`

## Chi tiết các cột

- **STT**: Số thứ tự liên tục từ 1 đến hết.
- **Phân Quyền**: Xác định vai trò (Customer, Staff, Admin, System, All).
- **Nhóm Chức Năng**: Tên Module lớn (ví dụ: Authentication, Order Management).
- **Chức Năng**: Tên tính năng cụ thể, súc tích.
- **Mô Tả**: Giải thích rõ hành động hoặc giá trị của tính năng (Tiếng Việt).
- **Yêu Cầu Dự Án**: Phân loại `Bắt buộc` (cho MVP) hoặc `Mở rộng` (cho các giai đoạn sau).

## Tư duy Phân loại (Categorization Logic)

Một blueprint đầy đủ thường bao gồm các nhóm sau theo thứ tự:
1.  **Hệ thống nền tảng**: Authentication, User Profile, Notification Settings.
2.  **Nghiệp vụ cốt lõi (Core Business)**: Ví dụ Booking, Ecommerce, CRM, Service Execution.
3.  **Tài chính & Giao dịch**: Payment Processing, Invoicing, Refund Management.
4.  **Tương tác & Đánh giá**: Reviews, Ratings, Real-time Tracking.
5.  **Quản trị & Vận hành**: User Management, Role & Permissions, Content Management.
6.  **Dữ liệu & Báo cáo**: Business Analytics, Staff Analytics, Audit Logs.

## Ví dụ mẫu

| STT | Phân Quyền | Nhóm Chức Năng | Chức Năng | Mô Tả | Yêu Cầu Dự Án |
|-----|------------|----------------|-----------|-------|---------------|
| 1 | | **Authentication** | | | |
| 2 | All | Authentication | Login | Đăng nhập qua Email/SĐT và Mật khẩu | Bắt buộc |
| 3 | Customer | **Service Management** | | | |
| 4 | Customer | Service Management | Search Service | Tìm kiếm dịch vụ theo từ khóa | Bắt buộc |

## Khi nào kích hoạt?
Sử dụng mỗi khi người dùng có các yêu cầu như: 
- "tạo danh sách chức năng"
- "lập blueprint cho dự án [Tên]"
- "list features tương tự CleanZ"
- "vẽ bản đồ tính năng cho ứng dụng [X]"
- "liệt kê các chức năng cần thiết cho hệ thống [Y]"
