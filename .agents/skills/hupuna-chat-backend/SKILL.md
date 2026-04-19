---
name: king-of-service-backend
description: Quy chuẩn phát triển Backend cho dự án KingOfService sử dụng NestJS, TypeORM và PostgreSQL. Hướng dẫn viết API chuẩn RESTful, quản lý Module, Entity, DTO, Service và triển khai bảo mật (Auth/RBAC).
---

# KingOfService Backend Development Standard

Kỹ năng này định nghĩa các quy chuẩn phát triển Backend cho dự án KingOfService, đảm bảo tính nhất quán, hiệu suất và khả năng mở rộng của hệ thống API.

## 1. Công nghệ lõi (Tech Stack)
- **Framework**: NestJS (v11+)
- **ORM**: TypeORM (v0.3+)
- **Database**: PostgreSQL
- **Validation**: `class-validator` & `class-transformer`
- **Security**: Passport.js (JWT, Google, Facebook)
- **Email**: MailerModule & Nodemailer

## 2. Cấu trúc Thư mục (Project Architecture)
Dự án áp dụng mô hình **Modular Architecture**, trong đó mỗi tính năng lớn là một module độc lập.

```text
src/
├── common/              # Các thành phần dùng chung (decorators, filters, guards, pipes, utils, enums)
├── modules/             # Các module tính năng (auth, users, services, booking, etc.)
│   └── [feature]/
│       ├── dto/         # Data Transfer Objects cho Input validation
│       ├── entities/    # TypeORM Entities
│       ├── [feature].controller.ts
│       ├── [feature].service.ts
│       └── [feature].module.ts
├── config/              # Cấu hình môi trường (database, jwt, mail, etc.)
├── main.ts              # Điểm khởi đầu của ứng dụng
└── app.module.ts        # Module gốc của ứng dụng
```

## 3. Quy chuẩn viết API (RESTful Standards)

### HTTP Methods & Path Naming
- **GET** `/api/v1/[resources]`: Lấy danh sách (hỗ trợ filter, pagination qua Query).
- **GET** `/api/v1/[resources]/:id`: Lấy chi tiết một bản ghi.
- **POST** `/api/v1/[resources]`: Tạo mới (dữ liệu trong Body).
- **PATCH** `/api/v1/[resources]/:id`: Cập nhật một phần (dữ liệu trong Body).
- **DELETE** `/api/v1/[resources]/:id`: Xóa (soft delete hoặc hard delete).

### Global Prefix
Tất cả các API phải bắt đầu bằng `/api/v1`.

## 4. Bảo mật & Phân quyền (Auth & RBAC)

Dự án sử dụng các Decorator chuẩn để bảo vệ route:

- **`@Auth()`**: Yêu cầu xác thực JWT.
- **`@AdminOnly()`**: Yêu cầu quyền ADMIN (thường đi kèm `@Auth()`).
- **`@CurrentUser()`**: Lấy thông tin user hiện tại từ Payload của Token.
- **`@Public()`**: Bỏ qua xác thực cho các route công khai.

**Ví dụ:**
```typescript
@Controller('services')
@Auth()
export class ServicesController {
  @Post()
  @AdminOnly()
  async create(@Body() createDto: CreateServiceDto, @CurrentUser() user: AuthUser) {
    // Logic
  }
}
```

## 5. Quy chuẩn Phản hồi (Standardized Response)

### Thành công
Trả trực tiếp dữ liệu hoặc đối tượng JSON. NestJS sẽ tự động wrap vào Body với status 200/201.

### Lỗi
Sử dụng `GlobalExceptionFilter` để chuẩn hóa cấu trúc lỗi:
```json
{
  "errors": "Message hoặc mảng validation errors",
  "path": "/api/v1/services",
  "statusCode": 400,
  "timestamp": "2024-03-21T10:00:00.000Z"
}
```

## 6. TypeORM & Entities
- Luôn đặt tên bảng ở dạng số nhiều (e.g., `services`, `users`).
- Sử dụng `id` kiểu `uuid` (v4) cho khóa chính.
- Sử dụng `@CreateDateColumn()` và `@UpdateDateColumn()` cho mọi bảng.
- **Relations**: Sử dụng quan hệ rõ ràng (`ManyToOne`, `OneToMany`, `ManyToMany`).

## 7. Validation & DTOs
- Luôn tạo DTO cho mọi yêu cầu POST/PATCH.
- Sử dụng các decorator từ `class-validator`: `@IsString()`, `@IsEmail()`, `@IsUUID()`, `@IsNotEmpty()`, `@MinLength()`, v.v.
- Sử dụng `@PartialType()` cho Update DTO để tái sử dụng Create DTO.

## 8. Mẫu code chuẩn (Best Practices)

### Controller
```typescript
@Controller('services')
@Auth()
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll(@Query() filter: GetServicesFilterDto) {
    return this.servicesService.getAll(filter);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.servicesService.getById(id);
  }
}
```

### Service
- Service chứa logic nghiệp vụ chính.
- Sử dụng `Repository` được inject từ TypeORM để tương tác với DB.
- Trả về dữ liệu sạch cho Controller, ném ra các `Exception` từ `@nestjs/common` (e.g., `NotFoundException`) khi có lỗi logic.
