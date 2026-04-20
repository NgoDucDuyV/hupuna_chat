"use client"

import * as React from "react"
import {
  LayoutDashboardIcon,
  UsersIcon,
  ShieldCheckIcon,
  BuildingIcon,
  AlertTriangleIcon,
  BellIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  MessageSquareIcon,
  ActivityIcon,
  CommandIcon,
} from "lucide-react"

import { NavDocuments } from "@/components/layouts/admin/siderbars/nav-documents"
import { NavMain } from "@/components/layouts/admin/siderbars/nav-main"
import { NavSecondary } from "@/components/layouts/admin/siderbars/nav-secondary"
import { NavUser } from "@/components/layouts/admin/siderbars/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin Hupuna",
    email: "admin@hupuna.chat",
    avatar: "",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Quản lý Tài khoản",
      url: "/admin/users",
      icon: <UsersIcon />,
    },
    {
      title: "Phân quyền & Chức vụ",
      url: "/admin/roles",
      icon: <ShieldCheckIcon />,
    },
    {
      title: "Phòng ban",
      url: "/admin/departments",
      icon: <BuildingIcon />,
    },
    {
      title: "Giám sát Nội dung",
      url: "/admin/moderation",
      icon: <AlertTriangleIcon />,
    },
    {
      title: "Thống kê Realtime",
      url: "/admin/analytics",
      icon: <ActivityIcon />,
    },
    {
      title: "Thông báo Hệ thống",
      url: "/admin/broadcast",
      icon: <BellIcon />,
    },
  ],
  navDocuments: [
    {
      name: "Lịch sử Chat",
      url: "/admin/chat-logs",
      icon: <MessageSquareIcon />,
    },
    {
      name: "Audit Logs",
      url: "/admin/audit",
      icon: <FileTextIcon />,
    },
  ],
  navSecondary: [
    {
      title: "Cài đặt Hệ thống",
      url: "/admin/settings",
      icon: <Settings2Icon />,
    },
    {
      title: "Hỗ trợ",
      url: "/admin/help",
      icon: <CircleHelpIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/admin">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">Hupuna Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.navDocuments} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
