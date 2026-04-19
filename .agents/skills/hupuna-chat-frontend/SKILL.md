---
name: king-of-service-frontend
description: Bộ quy chuẩn phát triển Frontend cho dự án KingOfService. Sử dụng khi thực hiện bất kỳ yêu cầu nào liên quan đến phát triển giao diện (UI), cấu trúc component hoặc chỉnh sửa CSS/Tailwind. Kỹ năng này áp dụng các tiêu chuẩn nghiêm ngặt về thẩm mỹ Shadcn, hệ màu Brand (#fd7e14), phương pháp đặt tên BEM, và kiến trúc Atomic.
---

# KingOfService Frontend Development Standard

Kỹ năng này định nghĩa các tiêu chuẩn phát triển Frontend cho dự án KingOfService, đảm bảo tính nhất quán, hiệu suất và khả năng bảo trì cao.

## 1. Công nghệ lõi (Tech Stack)
- **Framework**: Next.js (App Router) & React.
- **Styling**: Tailwind CSS v4 (sử dụng `@theme inline` trong `globals.css`).
- **UI Library**: Shadcn UI (Atomic components).
- **Dark Mode**: Hỗ trợ chuyển đổi giao diện Sáng/Tối (Light/Dark mode) sử dụng `next-themes`.

## 2. Thẩm mỹ & Hệ màu (Brand Identity)
- **Primary Color**: Luôn sử dụng mã màu `#FFA000` hoặc biến `--primary` cho các thành phần Primary, nút bấm, Highlight, hoặc các yếu tố nhận diện thương hiệu.
  - *Ví dụ Tailwind*: `bg-primary`, `text-primary`, `border-primary`.
- **Premium Aesthetic**:
  - **Typography**: Sử dụng font Serif (ví dụ: `font-serif` hoặc `Times New Roman`) cho các tiêu đề lớn (`h1`, `h2`) để tạo cảm giác sang trọng. Sử dụng font `DM Sans` hoặc Sans-serif hiện đại cho các đoạn văn bản.
  - **Glassmorphism**: Sử dụng `bg-card/80 backdrop-blur-md` kết hợp với `border-border/50` cho các thành phần điều hướng, tìm kiếm hoặc card để tạo chiều sâu.
  - **Background Depth**: Thêm các lớp phủ gradient mờ (`radial-gradient`) ở góc trang để tạo hiệu ứng ánh sáng dịu.
  - **Corner Radius**: Sử dụng bo góc lớn cho các khối nội dung chính nhằm tạo cảm giác thân thiện và cao cấp (`rounded-[2.5rem]`, `rounded-[3rem]`).
- **Dark Mode Appearance**: Hệ thống hỗ trợ Dark Mode tự động thông qua `globals.css`. Luôn sử dụng các lớp semantic của Tailwind (e.g., `text-foreground`, `bg-background`, `border-border`) thay vì mã màu cố định.
- **CSS Variables**: Bắt buộc sử dụng các biến CSS từ `globals.css`:
  - `--primary`: `#FFA000` (Light) / `#FFB300` (Dark)
  - `--background`: `#ffffff` / `#09090b`
  - `--foreground`: `#0D1B3E` / `#fafafa`
  - `--secondary`: `#E3F2FD` / `#0D47A1`
  - `--accent`: `#FFF3E0` / `#3E2000`

## 3. Quy tắc đặt tên (Strict Naming Conventions)
### Class Names
- **Tailwind Groups**: Sử dụng `group` và `group-hover` để xử lý các tương tác phức tạp.

### Filenames & Exports
- **KHÔNG sử dụng hậu tố "Component"**: Tuyệt đối không thêm từ "Component" vào tên file hoặc tên biến/class.
  - ✅ `Hero.tsx`, `ServiceCard.tsx`, `CategorySection.tsx`
  - ❌ `HeroComponent.tsx`, `ServiceCardComponent.tsx`
- **PascalCase**: Sử dụng PascalCase cho tên file component và tên function.

## 4. Kiến trúc Component (Atomic Thinking)
- **Atomic Design**: Chia nhỏ giao diện thành các thành phần nhỏ nhất (Atoms) để tái sử dụng tối đa.
- **Component Organization**:
  - **Shared UI**: Các component cơ bản (Button, Input, Badge...) nằm trong `src/components/ui/`.
  - **Feature Components**: Các component theo tính năng nằm trong `src/features/[feature]/_components/`.
  - **Layout Components**: Nằm trong `src/components/` (ví dụ: `Container.tsx`, `Header.tsx`).

## 5. Quy trình thực hiện
1. **Phân tích giao diện**: Xác định các phần tử có thể tách thành Atoms.
2. **Thiết lập Base Styles**: Sử dụng triệt để các biến CSS/class semantic từ `globals.css` (e.g., `bg-primary`, `text-foreground`). Tránh sử dụng mã hex trực tiếp.
3. **Phát triển**: 
   - Sử dụng `lucide-react` cho icons.
   - Sử dụng `motion/react` (Framer Motion) cho hiệu ứng chuyển động.
   - Luôn thêm `aria-hidden="true"` cho các icon trang trí.
   - Sử dụng `text-balance` cho tiêu đề và `text-pretty` cho văn bản dài.

## 6. Mẫu code chuẩn (Best Practices)
```tsx
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  description: string;
}

// ✅ Đúng: Không có hậu tố "Component", sử dụng BEM nếu cần, màu Primary #fd7e14
export const Hero: React.FC<HeroProps> = ({ title, description }) => {
  return (
    <section className="hero-section bg-background px-4 py-20">
      <div className="hero-section__container container mx-auto text-center">
        <h1 className="text-4xl font-bold text-balance mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-muted-foreground text-pretty max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          Bắt đầu ngay
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
};
```
## 7. Quy chuẩn Mobile UI (Responsive Excellence)

Để đảm bảo giao diện luôn "chi tiết, đẹp, đầy đủ và gọn gàng" trên thiết bị di động, cần tuân thủ các quy tắc sau:

### Trải nghiệm Chạm & Tương tác
- **Touch Targets**: Các nút bấm và thành phần tương tác phải có chiều cao tối thiểu `h-12` (48px) để dễ dàng thao tác bằng ngón tay.
- **Spacing**: Sử dụng padding lề mặc định là `px-5` hoặc `px-6` trên mobile để tạo không gian thở cho nội dung.

### Bố cục & Sắp xếp (Layout)
- **Vertical Stacking**: Ưu tiên xếp chồng các khối nội dung theo chiều dọc. Tuy nhiên, với các danh sách icon hoặc category, sử dụng **Horizontal Scroll** (`flex overflow-x-auto scrollbar-hide`) để tiết kiệm diện tích cuộn dọc.
- **Grid Optimization**: Đối với Service Cards hoặc Product Cards trên mobile, sử dụng `grid-cols-1` cho thông tin chi tiết hoặc `grid-cols-2` (với gap nhỏ `gap-3`) nếu muốn hiển thị nhiều mục cùng lúc.
- **Sticky Elements**: Header nên được thiết kế sticky với hiệu ứng glassmorphism (`backdrop-blur-md`) để luôn sẵn sàng điều hướng.

### Thẩm mỹ Mobile (Mobile Aesthetics)
- **Typography Scale**: Sử dụng các lớp `text-[clamp(...)]` hoặc hạ bậc font-size (ví dụ: `text-4xl` trên desktop xuống `text-2xl` trên mobile) để tránh vỡ dòng.
- **Simplified Visuals**: Giảm bớt các hiệu ứng Blur background quá phức tạp trên mobile để tối ưu hiệu năng và giữ cho giao diện sạch sẽ (clean).
- **Bottom Sheets**: Ưu tiên sử dụng `Drawer` (Bottom Sheet) thay vì `Dialog` hoặc `Popover` cho các tính năng như Bộ lọc (Filters) hoặc Chọn tùy chọn để tạo cảm giác giống ứng dụng native.

### Mẫu Code Responsive (Tailwind)
```tsx
<div className="flex flex-col md:flex-row items-center gap-4 px-5 md:px-0">
  <Button className="w-full md:w-auto h-14 md:h-12 bg-primary">
    Đặt lịch ngay
  </Button>
  <div className="flex overflow-x-auto pb-4 md:pb-0 gap-3 scrollbar-hide">
    {/* Horizontal items for mobile */}
  </div>
</div>
```
