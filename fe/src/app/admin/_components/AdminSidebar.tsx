'use client'

import { useState } from 'react'
import {
  Users,
  ShieldCheck,
  Building,
  AlertTriangle,
  Settings,
  Bell,
  LogOut,
  LineChart
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ThemeToggle } from '@/components/common/ThemeToggle'

const SIDEBAR_ITEMS = [
  { id: 'dashboard', icon: LineChart, label: 'Thống kê (Analytics)' },
  { id: 'users', icon: Users, label: 'Quản lý Tài Khoản' },
  { id: 'roles', icon: ShieldCheck, label: 'Phân quyền & Chức vụ' },
  { id: 'departments', icon: Building, label: 'Phòng ban' },
  { id: 'moderation', icon: AlertTriangle, label: 'Giám sát nội dung' },
  { id: 'broadcast', icon: Bell, label: 'Thông báo diện rộng' },
]

export function AdminSidebar() {
  const [activeTab, setActiveTab] = useState('users')

  return (
    <aside className="w-[64px] h-full flex flex-col justify-between items-center py-4 bg-[var(--bg-sidebar)] shrink-0 z-10 transition-colors duration-150">
      <div className="flex flex-col items-center gap-6 w-full">
        {/* Admin Avatar/Logo */}
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-[var(--primary-text,-_#fff)] mb-4 cursor-pointer">
          AD
        </div>

        {/* Top Navigation */}
        <div className="flex flex-col items-center gap-3 w-full">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex justify-center py-3 relative group transition-colors duration-150 ${
                  isActive ? 'bg-[var(--primary-400)] text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
                title={item.label}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-white rounded-r-sm" />
                )}
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                
                {/* Tooltip emulation since tooltip component might be complex */}
                <div className="absolute left-[70px] px-3 py-1.5 bg-gray-800 text-white text-xs rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-4 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <button className="w-12 h-12 flex justify-center items-center text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all">
              <Settings size={24} strokeWidth={2} />
            </button>
          </PopoverTrigger>
          <PopoverContent side="right" align="end" className="p-0 border-none bg-transparent shadow-none ml-2">
            <ThemeToggle />
          </PopoverContent>
        </Popover>

        <button className="w-12 h-12 flex justify-center items-center text-red-300 hover:text-red-100 hover:bg-white/10 rounded-xl transition-all" title="Đăng xuất">
          <LogOut size={24} strokeWidth={2} />
        </button>
      </div>
    </aside>
  )
}
