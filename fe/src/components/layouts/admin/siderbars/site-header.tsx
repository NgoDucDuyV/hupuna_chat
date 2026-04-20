"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"

const PAGE_META: Record<string, { title: string; description?: string }> = {
  "/admin":             { title: "Tổng quan",            description: "Dashboard hệ thống" },
  "/admin/users":       { title: "Quản lý Tài khoản",    description: "Kiểm duyệt nhân sự" },
  "/admin/roles":       { title: "Phân quyền & Chức vụ", description: "Quản lý RBAC" },
  "/admin/departments": { title: "Phòng ban",             description: "Cơ cấu tổ chức" },
  "/admin/moderation":  { title: "Giám sát Nội dung",    description: "Audit & safety" },
  "/admin/analytics":   { title: "Thống kê Realtime",    description: "Lưu lượng hệ thống" },
  "/admin/broadcast":   { title: "Thông báo Hệ thống",   description: "Global announcement" },
  "/admin/chat-logs":   { title: "Lịch sử Chat",         description: "Chat logs" },
  "/admin/audit":       { title: "Audit Logs",            description: "System audit trail" },
  "/admin/settings":    { title: "Cài đặt Hệ thống",     description: "App configuration" },
}

export function SiteHeader() {
  const pathname = usePathname()
  const meta = PAGE_META[pathname] ?? { title: "Admin", description: "Hupuna Admin" }

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6 transition-all">
      {/* Sidebar trigger */}
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />

      <Separator orientation="vertical" className="h-4 mx-1 data-[orientation=vertical]:h-4" />

      {/* Page title */}
      <div className="flex items-center gap-2.5 flex-1">
        <h1 className="text-sm font-semibold text-foreground leading-none">{meta.title}</h1>
        {meta.description && (
          <span className="hidden sm:inline text-xs text-muted-foreground leading-none">
            — {meta.description}
          </span>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground relative">
          <Bell className="h-4 w-4" />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-background" />
        </Button>
        <Separator orientation="vertical" className="h-4 mx-1" />
        <div className="flex items-center gap-2 pl-1">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-[11px] font-bold text-white">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium leading-none">Admin</p>
            <p className="text-[10px] text-muted-foreground leading-none mt-0.5">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  )
}
