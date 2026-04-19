---
name: zalo-chat-design
description: Design system và UX patterns chuẩn Zalo Desktop/Web cho ứng dụng chat. Sử dụng khi người dùng yêu cầu xây dựng giao diện "Zalo-like", "realtime chat UI", "chat sidebar", "message bubble", Dark Mode, ThemeToggle, chọn màu theme, hoặc các ứng dụng nhắn tin hiện đại. Skill này cung cấp thông số chính xác về kích thước (sidebar 64px, list 280-320px), mã màu chuẩn (#0068FF), hỗ trợ Dark Mode đầy đủ, multi-theme với ThemeToggle component và cấu trúc component (search, tabs, messaging). Kích hoạt ngay khi thấy yêu cầu về "thiết kế Zalo", "giao diện chat Zalo", "Zalo style", "dark mode chat", "chọn theme màu".
---

# 📱 Zalo-Like Chat UI/UX Design System

Bộ quy chuẩn tái tạo giao diện chat chuẩn Zalo (Desktop/Web) với độ chính xác ~95%, hỗ trợ **Dark Mode** và **Multi-theme** linh hoạt qua ThemeToggle.

---

## 🧱 1. Layout Tổng Thể (Desktop 3 Cột)

```
| Sidebar 64px | Chat List 280-320px | Chat Window flex-1 |
```

```css
.app-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
```

### Sidebar (Cột Trái)
* **Width**: `64px` — Icon dọc: Chat, Contacts, Cloud, Settings
* **Background Light**: Màu `--primary` của theme hiện tại
* **Background Dark**: `#1E1E2E` (không dùng màu primary trong Dark)
* **Active icon**: Nền sáng hơn + vạch trắng bên trái `3px`
* **Hover**: Tooltip với tên mục

### Chat List (Cột Giữa)
* **Width**: `280px – 320px`
* **Search Bar**: Input rounded, placeholder "Tìm kiếm", icon search trái
* **Tabs**: "Ưu tiên" & "Khác" — Active: text màu `--primary` + underline
* **Chat Item** (h=72px): Avatar tròn + Tên bold + Last msg muted + Timestamp + Unread badge

### Chat Window (Cột Phải)
* **Width**: `flex-1`
* **Header**: Avatar + Tên + Action icons (Call, Search, More) + border-bottom nhẹ

---

## 🎨 2. Color System & Multi-Theme

### 2.1 Design Philosophy
Hệ thống màu dựa trên **CSS Variables + `data-theme` attribute**:
- `data-mode="light"` / `data-mode="dark"` → điều khiển sáng/tối
- `data-theme="blue"` (hoặc rose, green, orange, purple) → điều khiển màu chủ đạo

### 2.2 CSS Variables Đầy Đủ

```css
/* === BASE TOKENS === */
:root {
  /* Spacing */
  --radius-bubble: 12px;
  --radius-input: 8px;
  --radius-card: 12px;
  --padding-message: 16px;
  --padding-input: 12px;
}

/* ===== LIGHT MODE (mặc định) ===== */
[data-mode="light"] {
  --bg-app: #F0F2F5;
  --bg-sidebar: var(--primary-500);
  --bg-list: #F7F8FA;
  --bg-chat: #FFFFFF;
  --bg-input: #F0F2F5;

  --bubble-sent-bg: #D1E8FF;
  --bubble-sent-text: #0A1929;
  --bubble-received-bg: #FFFFFF;
  --bubble-received-text: #111827;

  --text-primary: #111827;
  --text-muted: #6B7280;
  --text-placeholder: #9CA3AF;

  --border: #E5E7EB;
  --shadow: 0 1px 3px rgba(0,0,0,0.08);
  --online-dot: #22C55E;
}

/* ===== DARK MODE ===== */
[data-mode="dark"] {
  --bg-app: #0D1117;
  --bg-sidebar: #161B22;      /* Dark sidebar — không dùng primary color */
  --bg-list: #161B22;
  --bg-chat: #1C2128;
  --bg-input: #21262D;

  --bubble-sent-bg: #1D4ED8;   /* Xanh đậm — đủ contrast trên nền tối */
  --bubble-sent-text: #EFF6FF;
  --bubble-received-bg: #2D333B;
  --bubble-received-text: #CDD9E5;

  --text-primary: #CDD9E5;
  --text-muted: #768390;
  --text-placeholder: #4D5566;

  --border: #30363D;
  --shadow: 0 1px 3px rgba(0,0,0,0.4);
  --online-dot: #3FB950;
}

/* ===== THEME PRESETS (Primary Color) ===== */
/* Mỗi theme định nghĩa --primary-500 (màu chính) và --primary-100 (màu nhạt cho hover/active) */

[data-theme="blue"] {
  --primary-500: #0068FF;
  --primary-400: #3384FF;
  --primary-100: #D1E8FF;
  --primary-text: #FFFFFF;
  --bubble-sent-bg-light: #D1E8FF;
}

[data-theme="rose"] {
  --primary-500: #F43F5E;
  --primary-400: #FB7185;
  --primary-100: #FFE4E6;
  --primary-text: #FFFFFF;
  --bubble-sent-bg-light: #FFE4E6;
}

[data-theme="green"] {
  --primary-500: #10B981;
  --primary-400: #34D399;
  --primary-100: #D1FAE5;
  --primary-text: #FFFFFF;
  --bubble-sent-bg-light: #D1FAE5;
}

[data-theme="orange"] {
  --primary-500: #F97316;
  --primary-400: #FB923C;
  --primary-100: #FFEDD5;
  --primary-text: #FFFFFF;
  --bubble-sent-bg-light: #FFEDD5;
}

[data-theme="purple"] {
  --primary-500: #8B5CF6;
  --primary-400: #A78BFA;
  --primary-100: #EDE9FE;
  --primary-text: #FFFFFF;
  --bubble-sent-bg-light: #EDE9FE;
}
```

### 2.3 Bảng Màu Tổng Hợp

| Thành phần | Light | Dark | Ghi chú |
|---|---|---|---|
| Sidebar BG | `--primary-500` | `#161B22` | Dark không dùng primary |
| Chat List BG | `#F7F8FA` | `#161B22` | |
| Chat Window BG | `#FFFFFF` | `#1C2128` | |
| Bubble Sent | `--primary-100` | `#1D4ED8` | Tint của primary |
| Bubble Received | `#FFFFFF` | `#2D333B` | |
| Text chính | `#111827` | `#CDD9E5` | |
| Text muted | `#6B7280` | `#768390` | |
| Border | `#E5E7EB` | `#30363D` | |

### 2.4 Spacing & Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-bubble` | `12px` | Message bubble |
| `--radius-input` | `8px` | Input field |
| `--radius-card` | `12px` | Empty state card |
| `--padding-message` | `16px` | Message area padding |
| `--padding-input` | `12px` | Input area padding |

---

## 🔆 3. ThemeToggle Component

Đây là component cho phép người dùng chọn **Light/Dark** VÀ **màu theme** trong cùng một UI.

### 3.1 UI Spec

```
┌─────────────────────────────────┐
│  🌙 Giao diện tối               │  ← Toggle switch
│                                 │
│  Màu chủ đạo:                   │
│  ● 🔵 Xanh (Zalo)  ○ 🌸 Hồng   │
│  ○ 🟢 Xanh lá      ○ 🟠 Cam    │
│  ○ 🟣 Tím                       │
└─────────────────────────────────┘
```

**Vị trí**: Đặt trong Sidebar dưới cùng (cạnh avatar user) hoặc trong Settings panel.

### 3.2 ThemeToggle Component (React + TypeScript)

```tsx
// components/chat/ThemeToggle.tsx
'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

const COLOR_THEMES = [
  { id: 'blue',   label: 'Zalo Blue',  hex: '#0068FF' },
  { id: 'rose',   label: 'Rose Pink',  hex: '#F43F5E' },
  { id: 'green',  label: 'Emerald',    hex: '#10B981' },
  { id: 'orange', label: 'Sunset',     hex: '#F97316' },
  { id: 'purple', label: 'Purple',     hex: '#8B5CF6' },
] as const

type ColorTheme = typeof COLOR_THEMES[number]['id']
type Mode = 'light' | 'dark'

export function ThemeToggle() {
  const [mode, setMode] = useState<Mode>('light')
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue')

  // Load từ localStorage
  useEffect(() => {
    const savedMode  = (localStorage.getItem('chat-mode') as Mode) || 'light'
    const savedTheme = (localStorage.getItem('chat-theme') as ColorTheme) || 'blue'
    applyTheme(savedMode, savedTheme)
    setMode(savedMode)
    setColorTheme(savedTheme)
  }, [])

  function applyTheme(newMode: Mode, newColor: ColorTheme) {
    const root = document.documentElement
    root.setAttribute('data-mode', newMode)
    root.setAttribute('data-theme', newColor)
    localStorage.setItem('chat-mode', newMode)
    localStorage.setItem('chat-theme', newColor)
  }

  function toggleMode() {
    const newMode = mode === 'light' ? 'dark' : 'light'
    setMode(newMode)
    applyTheme(newMode, colorTheme)
  }

  function selectColor(id: ColorTheme) {
    setColorTheme(id)
    applyTheme(mode, id)
  }

  return (
    <div className="theme-toggle-panel">
      {/* Dark/Light Toggle */}
      <button onClick={toggleMode} className="mode-toggle-btn" aria-label="Toggle dark mode">
        {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        <span>{mode === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}</span>
      </button>

      {/* Color Theme Picker */}
      <p className="theme-label">Màu chủ đạo</p>
      <div className="color-picker">
        {COLOR_THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => selectColor(t.id)}
            title={t.label}
            className={`color-dot ${colorTheme === t.id ? 'active' : ''}`}
            style={{ backgroundColor: t.hex }}
            aria-label={t.label}
          >
            {colorTheme === t.id && <span className="check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
```

### 3.3 CSS cho ThemeToggle

```css
.theme-toggle-panel {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--bg-list);
  border-radius: 12px;
  border: 1px solid var(--border);
  min-width: 200px;
}

.mode-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  background: var(--bg-input);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 150ms ease;
  width: 100%;
}
.mode-toggle-btn:hover { background: var(--border); }

.theme-label {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.color-picker {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  border: 3px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 150ms ease, border-color 150ms ease;
  position: relative;
}
.color-dot:hover { transform: scale(1.15); }
.color-dot.active {
  border-color: var(--text-primary);
  transform: scale(1.1);
}
.color-dot .check {
  color: white;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
}
```

### 3.4 Vị Trí Đặt ThemeToggle

Có 2 cách phổ biến:

**Option A** — Trong Sidebar (icon ở dưới cùng):
```tsx
// Sidebar.tsx — Icon Settings ở cuối, click mở Popover chứa ThemeToggle
<Popover>
  <PopoverTrigger asChild>
    <button className="sidebar-item"><Settings size={20} /></button>
  </PopoverTrigger>
  <PopoverContent side="right" className="p-0 w-56">
    <ThemeToggle />
  </PopoverContent>
</Popover>
```

**Option B** — Từ Header chat window, button nhỏ góc phải:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <button className="icon-btn"><Palette size={18} /></button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <ThemeToggle />
  </DropdownMenuContent>
</DropdownMenu>
```

---

## 💬 4. Message Area Details

### Message Grouping
- Tin nhắn liên tiếp cùng người (< 2 phút) → ẩn avatar, thu nhỏ radius về `4px`.

### Bubble Styles
```css
/* Sender (phải) */
.bubble-sent {
  background: var(--bubble-sent-bg);
  color: var(--bubble-sent-text);
  border-radius: 12px 12px 0 12px;
  align-self: flex-end;
}

/* Receiver (trái) */
.bubble-received {
  background: var(--bubble-received-bg);
  color: var(--bubble-received-text);
  border-radius: 12px 12px 12px 0;
  align-self: flex-start;
}
```

### Date Divider
```html
<div class="date-divider">Hôm nay</div>
```
```css
.date-divider {
  text-align: center;
  font-size: 12px;
  color: var(--text-muted);
  background: var(--bg-input);
  border-radius: 999px;
  padding: 2px 10px;
  width: fit-content;
  margin: 8px auto;
}
```

---

## ⚡ 5. UX Behavior

1. **Auto-Scroll**: Cuộn xuống cuối khi có tin nhắn mới.
2. **Instant Click**: Click chat item → load ngay (dùng skeleton loader).
3. **Hover Transitions**: Tất cả items dùng `transition: background 150ms ease`.
4. **Theme Persist**: Lưu mode + colorTheme vào `localStorage`, khôi phục khi reload.
5. **No Flash**: Đặt script đọc theme trong `<head>` trước khi render để tránh flash màu sai:

```html
<!-- layout.tsx → trong <head> -->
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var mode = localStorage.getItem('chat-mode') || 'light';
    var theme = localStorage.getItem('chat-theme') || 'blue';
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-theme', theme);
  })();
`}} />
```

---

## 🧩 6. Component Mapping (shadcn/ui)

| Zalo UI | Shadcn Component |
|---|---|
| Nút gửi/icons | `button` |
| Thanh tìm kiếm | `input` (rounded-full) |
| Ảnh đại diện | `avatar` |
| Vùng tin nhắn | `scroll-area` |
| Tooltip sidebar | `tooltip` |
| Menu hội thoại | `dropdown-menu` |
| Tab Ưu tiên/Khác | `tabs` |
| **ThemeToggle** | `popover` + `dropdown-menu` |

---

## 🧠 7. Quy Trình Build Ưu Tiên

1. **Phase 1**: Setup CSS variables (`globals.css`) với đầy đủ `[data-mode]` + `[data-theme]`
2. **Phase 2**: Layout 3 cột (Sidebar 64px → List → Window)
3. **Phase 3**: `ThemeToggle` component + No-flash script trong `layout.tsx`
4. **Phase 4**: Chat List (Search, Tabs, Items)
5. **Phase 5**: Chat Window (Header, Bubbles, Input toolbar)
6. **Phase 6**: Realtime UX (scroll, skeleton, online status)

---

## ➕ 8. Icon System (chuẩn Lucide)

🎯 **8.1 Nguyên tắc**
- Sử dụng **100% Lucide** → đảm bảo consistency (không mix Heroicons / Ant)
- **Style**: outline icon (stroke) — giống Zalo
- Icon là 1 phần của design system, không phải phụ kiện

⚙️ **8.2 Setup**
```bash
npm install lucide-react
```
```tsx
import {
  MessageCircle,
  Users,
  Cloud,
  Settings,
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Send,
  Image,
  Smile,
  Paperclip
} from 'lucide-react'
```

📏 **8.3 Size & Style Rules**
| Context | Size | Stroke | Color |
|---|---|---|---|
| Sidebar | `20px` | `2` | trắng / muted |
| Header actions | `18px` | `2` | `var(--text-primary)` |
| Input toolbar | `20px` | `1.8` | `var(--text-muted)` |
| Message meta | `14px` | `2` | `var(--text-muted)` |

Example: `<Icon size={20} strokeWidth={2} />`

🧱 **8.4 Mapping icon theo UI**

**Sidebar (64px)**
```tsx
const SIDEBAR_ITEMS = [
  { icon: MessageCircle, label: 'Chat' },
  { icon: Users, label: 'Danh bạ' },
  { icon: Cloud, label: 'Cloud' },
  { icon: Settings, label: 'Cài đặt' },
]
```

**Chat Header**
```tsx
<div className="chat-header-actions">
  <button className="icon-btn"><Phone size={18} /></button>
  <button className="icon-btn"><Video size={18} /></button>
  <button className="icon-btn"><Search size={18} /></button>
  <button className="icon-btn"><MoreHorizontal size={18} /></button>
</div>
```

**Search Bar**
```tsx
<div className="search-bar">
  <Search size={16} className="icon" />
  <input placeholder="Tìm kiếm" />
</div>
```

**Input Toolbar**
```tsx
<div className="chat-input-toolbar">
  <button className="icon-btn"><Smile size={20} /></button>
  <button className="icon-btn"><Image size={20} /></button>
  <button className="icon-btn"><Paperclip size={20} /></button>
</div>

<button className="send-btn">
  <Send size={20} />
</button>
```

🎨 **8.5 Icon Styling System**
```css
.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 150ms ease, transform 120ms ease;
}

.icon-btn:hover { background: var(--bg-input); }
.icon-btn:active { transform: scale(0.92); }
.icon { color: var(--text-muted); }
.icon-primary { color: var(--primary-500); }
```

🌙 **8.6 Dark Mode Behavior**
- ❌ Không đổi icon theo theme màu (blue, green, …)
- ✅ Chỉ đổi theo light / dark (thông qua variables)
```css
.icon { color: var(--text-muted); }
```

✨ **8.7 Active State (Zalo-like)**
```css
.sidebar-item.active {
  background: var(--primary-400);
  position: relative;
}

.sidebar-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  width: 3px;
  height: 100%;
  background: white;
}
```

🧩 **8.8 Reusable Component (Senior pattern)**
```tsx
type IconButtonProps = {
  icon: React.ElementType
  size?: number
}

export function IconButton({ icon: Icon, size = 20 }: IconButtonProps) {
  return (
    <button className="icon-btn">
      <Icon size={size} strokeWidth={2} />
    </button>
  )
}
```
👉 Usage: `<IconButton icon={Phone} />`

⚠️ **8.9 Anti-pattern (tránh lỗi phổ biến)**
- ❌ Mix nhiều bộ icon → UI mất consistency
- ❌ Dùng fill icon → lệch style Zalo
- ❌ Scale bằng CSS → blur icon
- ❌ Mỗi icon 1 stroke khác nhau → nhìn “rẻ tiền”

---

## 🏗️ 9. Next.js Special Pages (Zalo style)

🎯 **9.1 Loading UI (`loading.tsx`)**
- Giao diện: brand logo trung tâm, hiệu ứng pulse / bounce.
- Spinner chuẩn: `animate-spin` với border-t mang màu `--primary-500`.
- Text: "Đang khởi động...", "Đang tải dữ liệu...".

🎯 **9.2 Not Found UI (`not-found.tsx`)**
- Minh họa: `Search` hoặc `Cloud` icon mờ (64px - 128px).
- Button: Style Rounded-full, Background `--primary-500`.
- Nội dung: Tối giản, tập trung vào hành động quay lại.

🎯 **9.3 Error UI (`error.tsx`)**
- Thành phần bắt buộc: `AlertCircle` icon (màu đỏ `#EF4444`).
- Chế độ: Phải là `'use client'`.
- Chức năng: Button "Thử lại" (`reset()`) và "Quay về trang chủ Chat".

🎯 **9.4 Global Error (`global-error.tsx`)**
- Phạm vi: Bắt lỗi Root Layout.
- Cấu trúc: Phải bao gồm cả thẻ `<html>` và `<body>`.
- Style: Ưu tiên font-sans, background sạch (trắng/đen tuyền).

🎯 **9.5 API & Route (`route.ts`)**
- Quy chuẩn JSON Response:
```json
{
  "data": {},
  "message": "success",
  "status": 200
}
```

---

## 🎬 10. Motion & Animation System (Zalo-like)

🎯 **10.1 Design Philosophy**
- **Nhanh**: 120ms – 200ms (tránh animation dài gây lag cảm giác)
- **Nhẹ**: không dùng bounce/spring mạnh
- **Không gây chú ý**: user cảm nhận chứ không nhìn thấy
- **Consistent**: toàn bộ UI dùng cùng easing & timing
- **Độc lập theme**: không thay đổi theo Light/Dark hay color theme

⚙️ **10.2 Motion Tokens (CSS Variables)**
```css
:root {
  --motion-fast: 120ms;
  --motion-base: 160ms;
  --motion-slow: 200ms;

  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

🖱️ **10.3 Micro-interactions**

**Button / Icon**
```css
.icon-btn {
  transition: 
    background var(--motion-fast) var(--ease-standard),
    transform var(--motion-fast) var(--ease-standard);
}

.icon-btn:hover {
  background: var(--bg-input);
  transform: scale(1.05);
}

.icon-btn:active {
  transform: scale(0.92);
}
```

**Chat Item (quan trọng)**
```css
.chat-item {
  transition: background var(--motion-base) var(--ease-standard);
}

.chat-item:hover {
  background: var(--bg-input);
}
```

💬 **10.4 Message Animation (Zalo-style)**
```css
@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.message {
  animation: messageIn var(--motion-base) var(--ease-out);
}
```
👉 **Rule bắt buộc**:
- ❌ Không slide trái/phải
- ❌ Không bounce
- ✅ Chỉ fade + translateY nhẹ

📜 **10.5 Chat Window Transition**
```css
.chat-window {
  animation: fadeIn var(--motion-base) var(--ease-standard);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

🧠 **10.6 Skeleton Loading**
```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    var(--bg-input) 25%,
    var(--border) 37%,
    var(--bg-input) 63%
  );
  background-size: 400% 100%;
  animation: shimmer 1.4s infinite;
}
```

✍️ **10.7 Typing Indicator**
```css
.typing-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-muted);
  animation: typing 1.2s infinite;
}

.typing-dot:nth-child(2) { animation-delay: 0.2s; }
.typing-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}
```

⚡ **10.8 Advanced Motion (React)**
Sử dụng **Framer Motion**: `npm install framer-motion`

**Message animation**
```tsx
import { motion } from 'framer-motion'

<motion.div
  initial={{ opacity: 0, y: 8, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.16 }}
>
  {message}
</motion.div>
```

**Chat item hover**
```tsx
<motion.div
  whileHover={{ backgroundColor: 'var(--bg-input)' }}
  transition={{ duration: 0.12 }}
>
  Chat Item
</motion.div>
```

🌙 **10.9 Dark Mode Rule**
- ❌ Không thay đổi animation theo theme
- ✅ Motion giữ nguyên — chỉ đổi màu

⚠️ **10.10 Anti-pattern**
- ❌ Animation > 300ms → cảm giác lag
- ❌ Dùng spring/bounce mạnh → sai vibe Zalo
- ❌ Slide trái/phải → giống Messenger
- ❌ Nhiều animation cùng lúc → rối UI

🔗 **10.11 Kết hợp Validation (tránh lỗi đỏ)**
Nếu bạn dùng `mitom` trong input/chat:
👉 **Kết hợp UX**: `validate` khi send message, không validate realtime khi user đang gõ (tránh giật UI animation).

---

## 📱 11. Responsive System (Desktop → Tablet → Mobile)

🎯 **11.1 Design Philosophy**
- **Desktop-first** (giống Zalo Web/PC).
- **Progressive collapse**: Ẩn dần layout thay vì redesign hoàn toàn.
- **Giữ logic phân cấp**: 
  - Desktop: 3 cột hiện rõ.
  - Tablet: Ẩn/Hiện overlay các cột phụ.
  - Mobile: Chỉ 1 màn hình tại 1 thời điểm.

📐 **11.2 Breakpoints**
```css
:root {
  --bp-desktop: 1280px;
  --bp-tablet: 1024px;
  --bp-mobile: 768px;
}
```

🧱 **11.3 Layout Behavior**

🖥️ **Desktop (≥ 1280px)**
- `| Sidebar 64px | Chat List 300px | Chat Window |`
- Hiển thị đầy đủ 3 cột.
- Sidebar và Chat List luôn cố định.

💻 **Tablet (768px → 1279px)**
- `| Sidebar 64px | Chat List | (Chat Window overlay)`
- **Behavior**: Chat window sẽ overlay lên trên danh sách khi được mở.
- Cần có nút **Back** để đóng cửa sổ chat và quay lại danh sách.

📱 **Mobile (< 768px)**
- `[ Chat List ]` → click → `[ Chat Window ]`
- **Behavior**: 1 màn hình 1 chức năng.
- Navigation dạng **push/pop** (giống ứng dụng native).
- Sidebar hoàn toàn bị ẩn.

⚙️ **11.4 CSS Layout Responsive**
```css
.app-layout {
  display: flex;
  height: 100vh;
  height: 100dvh; /* Fix mobile browser UI */
}

/* Desktop */
.sidebar { width: 64px; }
.chat-list { width: 300px; }
.chat-window { flex: 1; }

/* Tablet */
@media (max-width: 1279px) {
  .chat-list { width: 260px; }
  .chat-window {
    position: absolute;
    inset: 0;
    background: var(--bg-chat);
    z-index: 10;
    transform: translateX(100%);
    transition: transform var(--motion-base) var(--ease-standard);
  }
  .chat-window.open { transform: translateX(0); }
}

/* Mobile */
@media (max-width: 768px) {
  .sidebar { display: none; }
  .chat-list { width: 100%; }
  .chat-window {
    position: absolute;
    inset: 0;
    transform: translateX(100%);
  }
  .chat-window.open { transform: translateX(0); }
}
```

🔙 **11.5 Mobile Navigation**
Nút Back trong Chat Header (chỉ hiện trên Mobile/Tablet):
```tsx
import { ArrowLeft } from 'lucide-react'

// UI Logic
{isMobile && (
  <button className="icon-btn mr-2" onClick={onBack}>
    <ArrowLeft size={20} />
  </button>
)}
```

💬 **11.6 Message UI Mobile Optimization**
```css
.message { max-width: 75%; }

@media (max-width: 768px) {
  .message {
    max-width: 85%;
    font-size: 14px;
  }
}
```

⌨️ **11.7 Input Area Mobile**
```css
.chat-input { padding: 10px; }

@media (max-width: 768px) {
  .chat-input {
    padding: 8px;
  }
  .chat-input input {
    font-size: 16px; /* Tránh auto-zoom trên iOS */
  }
}
```

🧠 **11.8 UX Rules**
- ❌ Không hiển thị 2 panel cùng lúc trên mobile.
- ❌ Không giữ sidebar trên mobile (chiếm diện tích).
- ✅ Navigation rõ ràng: **List → Chat → Back**.
- ✅ Animation slide nhẹ (đã định nghĩa trong Motion System).

⚡ **11.9 Motion cho Mobile Navigation**
- **Slide từ phải → trái** khi mở chat (chỉ trên mobile).
- Desktop: Ưu tiên hiển thị tức thì, không slide.

🔥 **11.10 Anti-pattern**
- ❌ Co nhỏ UI desktop theo tỷ lệ (gây khó đọc).
- ❌ Thiếu nút Back điều hướng.
- ❌ Bàn phím che mất ô nhập văn bản (Input bị keyboard che).

🚀 **11.11 Pro Tips**
- Dùng `100dvh` thay vì `100vh`.
- **Scroll độc lập**: Chat List và Message Area phải có vùng scroll riêng biệt.
- **Auto focus**: Tự động focus vào ô nhập khi mở chat trên mobile (nếu cần).

🔗 **11.12 Kết hợp System**
Responsive phải đi đôi với:
- **Motion**: Slide mượt mà trên mobile.
- **Icon**: Nút Back Lucide đồng nhất.
- **Theme**: Giữ nguyên mầu sắc thương hiệu khi thay đổi bố cục.

---

**Rule**: Light/Dark chỉ thay đổi nền và text. Multi-theme (color) chỉ thay đổi `--primary-*`. Hai trục độc lập với nhau. Đây là cách duy nhất để scale theme system đúng cách.
