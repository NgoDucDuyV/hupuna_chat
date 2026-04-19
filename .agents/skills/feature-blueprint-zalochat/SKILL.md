---
name: feature-blueprint-zalochat
description: Blueprint toàn diện về chức năng và yêu cầu nghiệp vụ cho dự án Zalo Chat Clone. Sử dụng khi cần tra cứu danh sách 90+ chức năng chi tiết, lập kế hoạch phát triển, hoặc đảm bảo tính đầy đủ của hệ thống chat theo chuẩn Premium. Skill này đóng vai trò là "Bản đồ kho báu" hướng dẫn triển khai từ Auth, Realtime Chat đến To-Do và AI Features.
---

# Zalo Chat Blueprint (Premium)

Skill này chứa toàn bộ định nghĩa về chức năng và quy trình phát triển cho dự án Zalo Chat Clone, đảm bảo hệ thống đạt tiêu chuẩn 100% như bản Zalo Web hiện tại.

## Tài liệu Tham chiếu (Reference)

Toàn bộ danh sách 90+ chức năng chi tiết được lưu trữ tại:
- [Danh sách chức năng Full](file:///e:/HUPUNA_CHAT/.agents/skills/feature-blueprint-zalochat/references/feature_list.md)

## Nguyên tắc Phát triển (Development Principles)

1.  **Tính Real-time tối thượng**: Mọi hành động (Gửi tin, Reaction, Thu hồi, Trạng thái Seen) phải được xử lý qua WebSocket với độ trễ thấp nhất.
2.  **Trải nghiệm Web mượt mà**: Sử dụng cơ chế Virtual List để handle hàng ngàn tin nhắn mà không gây lag trình duyệt.
3.  **Bảo mật & Riêng tư**: Tuân thủ các quy tắc về Hidden Chat (ẩn cuộc trò chuyện) và đồng bộ hóa an toàn đa thiết bị.
4.  **Tăng năng suất (Productivity)**: Chú trọng vào bộ 3 tính năng: Truyền File, Giao việc (To-Do) và Bình chọn (Poll).

## Hướng dẫn sử dụng cho AI (AI Instructions)

Mỗi khi người dùng yêu cầu thực hiện code hoặc lên kế hoạch cho dự án Zalo Chat:
1.  **Tra cứu Reference**: Đọc file `references/feature_list.md` để nắm rõ yêu cầu cụ thể của từng chức năng.
2.  **Đảm bảo tính nhất quán**: Code Frontend phải phản ánh đúng Phân Quyền (User/Admin) và Backend phải đầy đủ các nghiệp vụ được mô tả.
3.  **Tư vấn mở rộng**: Dựa trên cột "Yêu Cầu Dự Án", hãy ưu tiên các tính năng `Bắt buộc` trước, sau đó mới đề xuất các tính năng `Mở rộng`.

## Các Module Trọng tâm (Context Map)

- **Module Chat**: Xử lý tin nhắn, media, stickers, và các hành động tin nhắn (Recall, Reply).
- **Module Productivity**: Quản lý To-do, Poll, và Cloud của tôi.
- **Module Social**: Quản lý bạn bè, lời mời và tìm kiếm.
- **Module Infrastructure**: WebSocket, S3 Storage, Redis, Database (PostgreSQL + MongoDB).
