# Danh Sách Tính Năng Chi Tiết — ZaloChat Web Clone (Full)

| STT | Phân Quyền | Nhóm Chức Năng | Chức Năng | Mô Tả | Yêu Cầu Dự Án |
|-----|------------|----------------|-----------|-------|---------------|
| 1 | | **🔐 Authentication & Access** | | | |
| 2 | User | Authentication | Register via Email/Phone | Đăng ký tài khoản bằng Email hoặc Số điện thoại | Bắt buộc |
| 3 | User | Authentication | OTP Verification | Xác thực đăng ký/đăng nhập bằng mã OTP qua Email/SĐT | Bắt buộc |
| 4 | Admin | Authentication | Account Approval | Admin duyệt và kích hoạt tài khoản thì mới được đăng nhập | Bắt buộc |
| 5 | User | Authentication | Login | Đăng nhập hệ thống (chỉ cho phép sau khi Admin duyệt) | Bắt buộc |
| 6 | User | Authentication | Two-Factor Auth | Cấu hình bảo mật 2 lớp (2FA) | Bắt buộc |
| 7 | User | Authentication | Change & Forgot Password | Đổi và khôi phục mật khẩu (có xác thực OTP) | Bắt buộc |
| 8 | User | Authentication | Device Management | Quản lý phiên làm việc, đăng xuất từ xa | Bắt buộc |
| 9 | | **👤 User Profile & Identity** | | | |
| 10 | User | User Profile | View Profile | Xem thông tin hồ sơ nhân sự (Phòng ban, chức vụ, SĐT) | Bắt buộc |
| 11 | User | User Profile | Edit Profile | Cập nhật một số thông tin cơ bản (Avatar, châm ngôn) | Bắt buộc |
| 12 | User | User Profile | Update Status | Đăng trạng thái (Đang họp, Vắng mặt, Online) | Bắt buộc |
| 13 | Admin | User Profile | Employee Directory | Danh bạ toàn công ty, cấp bậc, sơ đồ tổ chức | Bắt buộc |
| 14 | User | User Profile | Privacy Settings | Tùy chỉnh nhận tin nhắn từ người ngoài phòng ban | Bắt buộc |
| 15 | | **💬 Chat 1-1 (Core Engine)** | | | |
| 16 | User | Chat 1-1 | Send Text/Emoji | Gửi tin nhắn văn bản và biểu cảm | Bắt buộc |
| 17 | User | Chat 1-1 | Stickers System | Hệ thống sticker phong phú, có thể tải thêm từ store | Bắt buộc |
| 18 | User | Chat 1-1 | Image/Video Sharing | Gửi ảnh, video chất lượng cao (HD) | Bắt buộc |
| 19 | User | Chat 1-1 | File Sharing | Gửi file đính kèm với dung lượng lớn (lên đến 1GB) | Bắt buộc |
| 20 | User | Chat 1-1 | Voice Message | Gửi tin nhắn thoại trực tiếp | Bắt buộc |
| 21 | User | Chat 1-1 | Recall Message | Thu hồi tin nhắn ở cả 2 phía (trong thời gian hạn định) | Bắt buộc |
| 22 | User | Chat 1-1 | Delete for Me | Xóa tin nhắn chỉ phía người dùng hiện tại | Bắt buộc |
| 23 | User | Chat 1-1 | Quote/Reply | Trả lời trích dẫn một tin nhắn cụ thể | Bắt buộc |
| 24 | User | Chat 1-1 | Forward Message | Chuyển tiếp tin nhắn cho người khác/nhóm khác | Bắt buộc |
| 25 | User | Chat 1-1 | Reactions | Thả tim, like, haha... nhanh trên tin nhắn | Bắt buộc |
| 26 | User | Chat 1-1 | Message Status | Hiển thị: Đã gửi, Đã nhận, Đã xem | Bắt buộc |
| 27 | | **☁️ Cloud của tôi (Personal Cloud)** | | | |
| 28 | User | My Cloud | Save to Cloud | Chuyển tiếp/Lưu tin nhắn, file vào không gian riêng | Bắt buộc |
| 29 | User | My Cloud | Categorize Storage | Phân loại dữ liệu trong Cloud thành Ảnh, File, Link | Bắt buộc |
| 30 | User | My Cloud | Search in Cloud | Tìm kiếm nhanh nội dung đã lưu trong không gian riêng | Bắt buộc |
| 31 | | **👥 Group Chat Management** | | | |
| 32 | User | Group Chat | Create Group | Tạo nhóm chat mới và mời thành viên | Bắt buộc |
| 33 | Admin | Group Chat | Add/Remove Member | Admin thêm hoặc loại bỏ thành viên | Bắt buộc |
| 34 | User | Group Chat | Tag Member (@) | Gợi ý và tag tên thành viên trong nhóm | Bắt buộc |
| 35 | Admin | Group Chat | Group Permissions | Cài đặt quyền: Ai được đổi tên, ghim tin, gửi tin | Bắt buộc |
| 36 | Admin | Group Chat | Assign Deputy Admin | Bổ nhiệm phó nhóm để hỗ trợ quản lý | Bắt buộc |
| 37 | User | Group Chat | Mute Notifications | Tắt thông báo nhóm (trong 1h, 8h, đến khi mở lại) | Bắt buộc |
| 38 | User | Group Chat | Pin Conversation | Ghim nhóm quan trọng lên trên đầu danh sách | Bắt buộc |
| 39 | User | Group Chat | Group Calendar | Hệ thống nhắc hẹn/lịch chung cho cả nhóm | Mở rộng |
| 40 | User | Group Chat | Poll/Voting | Tạo cuộc bình chọn với nhiều lựa chọn và ẩn danh | Bắt buộc |
| 41 | | **📋 To-Do & Task Management** | | | |
| 42 | User | To-Do | Assign Task | Giao việc cho thành viên trong group từ tin nhắn | Bắt buộc |
| 43 | User | To-Do | Set Deadline | Đặt thời hạn hoàn thành cho công việc | Bắt buộc |
| 44 | User | To-Do | Task Status | Cập nhật tiến độ: Đang làm, Hoàn thành, Hủy | Bắt buộc |
| 45 | User | To-Do | Personal Task List | Quản lý danh sách việc cần làm của riêng mình | Bắt buộc |
| 46 | System | To-Do | Task Reminder | Tự động nhắc nhở khi sắp đến Deadline | Bắt buộc |
| 47 | | **🔍 Search & Navigation** | | | |
| 48 | User | Global Search | Search Messages | Tìm kiếm từ khóa trong lịch sử chat | Bắt buộc |
| 49 | User | Global Search | Search Contacts | Tìm bạn bè/nhóm theo tên | Bắt buộc |
| 50 | User | Global Search | Filter by Media | Lọc kết quả tìm kiếm theo Ảnh, Video, File | Bắt buộc |
| 51 | User | Filter | Unread Filter | Chỉ hiển thị các tin nhắn chưa đọc | Bắt buộc |
| 52 | | **🌐 Social & Contacts** | | | |
| 53 | User | Contacts | Friend Requests | Gửi/Chấp nhận/Đang chờ lời mời kết bạn | Bắt buộc |
| 54 | User | Contacts | Import Contacts | Đồng bộ danh bạ từ điện thoại lên web | Bắt buộc |
| 55 | User | Contacts | Categories Contacts | Phân loại bạn bè (Gia đình, Công việc...) | Mở rộng |
| 56 | User | Contacts | Block/Report | Chặn hoặc báo cáo người dùng vi phạm | Bắt buộc |
| 57 | | **🖼️ Media & Resources Gallery** | | | |
| 58 | User | Gallery | View Shared Media | Xem tất cả ảnh/video đã gửi trong hội thoại | Bắt buộc |
| 59 | User | Gallery | View Shared Files | Xem danh sách file đã gửi, sắp xếp theo thời gian | Bắt buộc |
| 60 | User | Gallery | View Shared Links | Xem danh sách các link (URL) đã chia sẻ | Bắt buộc |
| 61 | | **🔐 Advanced Privacy & Security** | | | |
| 62 | User | Security | Hidden Chats | Ẩn cuộc trò chuyện bằng mã PIN 4 số | Bắt buộc |
| 63 | User | Security | Auto-delete Messages | Tin nhắn tự xóa sau 1, 7, 30 ngày | Mở rộng |
| 64 | User | Security | Sync History | Đồng bộ tin nhắn từ điện thoại qua Web (khi mới login) | Bắt buộc |
| 65 | | **📞 Communication (WebRTC)** | | | |
| 66 | User | Call | Audio Call 1-1 | Gọi thoại trực tiếp qua trình duyệt | Bắt buộc |
| 67 | User | Call | Video Call 1-1 | Gọi hình ảnh chất lượng cao | Bắt buộc |
| 68 | User | Call | Group Call | Gọi thoại/video cho nhiều người trong nhóm | Mở rộng |
| 69 | | **⚙️ Settings & Customization** | | | |
| 70 | User | Settings | Notification Sounds | Tùy chỉnh âm thanh thông báo | Bắt buộc |
| 71 | User | Settings | Dark Mode | Giao diện tối giúp bảo vệ mắt | Bắt buộc |
| 72 | User | Settings | Language | Chuyển đổi Tiếng Việt / Tiếng Anh | Bắt buộc |
| 73 | User | Settings | Shortcut Keys | Quản lý các phím tắt nhanh trên Web | Bắt buộc |
| 74 | User | Settings | Storage Management | Xem dung lượng đang dùng và dọn dẹp bộ nhớ đệm | Bắt buộc |
| 75 | | **🤖 AI & Utilities** | | | |
| 76 | User | AI | Message Suggestion | Gợi ý câu trả lời nhanh dựa trên nội dung | Mở rộng |
| 77 | User | AI | Voice-to-Text | Chuyển đổi tin nhắn thoại thành văn bản | Mở rộng |
| 78 | User | Utility | Message Scheduler | Hẹn giờ gửi tin nhắn | Mở rộng |
| 79 | | **🖥️ System & Infrastructure** | | | |
| 80 | System | Performance | WebSocket Cluster | Xử lý hàng triệu kết nối đồng thời | Bắt buộc |
| 81 | System | Performance | S3 Object Storage | Lưu trữ file, ảnh, video ổn định | Bắt buộc |
| 82 | System | Infrastructure | Redis Pub/Sub | Đảm bảo tính realtime giữa các server instances | Bắt buộc |
| 83 | System | Security | End-to-End Encryption | Mã hóa đầu cuối cho tin nhắn bí mật | Mở rộng |
| 84 | System | Database | SQL + NoSQL | Sử dụng PostgreSQL (Auth/Contacts) và MongoDB (Messages) | Bắt buộc |
| 85 | | **📊 Admin Dashboard (Internal Company Management)** | | | |
| 86 | Admin | User Management | Account Verification | Kiểm duyệt, kích hoạt, từ chối tài khoản nhân viên đăng ký mới | Bắt buộc |
| 87 | Admin | User Management | Role & Departments | Tạo phòng ban, gán chức vụ và phân quyền (RBAC) | Bắt buộc |
| 88 | Admin | User Management | Status Control | Vô hiệu hóa/Đóng băng tài khoản nhân sự nghỉ việc | Bắt buộc |
| 89 | Admin | Content Moderation | Chat & File Tracking | Cảnh báo/Giám sát từ khóa nhạy cảm, file chia sẻ vi phạm | Bắt buộc |
| 90 | Admin | System Alert | Global Broadcasting | Gửi thông báo khẩn cấp/Global Announcement toàn công ty | Bắt buộc |
| 91 | Admin | Security | Audit Logs | Ghi System Log toàn bộ hoạt động đăng nhập, sửa quyền, tải file | Bắt buộc |
| 92 | Admin | Analytics | Employee Engagement | Thống kê số lượng tin nhắn, hoạt động tương tác phòng ban | Bắt buộc |
| 93 | Admin | Integration | Directory Sync | Đồng bộ tài khoản qua LDAP/Google Workspace | Mở rộng |
| 94 | Admin | Settings | App Configurations | Quản lý dung lượng lưu trữ tối đa (Quota), giới hạn tính năng | Bắt buộc |
