# Danh Sách Tính Năng CleanZ

| STT | Phân Quyền | Nhóm Chức Năng | Chức Năng | Mô Tả | Yêu Cầu Dự Án |
|-----|------------|----------------|-----------|-------|---------------|
| 1 | | **Authentication** | | | |
| 2 | All | Authentication | Register | Đăng ký tài khoản mới với email, phone, password | Bắt buộc |
| 3 | All | Authentication | Login | Đăng nhập bằng email/phone + password | Bắt buộc |
| 4 | All | Authentication | Social Login | Đăng nhập qua Google, Facebook, Apple | Bắt buộc |
| 5 | All | Authentication | Password Reset | Đặt lại mật khẩu qua email xác nhận | Bắt buộc |
| 6 | All | Authentication | OTP Verification | Xác thực tài khoản bằng mã OTP | Bắt buộc |
| 7 | All | Authentication | Two-Factor Authentication | Bảo mật tài khoản bằng 2FA (tuỳ chọn) | Bắt buộc |
| 8 | All | Authentication | Session Management | Quản lý phiên đăng nhập | Bắt buộc |
| 9 | | **User Profile Management** | | | |
| 10 | Customer | User Profile Management | View Profile | Xem thông tin cá nhân | Bắt buộc |
| 11 | Customer | User Profile Management | Edit Profile | Cập nhật họ tên, số điện thoại, ảnh đại diện | Bắt buộc |
| 12 | Customer | User Profile Management | Manage Addresses | Thêm/sửa/xoá địa chỉ cá nhân | Bắt buộc |
| 13 | Customer | User Profile Management | Manage Payment Methods | Thêm/xoá phương thức thanh toán | Bắt buộc |
| 14 | Customer | User Profile Management | View Account History | Xem lịch sử hoạt động tài khoản | Bắt buộc |
| 15 | Customer | User Profile Management | Deactivate Account | Vô hiệu hoá tài khoản tạm thời | Bắt buộc |
| 16 | Customer | User Profile Management | Delete Account | Xoá tài khoản vĩnh viễn (với dữ liệu được lưu trữ) | Bắt buộc |
| 17 | Customer | User Profile Management | Manage Notifications | Cấu hình thông báo (email, SMS, push) | Bắt buộc |
| 18 | Customer | User Profile Management | Change Password | Thay đổi mật khẩu | Bắt buộc |
| 19 | | **Service Management** | | | |
| 20 | All | Service Management | View Service List | Hiển thị danh sách tất cả dịch vụ | Bắt buộc |
| 21 | All | Service Management | View Service Details | Xem chi tiết dịch vụ (mô tả, giá, thời gian) | Bắt buộc |
| 22 | All | Service Management | Search Services | Tìm kiếm dịch vụ theo từ khoá | Bắt buộc |
| 23 | All | Service Management | Filter Services | Lọc dịch vụ theo category, giá, rating | Bắt buộc |
| 24 | All | Service Management | View Service Photos | Xem hình ảnh minh hoạ dịch vụ | Bắt buộc |
| 25 | System Admin | Service Management | Add Service | Thêm dịch vụ mới vào hệ thống | Mở rộng |
| 26 | System Admin | Service Management | Edit Service | Cập nhật thông tin dịch vụ | Mở rộng |
| 27 | System Admin | Service Management | Deactivate Service | Ẩn dịch vụ khỏi danh sách | Mở rộng |
| 28 | System Admin | Service Management | View Service Analytics | Xem số lần đặt, doanh thu theo dịch vụ | Mở rộng |
| 29 | | **Pricing Management** | | | |
| 30 | All | Pricing Management | View Base Price | Xem giá cơ bản của dịch vụ | Bắt buộc |
| 31 | All | Pricing Management | Calculate Dynamic Price | Tính giá theo khoảng cách, diện tích, khó độ | Bắt buộc |
| 32 | Customer | Pricing Management | Add Discount Code | Sử dụng mã giảm giá/voucher | Bắt buộc |
| 33 | All | Pricing Management | View Discount Rules | Xem các chương trình khuyến mãi | Bắt buộc |
| 34 | Operations Admin | Pricing Management | Create Discount Campaign | Tạo mã giảm giá mới | Mở rộng |
| 35 | Operations Admin | Pricing Management | Apply Bulk Discount | Giảm giá cho đơn hàng nhiều dịch vụ | Mở rộng |
| 36 | Operations Admin | Pricing Management | Manage Pricing Tiers | Quản lý mức giá theo khoảng cách | Mở rộng |
| 37 | | **Reviews & Ratings** | | | |
| 38 | All | Reviews & Ratings | View Reviews | Xem đánh giá và nhận xét | Bắt buộc |
| 39 | All | Reviews & Ratings | View Rating Score | Xem điểm đánh giá của dịch vụ/staff | Bắt buộc |
| 40 | Customer | Reviews & Ratings | Submit Review | Gửi đánh giá sau khi hoàn thành dịch vụ | Bắt buộc |
| 41 | Customer | Reviews & Ratings | Rate Cleaning Staff | Đánh giá nhân viên cụ thể | Bắt buộc |
| 42 | Customer | Reviews & Ratings | Upload Review Photos | Đính kèm ảnh trong đánh giá | Mở rộng |
| 43 | System Admin | Reviews & Ratings | Moderate Reviews | Phê duyệt/từ chối đánh giá không hợp lệ | Mở rộng |
| 44 | Cleaning Staff | Reviews & Ratings | Reply to Review | Phản hồi đánh giá từ khách hàng | Mở rộng |
| 45 | System Admin | Reviews & Ratings | Hide Inappropriate Review | Ẩn đánh giá vi phạm quy định | Mở rộng |
| 46 | | **Booking Management** | | | |
| 47 | Customer | Booking Management | Create Booking | Tạo đơn đặt dịch vụ mới | Bắt buộc |
| 48 | Customer | Booking Management | Select Service Type | Chọn loại dịch vụ (cơ bản, nâng cao, combo) | Bắt buộc |
| 49 | Customer | Booking Management | Select Booking Date | Chọn ngày dọn (calendar picker) | Bắt buộc |
| 50 | Customer | Booking Management | Select Booking Time | Chọn khung giờ dọn | Bắt buộc |
| 51 | Customer | Booking Management | Add Special Requests | Thêm yêu cầu đặc biệt (allergens, item cần cẩn thận) | Bắt buộc |
| 52 | Customer | Booking Management | View Available Slots | Hiển thị khung giờ còn trống | Bắt buộc |
| 53 | Customer | Booking Management | Modify Booking | Cập nhật ngày giờ/dịch vụ (trước 24h) | Bắt buộc |
| 54 | Customer | Booking Management | Cancel Booking | Huỷ đơn đặt (với chính sách hoàn tiền) | Bắt buộc |
| 55 | Customer | Booking Management | View Booking Details | Xem thông tin chi tiết đơn hàng | Bắt buộc |
| 56 | Customer | Booking Management | Confirm Booking | Xác nhận hoàn thành quá trình đặt lịch | Bắt buộc |
| 57 | Customer | Booking Management | Get Booking Quote | Xem giá dự kiến trước khi confirm | Bắt buộc |
| 58 | Customer | Booking Management | Reschedule Booking | Chuyển ngày giờ dịch vụ | Bắt buộc |
| 59 | System (Tự Động) | Booking Management | Auto-Assign Staff | Gán tự động nhân viên phù hợp | Bắt buộc |
| 60 | Customer | Booking Management | View Booking History | Xem lịch sử tất cả đơn hàng | Bắt buộc |
| 61 | | **Schedule Management** | | | |
| 62 | Operations Admin | Schedule Management | View Staff Schedule | Xem lịch làm việc nhân viên | Bắt buộc |
| 63 | Cleaning Staff | Schedule Management | View Cleaning Schedule | Xem danh sách công việc hôm nay | Bắt buộc |
| 64 | Cleaning Staff | Schedule Management | Set Availability | Nhân viên khai báo thời gian có sẵn | Bắt buộc |
| 65 | Operations Admin | Schedule Management | Block Time Slot | Chặn khung giờ không cho đặt | Bắt buộc |
| 66 | Operations Admin | Schedule Management | Manage Staff Shift | Quản lý ca làm việc của nhân viên | Bắt buộc |
| 67 | Operations Admin | Schedule Management | Capacity Planning | Kiểm tra năng lực (số lượng đơn/ngày) | Bắt buộc |
| 68 | Operations Admin | Schedule Management | Route Optimization | Sắp xếp lộ trình tối ưu cho nhân viên | Bắt buộc |
| 69 | | **Payment Processing** | | | |
| 70 | Customer | Payment Processing | Add Payment Method | Thêm thẻ tín dụng/ngân hàng | Bắt buộc |
| 71 | Customer | Payment Processing | Select Payment Method | Chọn phương thức thanh toán | Bắt buộc |
| 72 | Customer | Payment Processing | Process Payment | Xử lý thanh toán online | Bắt buộc |
| 73 | Customer | Payment Processing | Save Card | Lưu thẻ để thanh toán lần sau | Mở rộng |
| 74 | Customer | Payment Processing | Pay at Venue | Thanh toán trực tiếp tại nhà | Mở rộng |
| 75 | Customer | Payment Processing | Wallet/Credit Balance | Dùng số dư ví điện tử | Mở rộng |
| 76 | System (Tự Động) | Payment Processing | Payment Confirmation | Gửi xác nhận thanh toán qua email/SMS | Mở rộng |
| 76 | Operations Admin | Payment Processing | Refund Payment | Hoàn tiền cho đơn huỷ | Bắt buộc |
| 77 | Customer | Payment Processing | Payment History | Xem lịch sử giao dịch | Mở rộng |
| 77 | System | Payment Processing | Failed Payment Retry | Thử lại thanh toán thất bại | Mở rộng |
| 78 | Customer | Payment Processing | Transaction Receipt | Nhận biên nhận giao dịch | Bắt buộc |
| 78 | | **Invoicing & Billing** | | | |
| 78 | System (Tự Động) | Invoicing & Billing | Generate Invoice | Tạo hoá đơn sau khi dịch vụ hoàn thành | Mở rộng |
| 79 | Customer | Invoicing & Billing | View Invoice | Xem hoá đơn chi tiết | Bắt buộc |
| 79 | Customer | Invoicing & Billing | Download Invoice | Tải hoá đơn dưới dạng PDF | Mở rộng |
| 80 | System | Invoicing & Billing | Email Invoice | Gửi hoá đơn qua email | Mở rộng |
| 80 | Operations Admin | Invoicing & Billing | Invoice Customization | Tùy chỉnh hoá đơn (header, footer) | Mở rộng |
| 81 | System | Invoicing & Billing | Tax Calculation | Tính toán thuế tự động | Mở rộng |
| 81 | Customer | Invoicing & Billing | Billing Address | Quản lý địa chỉ thanh toán riêng | Mở rộng |
| 82 | Operations Admin | Invoicing & Billing | Billing Report | Báo cáo doanh thu theo thời gian | Bắt buộc |
| 82 | | **Refund & Dispute Management** | | | |
| 83 | Customer | Refund & Dispute Management | Request Refund | Yêu cầu hoàn tiền/hoàn lại tiền | Bắt buộc |
| 83 | Customer | Refund & Dispute Management | View Refund Status | Theo dõi trạng thái hoàn tiền | Bắt buộc |
| 84 | System | Refund & Dispute Management | Automatic Refund | Hoàn tiền tự động theo chính sách | Bắt buộc |
| 84 | Operations Admin | Refund & Dispute Management | Manual Refund | Hoàn tiền thủ công | Bắt buộc |
| 85 | Operations Admin | Refund & Dispute Management | Refund Timeline | Thiết lập thời gian hoàn tiền (3-5 ngày) | Bắt buộc |
| 85 | Customer | Refund & Dispute Management | File Complaint | Khiếu nại về dịch vụ | Bắt buộc |
| 86 | Customer | Refund & Dispute Management | View Complaint Status | Theo dõi tình trạng khiếu nại | Bắt buộc |
| 86 | Operations Admin | Refund & Dispute Management | Resolve Complaint | Giải quyết khiếu nại | Bắt buộc |
| 87 | | **Order Management** | | | |
| 87 | System | Order Management | Create Order | Tạo đơn hàng từ booking xác nhận | Bắt buộc |
| 88 | Customer | Order Management | View Order Status | Xem trạng thái đơn (Pending, Confirmed, In-Progress, Completed) | Bắt buộc |
| 88 | Operations Admin | Order Management | Update Order Status | Cập nhật trạng thái đơn | Bắt buộc |
| 89 | Operations Admin | Order Management | Assign Order to Staff | Gán đơn cho nhân viên cụ thể | Bắt buộc |
| 89 | Operations Admin | Order Management | Bulk Order Assignment | Gán hàng loạt đơn hàng | Bắt buộc |
| 90 | System | Order Management | Order Notification | Gửi thông báo cập nhật trạng thái | Bắt buộc |
| 90 | Operations Admin | Order Management | Order Details | Xem đầy đủ thông tin đơn (địa chỉ, dịch vụ, khách hàng) | Bắt buộc |
| 91 | Customer | Order Management | Order Timeline | Xem lịch sử thay đổi trạng thái đơn | Bắt buộc |
| 91 | Cleaning Staff | Order Management | Add Notes to Order | Thêm ghi chú (yêu cầu đặc biệt, vấn đề phát sinh) | Bắt buộc |
| 92 | Customer | Order Management | Customer Notes | Xem ghi chú nhân viên về dịch vụ (sau khi hoàn thành) | Bắt buộc |
| 92 | | **Service Execution** | | | |
| 93 | Cleaning Staff | Service Execution | View Assigned Jobs | Xem danh sách công việc được gán | Bắt buộc |
| 93 | Cleaning Staff | Service Execution | Start Service | Nhân viên bắt đầu dịch vụ (check-in) | Bắt buộc |
| 94 | Cleaning Staff | Service Execution | End Service | Nhân viên kết thúc dịch vụ (check-out) | Bắt buộc |
| 94 | Operations Admin | Service Execution | GPS Tracking | Theo dõi vị trí nhân viên thời gian thực | Bắt buộc |
| 95 | System | Service Execution | Service Duration | Tự động tính thời gian thực hiện dịch vụ | Bắt buộc |
| 95 | Cleaning Staff | Service Execution | Photo Documentation | Nhân viên chụp ảnh trước/sau dọn | Bắt buộc |
| 96 | Cleaning Staff | Service Execution | Upload Before-After Photos | Tải ảnh lên để khách hàng xem | Bắt buộc |
| 96 | Cleaning Staff | Service Execution | Upload Completion Proof | Tải ảnh/video chứng minh hoàn thành | Bắt buộc |
| 97 | Cleaning Staff | Service Execution | Quality Checklist | Nhân viên kiểm tra chất lượng (checklist) | Bắt buộc |
| 97 | Cleaning Staff | Service Execution | Customer Signature | Xin chữ ký khách hàng (nếu có) | Mở rộng |
| 98 | System | Service Execution | Real-time Status Update | Cập nhật trạng thái thực tế cho khách | Bắt buộc |
| 98 | | **Real-time Tracking** | | | |
| 99 | Customer | Real-time Tracking | Live Location Tracking | Khách hàng xem vị trí nhân viên trên bản đồ | Mở rộng |
| 99 | Customer | Real-time Tracking | Estimated Arrival Time | Hiển thị thời gian dự kiến đến | Bắt buộc |
| 100 | Customer | Real-time Tracking | Notification on Arrival | Thông báo khi nhân viên sắp đến | Bắt buộc |
| 100 | Customer | Real-time Tracking | Service Progress | Cập nhật tiến trình dịch vụ | Bắt buộc |
| 101 | Customer | Real-time Tracking | Staff Info | Hiển thị thông tin nhân viên (tên, ảnh, rating) | Bắt buộc |
| 101 | Customer | Real-time Tracking | Contact Staff | Liên hệ trực tiếp với nhân viên đang dọn | Bắt buộc |
| 102 | | **Staff Profile & Verification** | | | |
| 102 | Cleaning Staff | Staff Profile & Verification | Staff Registration | Nhân viên đăng ký tài khoản | Bắt buộc |
| 103 | Cleaning Staff | Staff Profile & Verification | Staff Profile | Quản lý hồ sơ nhân viên | Bắt buộc |
| 103 | Operations Admin | Staff Profile & Verification | ID Verification | Xác minh danh tính (CCCD/Hộ chiếu) | Bắt buộc |
| 104 | Operations Admin | Staff Profile & Verification | Background Check | Kiểm tra lý lịch nhân viên | Bắt buộc |
| 104 | Cleaning Staff | Staff Profile & Verification | Document Upload | Tải lên giấy tờ cần thiết | Bắt buộc |
| 105 | Operations Admin | Staff Profile & Verification | Certification Management | Quản lý chứng chỉ/khóa đào tạo | Bắt buộc |
| 105 | Cleaning Staff | Staff Profile & Verification | Experience & Skills | Khai báo kinh nghiệm, kỹ năng dọn | Bắt buộc |
| 106 | Cleaning Staff | Staff Profile & Verification | Bank Account Info | Cập nhật tài khoản để nhận tiền | Bắt buộc |
| 106 | | **Staff Rating & Performance** | | | |
| 107 | All | Staff Rating & Performance | View Staff Rating | Xem đánh giá của nhân viên | Bắt buộc |
| 107 | Customer | Staff Rating & Performance | Rate Staff | Khách hàng đánh giá nhân viên | Bắt buộc |
| 108 | Operations Admin | Staff Rating & Performance | View Performance Metrics | Xem hiệu suất (số đơn, rating trung bình) | Bắt buộc |
| 108 | System | Staff Rating & Performance | Performance Incentives | Tính thưởng dựa trên performance | Mở rộng |
| 109 | Operations Admin | Staff Rating & Performance | Disciplinary Record | Ghi nhận cảnh cáo/hình phạt | Mở rộng |
| 109 | Operations Admin | Staff Rating & Performance | Commendation | Ghi nhận nhân viên xuất sắc | Mở rộng |
| 110 | | **Staff Payroll & Earnings** | | | |
| 110 | Cleaning Staff | Staff Payroll & Earnings | View Earnings | Nhân viên xem thu nhập | Bắt buộc |
| 111 | Cleaning Staff | Staff Payroll & Earnings | Earnings Breakdown | Chi tiết tiền từ từng đơn hàng | Bắt buộc |
| 111 | Operations Admin | Staff Payroll & Earnings | Payout Schedule | Lịch thanh toán lương/công | Bắt buộc |
| 112 | Cleaning Staff | Staff Payroll & Earnings | Request Payout | Yêu cầu rút tiền sớm | Bắt buộc |
| 112 | Operations Admin | Staff Payroll & Earnings | Payout History | Xem lịch sử thanh toán | Bắt buộc |
| 113 | Cleaning Staff | Staff Payroll & Earnings | Bonus & Incentive | Hiển thị tiền thưởng thêm | Bắt buộc |
| 113 | Cleaning Staff | Staff Payroll & Earnings | Expense Reimbursement | Nhân viên báo cáo chi phí để hoàn lại | Bắt buộc |
| 114 | | **Staff Leave & Time Off** | | | |
| 114 | Cleaning Staff | Staff Leave & Time Off | Request Leave | Yêu cầu nghỉ phép | Bắt buộc |
| 115 | Operations Admin | Staff Leave & Time Off | Approve/Reject Leave | Duyệt yêu cầu nghỉ | Bắt buộc |
| 115 | Cleaning Staff | Staff Leave & Time Off | View Leave Balance | Xem số ngày nghỉ còn lại | Bắt buộc |
| 116 | Cleaning Staff | Staff Leave & Time Off | Mark Unavailable | Khai báo không có sẵn | Bắt buộc |
| 116 | Operations Admin | Staff Leave & Time Off | Vacation Scheduling | Lên lịch nghỉ dài hạn | Bắt buộc |
| 117 | | **Customer Analytics** | | | |
| 117 | System Admin | Customer Analytics | New Customer Acquisition | Thống kê khách mới theo kỳ | Mở rộng |
| 118 | System Admin | Customer Analytics | Customer Retention | Phân tích tỷ lệ giữ chân khách | Mở rộng |
| 118 | System Admin | Customer Analytics | Repeat Order Rate | Tỷ lệ khách đặt lại dịch vụ | Mở rộng |
| 119 | System Admin | Customer Analytics | Customer Segmentation | Phân nhóm khách theo hành vi | Mở rộng |
| 119 | System Admin | Customer Analytics | Churn Analysis | Phân tích khách hàng bỏ dịch vụ | Mở rộng |
| 120 | | **Business Analytics** | | | |
| 120 | System Admin | Business Analytics | Revenue Report | Báo cáo doanh thu theo thời gian | Bắt buộc |
| 121 | System Admin | Business Analytics | Booking Statistics | Thống kê số lượng đơn đặt | Bắt buộc |
| 121 | System Admin | Business Analytics | Service Performance | Dịch vụ nào được đặt nhiều nhất | Bắt buộc |
| 122 | System Admin | Business Analytics | Peak Hours | Xác định giờ cao điểm đặt dịch vụ | Bắt buộc |
| 122 | System Admin | Business Analytics | Geographic Analytics | Phân tích doanh thu theo khu vực | Mở rộng |
| 123 | System Admin | Business Analytics | Payment Methods Analysis | Phương thức thanh toán được sử dụng nhiều | Mở rộng |
| 123 | System Admin | Business Analytics | Conversion Funnel | Phân tích từng bước trong quy trình đặt | Mở rộng |
| 124 | | **Staff Analytics** | | | |
| 124 | System Admin | Staff Analytics | Staff Performance Report | Hiệu suất từng nhân viên | Bắt buộc |
| 125 | System Admin | Staff Analytics | Average Rating by Staff | Đánh giá trung bình từng nhân viên | Bắt buộc |
| 125 | System Admin | Staff Analytics | Utilization Rate | Tỷ lệ sử dụng (nhân viên bận bao nhiêu %) | Bắt buộc |
| 126 | System Admin | Staff Analytics | Earnings Report | Báo cáo thu nhập nhân viên | Bắt buộc |
| 126 | System Admin | Staff Analytics | Staff Capacity Forecast | Dự báo nhu cầu nhân viên | Bắt buộc |
| 127 | | **Quality Metrics** | | | |
| 127 | System Admin | Quality Metrics | Customer Satisfaction Score | Điểm hài lòng khách hàng | Bắt buộc |
| 128 | System Admin | Quality Metrics | Complaint Rate | Tỷ lệ khiếu nại | Bắt buộc |
| 128 | System Admin | Quality Metrics | Refund Rate | Tỷ lệ đơn hoàn tiền | Bắt buộc |
| 129 | System Admin | Quality Metrics | On-time Completion | Tỷ lệ hoàn thành đúng giờ | Bắt buộc |
| 129 | | **User Management** *(System Admin only)* | | | |
| 130 | System Admin | User Management | View All Users | Xem danh sách tất cả người dùng | Bắt buộc |
| 130 | System Admin | User Management | User Details | Xem thông tin chi tiết người dùng | Bắt buộc |
| 131 | System Admin | User Management | Enable/Disable User | Kích hoạt/vô hiệu hoá tài khoản | Bắt buộc |
| 131 | System Admin | User Management | Reset User Password | Đặt lại mật khẩu người dùng | Bắt buộc |
| 132 | System Admin | User Management | View User Activity Log | Xem lịch sử hoạt động | Bắt buộc |
| 132 | System Admin | User Management | Assign Role | Gán vai trò cho người dùng | Bắt buộc |
| 133 | System Admin | User Management | Bulk User Import | Import danh sách người dùng | Bắt buộc |
| 133 | | **Role & Permission Management** | | | |
| 134 | System Admin | Role & Permission Management | Create Role | Tạo vai trò mới | Bắt buộc |
| 134 | System Admin | Role & Permission Management | Edit Role | Chỉnh sửa quyền của vai trò | Bắt buộc |
| 135 | System Admin | Role & Permission Management | Assign Permissions | Gán quyền chi tiết cho vai trò | Bắt buộc |
| 135 | System Admin | Role & Permission Management | View Permission List | Xem danh sách quyền toàn hệ thống | Bắt buộc |
| 136 | System Admin | Role & Permission Management | Audit Trail | Xem lịch sử thay đổi quyền | Bắt buộc |
| 136 | | **Content Management** | | | |
| 137 | System Admin | Content Management | Manage Pages | Quản lý trang tĩnh (About, Contact, Terms) | Bắt buộc |
| 137 | System Admin | Content Management | Edit Terms & Conditions | Cập nhật điều khoản sử dụng | Bắt buộc |
| 138 | System Admin | Content Management | Edit Privacy Policy | Cập nhật chính sách bảo mật | Bắt buộc |
| 138 | System Admin | Content Management | Manage FAQs | Quản lý câu hỏi thường gặp | Bắt buộc |
| 139 | System Admin | Content Management | Upload Banner/Promotion | Tải ảnh banner quảng cáo | Bắt buộc |
| 139 | | **Subscription & Loyalty Programs** | | | |
| 140 | Customer | Subscription & Loyalty Programs | Monthly Subscription | Gói dọn lặp lại hàng tháng | Mở rộng |
| 140 | Customer | Subscription & Loyalty Programs | Bi-weekly Service | Gói dọn 2 tuần một lần | Mở rộng |
| 141 | Customer | Subscription & Loyalty Programs | Subscription Management | Quản lý gói đăng ký | Mở rộng |
| 141 | Customer | Subscription & Loyalty Programs | Cancel Subscription | Huỷ gói đăng ký | Mở rộng |
| 142 | Operations Admin | Subscription & Loyalty Programs | Pause Subscription | Tạm dừng gói | Mở rộng |
| 142 | Customer | Subscription & Loyalty Programs | Loyalty Points | Tích lũy điểm từ mỗi đơn | Mở rộng |
| 143 | Customer | Subscription & Loyalty Programs | Redeem Points | Dùng điểm để giảm giá | Mở rộng |
| 143 | Operations Admin | Subscription & Loyalty Programs | Referral Program | Giới thiệu bạn bè được thưởng | Mở rộng |
| 144 | | **Notification System** | | | |
| 144 | All | Notification System | Email Notification | Gửi thông báo qua email | Bắt buộc |
| 145 | All | Notification System | Notification Preferences | Tuỳ chỉnh loại/tần suất thông báo | Bắt buộc |
| 145 | All | Notification System | Notification History | Xem lịch sử thông báo đã nhận | Bắt buộc |
| 146 | All | Notification System | Unsubscribe | Hủy đăng ký thông báo nhất định | Bắt buộc |
| 146 | | **Audit & Logging** | | | |
| 147 | System Admin | Audit & Logging | View Activity Log | Xem nhật ký hoạt động hệ thống | Mở rộng |
| 147 | System Admin | Audit & Logging | Export Activity Log | Xuất nhật ký hoạt động | Mở rộng |
| 148 | System Admin | Audit & Logging | Login History | Xem lịch sử đăng nhập | Mở rộng |
| 148 | System Admin | Audit & Logging | API Request Log | Xem lịch sử request API | Mở rộng |
| 149 | System Admin | Audit & Logging | Error Log | Xem nhật ký lỗi hệ thống | Mở rộng |
| 149 | System Admin | Audit & Logging | Filter Logs | Tìm kiếm theo user/action/thời gian | Bắt buộc |
