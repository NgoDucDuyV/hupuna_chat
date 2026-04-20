---
name: feature-blueprint-zalochat
description: Blueprint toàn diện về chức năng và yêu cầu nghiệp vụ cho dự án App Chat Nội Bộ Công Ty. Skill này cung cấp danh sách 90+ chức năng chi tiết cho hệ thống nhắn tin doanh nghiệp, bao gồm quy trình đăng ký bằng Email/SĐT, xác thực OTP, bảo mật 2 lớp, Admin kiểm duyệt tài khoản, đến Realtime Chat và quản lý tổ chức/phòng ban.
---

# Chat Nội Bộ Doanh Nghiệp (Enterprise Chat) Blueprint

Skill này chứa toàn bộ định nghĩa về chức năng và quy trình phát triển cho Hệ thống Chat Nội Bộ Doanh Nghiệp. Khác với app chat public (như Zalo thường), dự án này tập trung vào tính bảo mật, tính định danh và quyền lực quản trị từ cấp Admin.

## Tài liệu Tham chiếu (Reference)

Toàn bộ danh sách 90+ chức năng chi tiết được lưu trữ tại:
- [Danh sách chức năng Full](file:///e:/HUPUNA_CHAT/.agents/skills/feature-blueprint-zalochat/references/feature_list.md)

## Nguyên tắc Phát triển (Enterprise Principles)

1. **Gatekeeping (Quy trình xác thực chặt chẽ)**: User đăng ký (bằng Email/Phone) ➔ Xác nhận OTP (Chứng minh sở hữu) ➔ Trạng thái "Chờ duyệt" ➔ Admin kiểm tra & Xác nhận ➔ User có quyền Đăng nhập.
2. **Tính Real-time tối thượng**: Mọi hành động (Gửi tin, Reaction, Thu hồi, Trạng thái Seen) vẫn giữ vững tốc độ của ứng dụng nhắn tin hiện đại thông qua luồng WebSocket.
3. **Bảo mật Nội Bộ (Internal Security)**: Ngăn chặn rò rỉ dữ liệu, audit log thao tác của Admin, phân biệt rõ người trong công ty và đối tác (nếu có).
4. **Tổ chức & Productivity**: Cấu trúc Contact list dưới dạng sơ đồ tổ chức (Org Chart / Phòng ban), ưu tiên tác vụ Giao việc (To-Do) và Truyền File nội bộ an toàn.

## Hướng dẫn sử dụng cho AI (AI Instructions)

Mỗi khi người dùng yêu cầu thực hiện code cho dự án:
1. **Tra cứu Reference**: Đọc file `references/feature_list.md` để lấy chính xác requirement nghiệp vụ.
2. **Quan tâm đặc biệt đến Phân Quyền**: Frontend và Backend phải phân chia luồng rõ ràng giữa **User Portal** (Web chat) và **Admin Dashboard** (Trang quản trị nhân sự, phê duyệt account).
3. **Thao tác Backend**: Bất cứ logic nào liên quan đến Account, nhớ rằng một account tạo ra là `{ status: 'pending' }` chứ không được phép active ngay.

## Các Module Trọng tâm (Context Map)

- **Module Auth & Identity**: Xử lý gửi OTP, login, quản lý device, luồng register/approval.
- **Module Admin**: Duyệt tài khoản, tạo phòng ban, quản lý file vi phạm, global notification.
- **Module Chat**: Xử lý tin nhắn realtime (1-1, group), media, stickers.
- **Module Productivity**: To-do list chia sẻ, Vote/Poll, lưu trữ Cloud cá nhân.
- **Module Infrastructure**: Socket.io Server, S3 Storage cho files nội bộ, Database phân vùng.
