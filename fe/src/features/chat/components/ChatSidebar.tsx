'use client'

import {
  MessageCircle,
  UsersRound,
  Cloud,
  CheckSquare,
  Bell,
  Settings,
  CircleUser,
  Database,
  Globe,
  HelpCircle,
  LogOut,
  ChevronRight,
  Check,
  ExternalLink,
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '@/lib/utils'
import { useState } from 'react'

/* ─── Nav Items ───────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: 'chat',     icon: MessageCircle, label: 'Tin nhắn',    badge: 2 },
  { id: 'contacts', icon: UsersRound,    label: 'Danh bạ' },
  { id: 'cloud',    icon: Cloud,         label: 'Cloud của tôi' },
  { id: 'todo',     icon: CheckSquare,   label: 'To-do' },
] as const

type NavId = (typeof NAV_ITEMS)[number]['id']

interface Props {
  active?: NavId
  onNavigate?: (id: NavId) => void
}

/* ─── Sidebar Button ──────────────────────────────────────── */
function SidebarBtn({
  id,
  label,
  isActive,
  badge,
  onClick,
  children,
}: {
  id: string
  label: string
  isActive?: boolean
  badge?: number
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          id={id}
          onClick={onClick}
          aria-label={label}
          className={cn(
            'relative flex items-center justify-center w-full h-[52px]',
            'transition-colors duration-150',
            'hover:bg-white/10',
            isActive && 'bg-white/15'
          )}
        >
          {/* Active vạch trái */}
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-white rounded-r-full" />
          )}
          {/* Badge */}
          {badge && badge > 0 ? (
            <span className="absolute top-2 right-2.5 min-w-[16px] h-4 bg-red-500 rounded-full text-[9px] text-white font-bold flex items-center justify-center px-0.5 select-none">
              {badge > 9 ? '9+' : badge}
            </span>
          ) : null}
          {/* Icon */}
          <span className={cn('text-white/75', isActive && 'text-white')}>
            {children}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={6} className="text-xs font-medium">
        {label}
      </TooltipContent>
    </Tooltip>
  )
}

/* ─── ChatSidebar ─────────────────────────────────────────── */
export function ChatSidebar({ active = 'chat', onNavigate }: Props) {
  const [lang, setLang] = useState<'vi' | 'en'>('vi')

  return (
    <TooltipProvider delayDuration={200}>
      <aside
        className="flex flex-col items-center w-16 h-full shrink-0 relative z-20"
        style={{ backgroundColor: 'var(--theme-primary, #0068FF)' }}
      >
        {/* ── Avatar user ── */}
        <div className="flex items-center justify-center w-full pt-3 pb-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer group">
                <Avatar className="w-10 h-10 border border-white/20 transition-transform group-hover:scale-105">
                  <AvatarImage src="https://i.pravatar.cc/100?img=12" alt="Tôi" />
                  <AvatarFallback className="bg-white/20 text-white text-sm font-bold">N</AvatarFallback>
                </Avatar>
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#0068FF]" />
              </div>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent side="right" align="start" sideOffset={12} className="w-64 p-1.5 ml-1 shadow-2xl rounded-xl border-slate-100 border-1 border-[#dadada]">
              <div className="px-3 py-2.5">
                <p className="text-[17px] font-bold text-slate-800">Ngô Đức Duy</p>
              </div>
              <DropdownMenuSeparator className="mx-2 bg-slate-100" />
              
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50 flex items-center justify-between">
                <span className="text-[14px] font-medium text-slate-700">Nâng cấp tài khoản</span>
                <ExternalLink size={16} className="text-slate-400" />
              </DropdownMenuItem>
              
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                <span className="text-[14px] font-medium text-slate-700">Hồ sơ của bạn</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                <span className="text-[14px] font-medium text-slate-700">Cài đặt</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="mx-2 my-1.5 bg-slate-100" />
              
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-red-50 group">
                <span className="text-[14px] font-semibold text-red-500">Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* ── Main Nav ─────────────────────────────────────── */}
        <nav className="flex flex-col items-center w-full flex-1 gap-0.5">
          {NAV_ITEMS.map((item) => {
            const { id, icon: Icon, label } = item
            const badge = 'badge' in item ? (item.badge as number) : undefined

            return (
              <SidebarBtn
                key={id}
                id={`sidebar-${id}`}
                label={label}
                isActive={active === id}
                badge={badge}
                onClick={() => onNavigate?.(id as NavId)}
              >
                <Icon size={22} strokeWidth={1.75} />
              </SidebarBtn>
            )
          })}
        </nav>

        {/* ── Bottom ───────────────────────────────────────── */}
        <div className="flex flex-col items-center w-full gap-0.5 pb-2">
          {/* Thông báo */}
          <SidebarBtn id="sidebar-bell" label="Thông báo">
            <Bell size={22} strokeWidth={1.75} />
          </SidebarBtn>

          {/* Cài đặt (DropdownMenu chuẩn Zalo) */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <button
                    id="sidebar-settings"
                    aria-label="Cài đặt"
                    className={cn(
                      'relative flex items-center justify-center w-full h-[52px]',
                      'transition-colors duration-150 hover:bg-white/10',
                      'outline-none'
                    )}
                  >
                    <Settings
                      size={22}
                      strokeWidth={1.75}
                      className="text-white/75 group-hover:text-white"
                    />
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={6} className="text-xs font-medium">
                Cài đặt
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent side="right" align="end" sideOffset={8} className="w-64 p-1.5 shadow-2xl rounded-xl border-slate-100">
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                <CircleUser size={18} strokeWidth={1.5} className="mr-2 text-slate-600" />
                <span className="text-[14px] font-medium text-slate-700">Thông tin tài khoản</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                <Settings size={18} strokeWidth={1.5} className="mr-2 text-slate-600" />
                <span className="text-[14px] font-medium text-slate-700">Cài đặt</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                  <Database size={18} strokeWidth={1.5} className="mr-2 text-slate-600" />
                  <span className="text-[14px] font-medium text-slate-700">Dữ liệu</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-48 p-1 shadow-xl rounded-lg border-slate-50 ml-1">
                    <DropdownMenuItem className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 text-[13.5px] text-slate-600">Quản lý file</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 text-[13.5px] text-slate-600">Dọn dẹp bộ nhớ</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                  <Globe size={18} strokeWidth={1.5} className="mr-2 text-slate-600" />
                  <span className="text-[14px] font-medium text-slate-700">Ngôn ngữ</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-44 p-1 shadow-xl rounded-lg border-slate-50 ml-1">
                    <DropdownMenuItem 
                      onClick={() => setLang('vi')}
                      className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇻🇳</span>
                        <span className="text-[13.5px] text-slate-700">Tiếng Việt</span>
                      </div>
                      {lang === 'vi' && <Check size={16} className="text-[#0068FF]" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => setLang('en')}
                      className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🇺🇸</span>
                        <span className="text-[13.5px] text-slate-700">English</span>
                      </div>
                      {lang === 'en' && <Check size={16} className="text-[#0068FF]" />}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                  <HelpCircle size={18} strokeWidth={1.5} className="mr-2 text-slate-600" />
                  <span className="text-[14px] font-medium text-slate-700">Hỗ trợ</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-52 p-1 shadow-xl rounded-lg border-slate-50 ml-1">
                    <DropdownMenuItem className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 text-[13.5px] text-slate-700 font-medium">Thông tin phiên bản</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 text-[13.5px] text-slate-700 font-medium">Liên hệ</DropdownMenuItem>
                    <DropdownMenuItem className="py-2 px-3 cursor-pointer rounded-md focus:bg-slate-50 text-[13.5px] text-slate-700 font-medium">Gửi file log tới Hupuna</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator className="my-1.5 bg-slate-100" />

              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-red-50 group">
                <LogOut size={18} strokeWidth={1.5} className="mr-2 text-red-500" />
                <span className="text-[14px] font-semibold text-red-500">Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>
    </TooltipProvider>
  )
}
