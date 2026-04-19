'use client'

import { useState } from 'react'
import { 
  Search, 
  UserPlus, 
  Users, 
  ChevronDown, 
  MoreHorizontal, 
  Pin,
  BellOff,
  PhoneIncoming,
  Cloud,
  UserRoundSearch
} from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from '@/components/ui/context-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  X, 
  ChevronLeft, 
  Pencil, 
  Trash2, 
  GripVertical, 
  Plus, 
  Check as CheckIcon 
} from 'lucide-react'

interface Props {
  activeChatId?: string | null
  onSelectChat?: (id: string) => void
}

/* ─── Mock Data ────────────────────────────────────────────── */
const MOCK_CHATS = [
  {
    id: 'c2',
    name: 'FW2_SP26 - WEB2091 - W...',
    avatars: ['https://i.pravatar.cc/100?img=15', 'https://i.pravatar.cc/100?img=16', 'https://i.pravatar.cc/100?img=17', 'https://i.pravatar.cc/100?img=18'],
    lastMsg: 'Ngọc Ngô: Bạn nào đăng kí cái...',
    time: '17 giờ',
    unread: 0,
    pinned: true,
    muted: true,
    memberCount: 22,
    isGroup: true,
    tab: 'priority' as const,
  },
  {
    id: 'c3',
    name: 'FW1_SP26 - WEB2081 - W...',
    avatars: ['https://i.pravatar.cc/100?img=21', 'https://i.pravatar.cc/100?img=22', 'https://i.pravatar.cc/100?img=23', 'https://i.pravatar.cc/100?img=24'],
    lastMsg: 'Ngọc Ngô: Bạn nào đăng kí cái...',
    time: '17 giờ',
    unread: 0,
    pinned: true,
    muted: true,
    memberCount: 35,
    isGroup: true,
    tab: 'priority' as const,
  },
  {
    id: 'c4',
    name: 'T2_Ca5_SYB3013_WD20307',
    avatars: ['https://i.pravatar.cc/100?img=31', 'https://i.pravatar.cc/100?img=32', 'https://i.pravatar.cc/100?img=33', 'https://i.pravatar.cc/100?img=34'],
    lastMsg: 'Chưa có tin nhắn',
    time: '',
    unread: 35,
    pinned: true,
    muted: true,
    memberCount: 35,
    isGroup: true,
    tab: 'priority' as const,
  },
  {
    id: 'c7',
    name: 'Em',
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80',
    lastMsg: 'Bạn: ádas',
    time: '4 phút',
    unread: 0,
    tab: 'priority' as const,
  },
  {
    id: 'c_cloud',
    name: 'My Documents',
    avatar: 'https://images.unsplash.com/photo-1544391682-171738676.jpg?w=100&q=80',
    lastMsg: 'Bạn: e e e',
    time: '19 phút',
    isCloud: true,
    tab: 'priority' as const,
  },
  {
    id: 'c8',
    name: 'Dev Intern',
    avatars: ['https://i.pravatar.cc/100?img=41', 'https://i.pravatar.cc/100?img=42', 'https://i.pravatar.cc/100?img=43', 'https://i.pravatar.cc/100?img=44'],
    lastMsg: 'Đoàn Minh Quân: Nhóm mới',
    time: '1 giờ',
    isGroup: true,
    tab: 'priority' as const,
  },
  {
    id: 'c5',
    name: 'Nhà thuốc FPT Long Châu',
    avatar: 'https://i.pravatar.cc/100?img=8',
    lastMsg: 'CHUYỆN LẠ CÓ THẬT: MUA CÀNG...',
    time: '3 giờ',
    isOfficial: true,
    tab: 'priority' as const,
  },
]

const INITIAL_TAGS = [
  { name: 'Khách hàng', color: '#E11D48' },
  { name: 'Gia đình', color: '#D946EF' },
  { name: 'Công việc', color: '#F97316' },
  { name: 'Bạn bè', color: '#FACC15' },
  { name: 'Trả lời sau', color: '#22C55E' },
  { name: 'Đồng nghiệp', color: '#0068FF' },
]

const COLORS = [
  '#E11D48', '#D946EF', '#F97316', '#FACC15', 
  '#22C55E', '#06B6D4', '#0068FF', '#8B5CF6'
]


function TagIcon({ color }: { color: string }) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.5 2.5H4C3.17157 2.5 2.5 3.17157 2.5 4V14C2.5 14.8284 3.17157 15.5 4 15.5H16.5L19 9L16.5 2.5Z" fill={color} />
    </svg>
  )
}

function TagItem({ color, label }: { color: string, label: string }) {
  return (
    <ContextMenuItem className="flex items-center gap-3 py-2.5 px-3 text-[14.5px] cursor-pointer">
      <TagIcon color={color} />
      <span>{label}</span>
    </ContextMenuItem>
  )
}

function FilterOption({ label, checked = false, type = 'checkbox', isTag, color, isStranger, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-2 py-2.5 rounded-md hover:bg-slate-50 transition-colors cursor-pointer group",
        checked && type === 'radio' && "bg-[#E5EFFF] hover:bg-[#E5EFFF]"
      )}
    >
      <div className={cn(
        "w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all",
        checked 
          ? "border-[#0068FF] bg-[#0068FF]" 
          : "border-slate-300 group-hover:border-slate-400"
      )}>
        {checked && (
          <div className={cn(
            "rounded-full",
            type === 'radio' ? "w-2.5 h-2.5 bg-white shadow-sm" : "w-1.5 h-1.5 bg-white rounded-none rotate-45"
          )} />
        )}
      </div>
      <div className="flex items-center gap-2.5 flex-1">
        {isTag && <TagIcon color={color} />}
        {isStranger && <UserRoundSearch size={18} className="text-slate-700" />}
        <span className={cn(
          "text-[15px] font-medium leading-none mt-[1px]",
          checked && type === 'radio' ? "text-[#0068FF]" : "text-slate-800"
        )}>
          {label}
        </span>
      </div>
    </div>
  )
}

function GroupAvatar({ urls, memberCount }: { urls: string[], memberCount?: number }) {
  const size = "w-[28px] h-[28px]"
  return (
    <div className="relative w-[52px] h-[52px] shrink-0">
      <div className={cn("absolute top-0 left-0 rounded-full overflow-hidden border-[1.5px] border-white shadow-sm bg-slate-100 z-[4]", size)}>
         <img src={urls[0]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className={cn("absolute top-0 right-0 rounded-full overflow-hidden border-[1.5px] border-white shadow-sm bg-slate-100 z-[2]", size)}>
         <img src={urls[1]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className={cn("absolute bottom-0 left-0 rounded-full overflow-hidden border-[1.5px] border-white shadow-sm bg-slate-100 z-[3]", size)}>
         <img src={urls[2]} alt="" className="w-full h-full object-cover" />
      </div>
      <div className={cn("absolute bottom-0 right-0 rounded-full border-[1.5px] border-white shadow-sm bg-[#E9EBEE] flex items-center justify-center z-[5]", size)}>
        <span className="text-[11px] font-bold text-[#4B5E78]">
          {memberCount || urls.length}
        </span>
      </div>
    </div>
  )
}

/* ─── Main Component ───────────────────────────────────────── */

export function ChatList({ activeChatId = 'c7', onSelectChat }: Props) {
  const [search, setSearch]             = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [searchTab, setSearchTab] = useState('Tất cả')

  const [tab, setTab]                   = useState<'priority' | 'other'>('priority')
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread'>('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  const [isAddingTag, setIsAddingTag]   = useState(false)
  const [newTagName, setNewTagName]     = useState('')
  const [selectedColor, setSelectedColor] = useState(COLORS[0])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const filtered = MOCK_CHATS.filter((c) => {
    const matchTab    = c.tab === tab
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    return matchTab && matchSearch
  })

  /* ─── Search Overlay Logic ────────────────────────────────── */
  const renderSearchOverlay = () => {
    if (!isSearchFocused) return null

    const hasQuery = search.trim().length > 0
    const isEmpty = hasQuery && search.toLowerCase().includes('adasd') // Mock empty state

    return (
      <div className="absolute inset-0 top-[60px] bg-white z-[50] flex flex-col">
        {hasQuery && (
          <div className="flex items-center px-4 border-b border-slate-100 shrink-0">
            {['Tất cả', 'Liên hệ', 'Tin nhắn', 'File'].map((t) => (
              <button
                key={t}
                onClick={() => setSearchTab(t)}
                className={cn(
                  "px-3 py-3 text-[14.5px] font-semibold relative transition-colors",
                  searchTab === t ? "text-[#0068FF]" : "text-slate-500 hover:text-slate-800"
                )}
              >
                {t}
                {searchTab === t && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0068FF]" />}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {!hasQuery ? (
            /* Focus State: Recent & Tags */
            <div className="flex flex-col h-full">
              <div className="flex-1">
                {[
                  { name: 'Em', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100&q=80' },
                  { name: 'Dev Intern', isGroup: true, img: 'https://i.pravatar.cc/100?img=41' },
                  { name: 'Ngọc Ngô', img: 'https://i.pravatar.cc/100?img=15' },
                  { name: 'Xưởng Web-FrontEnd-SP26', isGroup: true, img: 'https://i.pravatar.cc/100?img=17' },
                  { name: 'My Documents', img: 'https://images.unsplash.com/photo-1544391682-171738676.jpg?w=100&q=80' },
                  { name: 'Đoàn Minh Quân', img: 'https://i.pravatar.cc/100?img=21' },
                  { name: 'Luong Duc Quynh', img: 'https://i.pravatar.cc/100?img=22' },
                  { name: 'Nguyễn Ngọc Sơn', img: 'https://i.pravatar.cc/100?img=23' },
                ].map((item, i) => (
                  <div key={i} className={cn(
                    "flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer relative group",
                    i === 1 && "bg-slate-50" // Mock selection
                  )}>
                    <Avatar className="w-12 h-12 shadow-sm border border-black/5">
                      <AvatarImage src={item.img} className="object-cover" />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-[15.5px] font-medium text-slate-800">{item.name}</span>
                    {i === 1 && <X size={16} className="absolute right-4 text-slate-400 hover:text-slate-600" />}
                  </div>
                ))}
              </div>

              {/* Bottom Tags */}
              <div className="p-4 border-t border-slate-100">
                <p className="text-[14px] font-bold text-slate-800 mb-3">Lọc tin nhắn</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-full bg-slate-100 text-[14.5px] font-medium text-slate-700 hover:bg-slate-200">Nhắc bạn</button>
                  <button className="px-4 py-2 rounded-full bg-slate-100 text-[14.5px] font-medium text-slate-700 hover:bg-slate-200">Biểu cảm</button>
                </div>
              </div>
            </div>
          ) : isEmpty ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full px-10 text-center animate-in fade-in zoom-in duration-300">
               <div className="w-48 h-48 mb-6 text-blue-500/10">
                  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="100" cy="100" r="90" fill="currentColor" />
                    <circle cx="90" cy="85" r="40" stroke="#0068FF" strokeWidth="4" />
                    <line x1="120" y1="115" x2="160" y2="155" stroke="#0068FF" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="65" cy="55" r="3" fill="#0068FF" opacity="0.4" />
                    <circle cx="130" cy="70" r="4" fill="#0068FF" opacity="0.4" />
                    <path d="M40 120 L50 130 M50 120 L40 130" stroke="#0068FF" strokeWidth="2" opacity="0.4" />
                  </svg>
               </div>
               <p className="text-[16px] font-bold text-slate-800 mb-2">Không tìm thấy kết quả</p>
               <p className="text-[14px] text-slate-500 leading-relaxed">
                 Vui lòng thử lại từ khóa khác hoặc sử dụng ứng dụng Zalo trên điện thoại để tìm tin nhắn trước ngày 18/04/2026.
               </p>
            </div>
          ) : (
            /* Search Results State */
            <div className="flex flex-col pb-4">
              <div className="px-4 py-2 text-[14px] font-bold text-slate-800 mt-2">Liên hệ (3)</div>
              {[
                { name: 'Dev Code', desc: 'Thành viên: Phạm Tiến Nam', img: 'https://i.pravatar.cc/100?img=1' },
                { name: 'ĐI LÀM LÀ CHÍNH CHƠI LÀ P...', desc: 'Thành viên: Phạm Tiến Nam', img: 'https://i.pravatar.cc/100?img=2' },
                { name: 'Nam Do', desc: 'Chung nhóm: Nội bộ TTS 14 IMT...', img: 'https://i.pravatar.cc/100?img=3', isSelection: true },
              ].map((item, i) => (
                <div key={i} className={cn(
                  "flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer",
                  item.isSelection && "bg-slate-100"
                )}>
                  <Avatar className="w-12 h-12 shadow-sm">
                    <AvatarImage src={item.img} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-[#0068FF] truncate">{item.name}</p>
                    <p className="text-[13px] text-slate-500 flex items-center gap-1">
                      {item.desc.split('Nam').map((part, idx, arr) => (
                        <span key={idx}>
                          {part}
                          {idx < arr.length - 1 && <span className="text-[#0068FF] font-bold">Nam</span>}
                        </span>
                      ))}
                    </p>
                  </div>
                  {item.isSelection && <MoreHorizontal size={18} className="text-slate-500" />}
                </div>
              ))}
              <div className="px-4 py-2">
                <button className="w-full py-2 bg-slate-100 rounded-md text-[14px] font-bold text-slate-700 hover:bg-slate-200">Xem tất cả liên hệ</button>
              </div>

              <div className="h-[1px] bg-slate-100 my-2 mx-4" />
              
              <div className="px-4 py-2 text-[14px] font-bold text-slate-800">Tin nhắn (4)</div>
              {[
                { name: 'Dev Intern', msg: 'Luong Duc Quynh: In hoá đơn có sdt, địa chỉ @Phạm Tiến Nam', time: '21 giờ', img: 'https://i.pravatar.cc/100?img=41' },
                { name: 'Dev Intern', msg: 'Luong Duc Quynh: Fix thêm phần của nam nữa th', time: '21 giờ', img: 'https://i.pravatar.cc/100?img=41' },
                { name: 'ĐI LÀM LÀ CHÍNH CHƠI LÀ PHỤ', msg: 'Nguyễn Thị Than...: .../UyG1FBG BUMTRO - Bún Trộn Nam Bộ - Ngô Thì...', time: 'Hôm qua', img: 'https://i.pravatar.cc/100?img=2' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50">
                  <Avatar className="w-12 h-12 shadow-sm">
                    <AvatarImage src={item.img} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[13px] font-medium text-slate-500 truncate">{item.name}</p>
                      <span className="text-[12px] text-slate-400">{item.time}</span>
                    </div>
                    <p className="text-[14px] text-slate-800 leading-snug line-clamp-2">
                      {item.msg.split(/nam/i).map((part, idx, arr) => (
                        <span key={idx}>
                          {part}
                          {idx < arr.length - 1 && <span className="text-[#0068FF] font-bold">Nam</span>}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              ))}
              <div className="px-4 pt-3">
                <button className="w-full py-2 bg-slate-100 rounded-md text-[14px] font-bold text-slate-700 hover:bg-slate-200">Xem tất cả tin nhắn</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex flex-col h-full w-[320px] shrink-0 bg-white border-r border-slate-100 relative">
        
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-4 pt-4 pb-3 shrink-0">
          <div className={cn(
            "relative flex-1 h-8 flex items-center transition-all duration-200",
            isSearchFocused ? "bg-white ring-1 ring-[#0068FF] rounded-md" : "bg-slate-100 rounded-md"
          )}>
            <Search size={16} className={cn(
              "absolute left-2.5 transition-colors pointer-events-none",
              isSearchFocused ? "text-[#0068FF]" : "text-slate-500"
            )} />
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={search}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-full pl-9 pr-8 bg-transparent text-[14px] outline-none text-slate-800 placeholder:text-slate-500"
            />
            {isSearchFocused && search.length > 0 && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-slate-200 transition-colors"
                aria-label="Xóa tìm kiếm"
              >
                <X size={14} className="text-slate-400" />
              </button>
            )}
          </div>

          {isSearchFocused && (
            <button 
              onClick={() => {
                setIsSearchFocused(false)
                setSearch('')
              }}
              className="text-[15px] font-semibold text-slate-900 hover:text-slate-700 transition-colors whitespace-nowrap active:opacity-70"
            >
              Đóng
            </button>
          )}
          
          {!isSearchFocused && (
            <div className="flex items-center gap-1">
              <Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DialogTrigger asChild>
                      <button className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer">
                        <UserPlus size={20} strokeWidth={1.5} />
                      </button>
                    </DialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Thêm bạn</TooltipContent>
                </Tooltip>
                <DialogContent className="sm:max-w-[420px] p-0 rounded-xl overflow-hidden border-none shadow-2xl">
                  <DialogHeader className="h-14 px-5 border-b border-slate-100 flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-[17px] font-semibold text-slate-800">Thêm bạn</DialogTitle>
                    <DialogDescription className="sr-only">Thêm bạn bè mới vào danh sách liên lạc</DialogDescription>
                  </DialogHeader>

                <div className="p-6">
                  {/* Phone Input Area */}
                  <div className="flex items-end gap-3 mb-8">
                    <div className="flex items-center gap-2 pb-1.5 border-b border-slate-200 min-w-[100px] cursor-pointer hover:border-[#0068FF] transition-colors">
                      <img src="https://flagcdn.com/w20/vn.png" alt="VN" className="w-5 h-3.5 object-cover rounded-[1px]" />
                      <span className="text-[15px] font-medium text-slate-700">(+84)</span>
                      <ChevronDown size={14} className="text-slate-400" />
                    </div>
                    <div className="flex-1 border-b border-[#0068FF] pb-1.5">
                      <input 
                        type="text" 
                        placeholder="Số điện thoại" 
                        className="w-full text-[16px] outline-none placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  {/* Suggested Friends */}
                  <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500 mb-4">
                     <Users size={16} /> Có thể bạn quen
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { name: 'Hr', desc: 'Từ số điện thoại', img: 'https://i.pravatar.cc/100?img=32' },
                      { name: 'Bùi Minh', desc: 'Từ gợi ý kết bạn', img: 'https://i.pravatar.cc/100?img=33' },
                      { name: 'Bùi Thị Minh Thư', desc: 'Từ gợi ý kết bạn', img: 'https://i.pravatar.cc/100?img=34' },
                    ].map((user) => (
                      <div key={user.name} className="flex items-center gap-3">
                         <Avatar className="w-12 h-12 shadow-sm">
                            <AvatarImage src={user.img} className="object-cover" />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                         </Avatar>
                         <div className="flex-1">
                            <p className="text-[15px] font-semibold text-slate-800 leading-tight">{user.name}</p>
                            <p className="text-[13px] text-slate-500">{user.desc}</p>
                         </div>
                         <button className="px-4 py-1.5 rounded-[4px] border border-[#0068FF] text-[#0068FF] text-[14px] font-semibold hover:bg-blue-50 transition-colors cursor-pointer">
                            Kết bạn
                         </button>
                      </div>
                    ))}
                  </div>

                </div>
                <div className="flex justify-end gap-3 p-4 bg-white border-t border-slate-50">
                   <button className="px-5 py-2.5 rounded-md bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors cursor-pointer">Hủy</button>
                   <button className="px-5 py-2.5 rounded-md bg-[#0068FF] text-white font-semibold shadow-md hover:bg-[#0052cc] transition-colors cursor-pointer">Tìm kiếm</button>
                </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <button className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer">
                    <Users size={20} strokeWidth={1.5} />
                  </button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Tạo nhóm</TooltipContent>
            </Tooltip>
            <DialogContent className="sm:max-w-[500px] p-0 rounded-xl overflow-hidden border-none shadow-2xl">
               <DialogHeader className="h-14 px-5 border-b border-slate-100 flex-row items-center justify-between space-y-0">
                 <DialogTitle className="text-[17px] font-semibold text-slate-800">Tạo nhóm</DialogTitle>
                 <DialogDescription className="sr-only">Tạo nhóm trò chuyện mới với bạn bè</DialogDescription>
               </DialogHeader>

                  <div className="p-5">
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors bg-slate-50/50">
                           <Search size={20} />
                        </div>
                        <input 
                          type="text" 
                          placeholder="Nhập tên nhóm..." 
                          className="flex-1 text-[16px] font-medium outline-none border-b border-slate-200 focus:border-[#0068FF] py-2 transition-all"
                        />
                     </div>

                     <div className="relative mb-4">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                          type="text" 
                          placeholder="Nhập tên, số điện thoại, hoặc danh sách số điện thoại" 
                          className="w-full h-10 pl-10 pr-4 rounded-full bg-slate-100 border-none outline-none text-[14px] transition-all"
                        />
                     </div>

                     <div className="flex items-center gap-2 overflow-x-auto scrollbar-none mb-6">
                        <button className="px-4 py-1.5 rounded-full bg-[#0068FF] text-white text-[13px] font-medium whitespace-nowrap">Tất cả</button>
                        {INITIAL_TAGS.map(tag => (
                          <button key={tag.name} className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-[13px] font-medium hover:bg-slate-200 whitespace-nowrap transition-colors">{tag.name}</button>
                        ))}
                     </div>

                     <div className="max-h-[350px] overflow-y-auto scrollbar-thin pr-1">
                        <p className="text-[13px] font-semibold text-slate-500 mb-3 uppercase tracking-tight">Trò chuyện gần đây</p>
                        <div className="space-y-1">
                          {[
                            { name: 'Em', img: 'https://i.pravatar.cc/100?img=5' },
                            { name: 'chú Tuân', img: 'https://i.pravatar.cc/100?img=12' },
                            { name: 'Nguyễn Phạm Tùng Dương', img: 'https://i.pravatar.cc/100?img=11' },
                            { name: 'Phạm Tiến Nam', img: 'https://i.pravatar.cc/100?img=9' },
                          ].map((user) => (
                            <div key={user.name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                               <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-[#0068FF] transition-colors" />
                               <Avatar className="w-10 h-10">
                                  <AvatarImage src={user.img} className="object-cover" />
                                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                               </Avatar>
                               <span className="text-[15px] font-medium text-slate-800">{user.name}</span>
                            </div>
                          ))}
                        </div>

                        <p className="text-[13px] font-semibold text-slate-500 mt-6 mb-3 uppercase tracking-tight">3</p>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 cursor-pointer group">
                           <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                           <Avatar className="w-10 h-10">
                              <AvatarImage src="https://i.pravatar.cc/100?img=20" className="object-cover" />
                              <AvatarFallback>3</AvatarFallback>
                           </Avatar>
                           <span className="text-[15px] font-medium text-slate-800">3 tr tầng 1</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex justify-end gap-3 p-5 border-t border-slate-50 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                      <button className="px-6 py-2.5 rounded-md bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors cursor-pointer">Hủy</button>
                      <button className="px-6 py-2.5 rounded-md bg-blue-100 text-blue-300 font-bold cursor-not-allowed transition-colors">Tạo nhóm</button>
                   </div>
            </DialogContent>
          </Dialog>
            </div>
          )}
        </div>

        {renderSearchOverlay()}

        {/* Tabs and Filter */}
        <div className="flex items-center px-3 gap-1 mb-1 relative border-b border-slate-100">
          {(['priority', 'other'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-2 py-2 text-[14px] font-semibold relative transition-all duration-200',
                tab === t ? 'text-[#0068FF]' : 'text-slate-500 hover:text-slate-800'
              )}
            >
              {t === 'priority' ? 'Ưu tiên' : 'Khác'}
              {tab === t && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0068FF]" />}
            </button>
          ))}

          <div className="ml-auto flex items-center gap-1">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-1 px-2 py-1 text-[13px] text-slate-600 hover:bg-slate-50 rounded-md transition-colors cursor-pointer">
                  Phân loại <ChevronDown size={14} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0 border-none shadow-2xl rounded-xl overflow-hidden mt-1">
                <div className="p-4 bg-white">
                   <div className="mb-4">
                      <p className="text-[14px] font-medium text-slate-500 mb-2">Theo trạng thái</p>
                      <div className="space-y-1">
                        <FilterOption label="Tất cả" checked={filterStatus === 'all'} type="radio" onClick={() => setFilterStatus('all')} />
                        <FilterOption label="Chưa đọc" checked={filterStatus === 'unread'} type="radio" onClick={() => setFilterStatus('unread')} />
                      </div>
                   </div>
                   <ContextMenuSeparator className="my-3 opacity-30" />
                   <div className="mb-3">
                      <p className="text-[14px] font-medium text-slate-500 mb-2">Theo thẻ phân loại</p>
                      <div className="space-y-1">
                        {INITIAL_TAGS.map(tag => (
                          <FilterOption key={tag.name} label={tag.name} color={tag.color} isTag checked={selectedTags.includes(tag.name)} onClick={() => toggleTag(tag.name)} />
                        ))}
                        <FilterOption label="Tin nhắn từ người lạ" isStranger checked={selectedTags.includes('Stranger')} onClick={() => toggleTag('Stranger')} />
                      </div>
                   </div>
                   <ContextMenuSeparator className="my-3 opacity-30" />
                   <Dialog onOpenChange={() => setIsAddingTag(false)}>
                      <DialogTrigger asChild>
                        <button className="w-full text-center py-2 text-[15px] font-medium text-[#0068FF] hover:bg-slate-50 transition-colors cursor-pointer">
                            Quản lý thẻ phân loại
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[450px] p-0 rounded-xl overflow-hidden border-none shadow-2xl">
                        {isAddingTag ? (
                          <div className="bg-white">
                             <DialogHeader className="h-14 px-4 border-b border-slate-100 flex-row items-center space-y-0">
                               <button onClick={() => setIsAddingTag(false)} className="w-10 h-10 -ml-2 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-full transition-colors"><ChevronLeft size={24} /></button>
                               <DialogTitle className="text-[17px] font-semibold text-slate-800 ml-2">Thêm mới thẻ phân loại</DialogTitle>
                               <DialogDescription className="sr-only">Tạo một nhãn phân loại hội thoại mới</DialogDescription>
                             </DialogHeader>
                             <div className="p-6">
                                <label className="block text-[14.5px] font-medium text-slate-700 mb-2">Tên thẻ phân loại</label>
                                <div className="relative mb-8">
                                   <input type="text" placeholder="Nhập tên thẻ phân loại" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} className="w-full h-11 pl-4 pr-12 rounded-lg bg-slate-50 border border-slate-200 focus:border-[#0068FF] focus:bg-white outline-none text-[15px] transition-all" />
                                   <div className="absolute right-1.5 top-1/2 -translate-y-1/2">
                                      <Popover>
                                         <PopoverTrigger asChild>
                                           <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white border border-slate-200 hover:border-slate-300 transition-colors"><TagIcon color={selectedColor} /></button>
                                         </PopoverTrigger>
                                         <PopoverContent side="top" align="end" className="w-64 p-3 rounded-xl shadow-xl border-none">
                                            <p className="text-[13px] font-semibold text-slate-500 mb-3">Thay đổi màu thẻ</p>
                                            <div className="grid grid-cols-4 gap-2">
                                               {COLORS.map(c => (
                                                 <button key={c} onClick={() => setSelectedColor(c)} className="relative w-10 h-8 rounded-md flex items-center justify-center transition-transform hover:scale-105" style={{ backgroundColor: c }}>
                                                   {selectedColor === c && <CheckIcon size={16} className="text-white drop-shadow-sm" />}
                                                 </button>
                                               ))}
                                            </div>
                                         </PopoverContent>
                                      </Popover>
                                   </div>
                                </div>
                                <div className="mb-8">
                                   <p className="text-[14.5px] font-medium text-slate-700 mb-3">Hội thoại được gán thẻ</p>
                                   <button className="flex items-center gap-2 text-[15px] text-[#0068FF] font-medium hover:underline"><Plus size={18} /> Thêm hội thoại</button>
                                </div>
                                <div className="flex gap-3 mt-10">
                                   <button onClick={() => setIsAddingTag(false)} className="flex-1 h-11 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors">Hủy</button>
                                   <button disabled={!newTagName} className={cn("flex-1 h-11 rounded-lg font-semibold transition-all", newTagName ? "bg-[#0068FF] text-white shadow-md hover:bg-[#0052cc]" : "bg-blue-100 text-white cursor-not-allowed")}>Thêm phân loại</button>
                                </div>
                             </div>
                          </div>
                        ) : (
                          <div className="bg-white">
                             <DialogHeader className="h-14 px-5 border-b border-slate-100 flex-row items-center justify-between space-y-0">
                               <DialogTitle className="text-[17px] font-semibold text-slate-800">Quản lý thẻ phân loại</DialogTitle>
                               <DialogDescription className="sr-only">Xem và chỉnh sửa danh sách các thẻ phân loại</DialogDescription>
                             </DialogHeader>
                             <div className="p-5">
                                <p className="text-[14px] font-semibold text-slate-500 mb-4">Danh sách thẻ phân loại</p>
                                <div className="space-y-2.5 max-h-[400px] overflow-y-auto scrollbar-thin rounded-xl">
                                   {INITIAL_TAGS.map(tag => (
                                     <div key={tag.name} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
                                        <GripVertical size={16} className="text-slate-300 cursor-grab active:cursor-grabbing" />
                                        <TagIcon color={tag.color} />
                                        <span className="flex-1 text-[15px] font-medium text-slate-800">{tag.name}</span>
                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                           <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-slate-600"><Pencil size={18} /></button>
                                           <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white transition-colors text-slate-600"><Trash2 size={18} /></button>
                                        </div>
                                     </div>
                                   ))}
                                </div>
                                <button onClick={() => { setNewTagName(''); setIsAddingTag(true); }} className="mt-6 flex items-center gap-3 text-[15px] font-semibold text-[#0068FF] hover:bg-blue-50 px-2 py-2 rounded-md transition-colors cursor-pointer"><Plus size={20} /> Thêm phân loại</button>
                             </div>
                          </div>
                        )}
                      </DialogContent>
                   </Dialog>
                </div>
              </PopoverContent>
            </Popover>
            <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 rounded-md transition-colors"><MoreHorizontal size={18} /></button>
          </div>
        </div>

        {/* Chat Items List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filtered.map((chat) => {
            const isActive = activeChatId === chat.id
            return (
              <ContextMenu key={chat.id}>
                <ContextMenuTrigger>
                  <button
                    onClick={() => onSelectChat?.(chat.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-3.5 py-3 text-left group transition-all duration-150 relative cursor-pointer',
                      isActive ? 'bg-[#E5EFFF]' : 'hover:bg-slate-50'
                    )}
                  >
                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#0068FF]" />}

                    {/* Avatar Section */}
                    {chat.isGroup ? (
                      <GroupAvatar urls={chat.avatars || []} memberCount={chat.memberCount} />
                    ) : (
                      <div className="relative shrink-0 w-[52px] h-[52px]">
                        <Avatar className="w-full h-full border-none">
                          <AvatarImage src={chat.avatar} alt={chat.name} className="object-cover" />
                          <AvatarFallback className="bg-slate-200 text-slate-600 font-bold">{chat.isCloud ? <Cloud size={20} /> : chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.isOfficial && <span className="absolute bottom-0 right-0 w-4 h-4 bg-blue-600 border-2 border-white rounded-full flex items-center justify-center"><ChevronDown size={10} className="text-white -rotate-90" /></span>}
                      </div>
                    )}

                    {/* Info Section */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={cn("text-[14.5px] truncate flex-1", ((chat.unread || 0) > 0 || chat.pinned) ? "font-semibold text-slate-900" : "font-medium text-slate-800")}>{chat.name}</span>
                        <div className="flex items-center gap-1.5 shrink-0 ml-2">
                           {chat.muted && <BellOff size={13} className="text-slate-400" />}
                           <span className="text-[11px] text-slate-500 whitespace-nowrap">{chat.time}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-[13px] text-slate-500 truncate flex-1">
                           {chat.id === 'chú Tuân' && <PhoneIncoming size={12} className="text-slate-400" />}
                           {chat.id === 'c_cloud' && <span className="text-red-500">🚩</span>}
                           <span className="truncate leading-tight">{chat.lastMsg}</span>
                        </div>
                        {chat.pinned && <Pin size={12} className={cn("shrink-0 text-slate-400 rotate-45 ml-1.5", isActive && "text-[#0068FF]")} />}
                      </div>
                    </div>
                  </button>
                </ContextMenuTrigger>

                <ContextMenuContent className="w-64 py-1">
                  <ContextMenuItem className="py-2 px-3 text-[14.5px] cursor-pointer">{chat.pinned ? 'Bỏ ghim hội thoại' : 'Ghim hội thoại'}</ContextMenuItem>
                  <ContextMenuItem className="py-2 px-3 text-[14.5px] cursor-pointer">{chat.tab === 'priority' ? 'Chuyển sang mục Khác' : 'Chuyển vào mục Ưu tiên'}</ContextMenuItem>
                  <ContextMenuSub>
                    <ContextMenuSubTrigger className="py-2 px-3 text-[14.5px] cursor-pointer">Phân loại</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-56 p-1.5">
                      <TagItem color="#E11D48" label="Khách hàng" />
                      <TagItem color="#D946EF" label="Gia đình" />
                      <TagItem color="#F97316" label="Công việc" />
                      <TagItem color="#FACC15" label="Bạn bè" />
                      <TagItem color="#22C55E" label="Trả lời sau" />
                      <TagItem color="#0068FF" label="Đồng nghiệp" />
                      <ContextMenuSeparator className="my-1.5" />
                      <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Quản lý thẻ phân loại</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuItem className="py-2 px-3 text-[14.5px] cursor-pointer">Đánh dấu chưa đọc</ContextMenuItem>
                  <ContextMenuSeparator />
                  {chat.muted ? (
                    <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Bật thông báo</ContextMenuItem>
                  ) : (
                    <ContextMenuSub>
                       <ContextMenuSubTrigger className="py-2.5 px-3 text-[14.5px] cursor-pointer">Tắt thông báo</ContextMenuSubTrigger>
                       <ContextMenuSubContent className="w-56 p-1">
                          <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Trong 1 giờ</ContextMenuItem>
                          <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Trong 4 giờ</ContextMenuItem>
                          <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Cho đến 8:00 AM</ContextMenuItem>
                          <ContextMenuItem className="py-2.5 px-3 text-[14.5px] cursor-pointer">Cho đến khi được mở lại</ContextMenuItem>
                       </ContextMenuSubContent>
                    </ContextMenuSub>
                  )}
                  <ContextMenuItem className="py-2 px-3 text-[14.5px] cursor-pointer">Ẩn trò chuyện</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuSub>
                    <ContextMenuSubTrigger className="py-2 px-3 text-[14.5px] text-slate-400 cursor-default">Tin nhắn tự xóa</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                      <ContextMenuItem className="py-2 cursor-pointer">Không bao giờ</ContextMenuItem>
                      <ContextMenuItem className="py-2 cursor-pointer">1 ngày</ContextMenuItem>
                      <ContextMenuItem className="py-2 cursor-pointer">7 ngày</ContextMenuItem>
                      <ContextMenuItem className="py-2 cursor-pointer">30 ngày</ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive" className="py-2 px-3 text-[14.5px] cursor-pointer">Xóa hội thoại</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem className="py-2 px-3 text-[14.5px] cursor-pointer">Báo xấu</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            )
          })}
        </div>
      </div>
    </TooltipProvider>
  )
}
