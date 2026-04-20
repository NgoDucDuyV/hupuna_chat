export enum UserStatus {
  PENDING   = 'PENDING',    // Đã đăng ký, chờ Admin duyệt
  ACTIVE    = 'ACTIVE',     // Admin đã phê duyệt, được đăng nhập
  SUSPENDED = 'SUSPENDED',  // Bị đình chỉ tạm thời
  DISABLED  = 'DISABLED',   // Đã nghỉ việc / bị khóa vĩnh viễn
}
