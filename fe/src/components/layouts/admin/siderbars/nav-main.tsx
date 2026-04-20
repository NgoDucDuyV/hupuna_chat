"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ReactNode
  }[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground/70 px-2">
        Quản trị
      </SidebarGroupLabel>
      <SidebarMenu className="gap-0.5">
        {items.map((item) => {
          const isActive = pathname === item.url || (item.url !== "/admin" && pathname.startsWith(item.url))
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={isActive}
                className="h-9 gap-2.5 text-sm font-medium rounded-lg"
              >
                <Link href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
