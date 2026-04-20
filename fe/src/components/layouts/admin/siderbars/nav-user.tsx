"use client"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { EllipsisVerticalIcon, CircleUserRoundIcon, ShieldIcon, LogOutIcon, MoonIcon } from "lucide-react"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  const initials = user.name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground rounded-xl"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-xs">{user.name}</span>
                <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
              </div>
              <EllipsisVerticalIcon className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl p-2"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal mb-1">
              <div className="flex items-center gap-2.5 px-2 py-1.5 text-left">
                <Avatar className="h-9 w-9 rounded-xl">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="font-semibold text-sm truncate">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-0" />
            <DropdownMenuGroup className="mt-1">
              <DropdownMenuItem className="gap-2 rounded-lg h-9">
                <CircleUserRoundIcon className="h-4 w-4 text-muted-foreground" />
                Hồ sơ cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 rounded-lg h-9">
                <ShieldIcon className="h-4 w-4 text-muted-foreground" />
                Bảo mật tài khoản
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 rounded-lg h-9">
                <MoonIcon className="h-4 w-4 text-muted-foreground" />
                Giao diện tối / sáng
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-0 mt-1" />
            <DropdownMenuItem className="gap-2 rounded-lg h-9 text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400 mt-1">
              <LogOutIcon className="h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
