'use client'

import { useRef, useEffect, useState } from 'react'
import {
  Phone,
  Video,
  Search,
  MoreHorizontal,
  ChevronDown,
  ThumbsUp,
  Smile,
  Image,
  Paperclip,
  Film,
  Monitor,
  PenLine,
  MapPin,
  Reply,
  Share2,
  UserRound,
  Crop,
  Type,
  Zap,
  CreditCard,
  SendHorizontal,
  BarChart2,    // Bình chọn
  AlarmClock,   // Nhắc hẹn
  FileText,     // Ghi chú
  Info,         // Trợ giúp (?)
  AlertTriangle, // Quan trọng (!)
  BellDot,      // Khẩn cấp
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
} from '@/components/ui/dropdown-menu'
import { EmojiPicker } from './EmojiPicker'
import { cn } from '@/lib/utils'
import { WelcomeSlideshow } from './WelcomeSlideshow'
interface Message {
  id: string
  senderId: 'me' | 'other'
  content: string
  time: string
  type: 'text' | 'sticker' | 'call'
  reaction?: { emoji: string; count: number }[]
  replyTo?: {
    senderName: string
    content: string
  }
  callType?: 'sent' | 'received'
  callDuration?: string
}

/* ─── Mock data (pixel-perfect với ảnh mẫu mới) ──────────────── */
const MESSAGES: Message[] = [
  {
    id: 'm1',
    senderId: 'other',
    content: 'Chiều vẫn làm à cu',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm2',
    senderId: 'other',
    content: 'Tg m nghỉ',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm3',
    senderId: 'me',
    content: 'em vừa về',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm4',
    senderId: 'other',
    content: 'Ờ',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm5',
    senderId: 'other',
    content: 'Thế thứ 2 anh lên sửa là đc à',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm6',
    senderId: 'me',
    content: 'xong hết rồi anh',
    time: '13:33',
    type: 'text',
  },
  {
    id: 'm7',
    senderId: 'me',
    content: 'nay họp demo tiếp',
    time: '13:34',
    type: 'text',
  },
  {
    id: 'm8',
    senderId: 'me',
    content: 'thiếu bị anh huy nói nói khắc phục nốt',
    time: '13:34',
    type: 'text',
    reaction: [{ emoji: '❤️', count: 1 }, { emoji: '👍', count: 1 }],
  },
  {
    id: 'm9',
    senderId: 'other',
    content: 'Thank kiu',
    time: '13:35',
    type: 'text',
    replyTo: {
      senderName: 'Ngô Đức Duy',
      content: 'xong hết rồi anh',
    },
  },
  {
    id: 'm10',
    senderId: 'other',
    content: 'Thôi ngon r tuần sau làm cái mới',
    time: '13:35',
    type: 'text',
    reaction: [{ emoji: '❤️', count: 1 }, { emoji: '❤️', count: 1 }],
  },
]

/* ─── Date Divider ───────────────────────────────────────────── */
function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center my-4 px-4 sticky top-0 z-10">
      <span className="text-[11px] text-muted-foreground/80 font-medium bg-black/5 dark:bg-white/10 rounded-full px-3 py-0.5 select-none backdrop-blur-sm">
        {label}
      </span>
    </div>
  )
}

/* ─── Sticker SVG nội tuyến (giữ nguyên) ───────────────────────── */
function StickerImg() {
  return (
    <div className="w-28 h-20 flex items-center justify-center">
      <svg viewBox="0 0 200 80" width="180" height="72" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="40" rx="80" ry="20" fill="none" stroke="#333" strokeWidth="3" />
        <path d="M20 40 Q50 20 80 40 Q110 60 140 40 Q170 20 180 40" fill="none" stroke="#333" strokeWidth="3" />
        <circle cx="185" cy="40" r="8" fill="none" stroke="#333" strokeWidth="2.5" />
        <circle cx="187" cy="37" r="2" fill="#333" />
        <line x1="182" y1="33" x2="178" y2="25" stroke="#333" strokeWidth="2" />
        <circle cx="178" cy="24" r="2" fill="#333" />
        <line x1="186" y1="32" x2="185" y2="23" stroke="#333" strokeWidth="2" />
        <circle cx="185" cy="22" r="2" fill="#333" />
      </svg>
    </div>
  )
}

/* ─── Call Bubble (giữ nguyên phong cách) ──────────────────────── */
function CallBubble({ msg }: { msg: Message }) {
  const isSent = msg.senderId === 'me'
  return (
    <div className={cn('flex items-start gap-2 mb-3', isSent ? 'flex-row-reverse' : 'flex-row')}>
      <div className="w-8 shrink-0 mt-1" />
      <div
        className={cn(
          'rounded-2xl overflow-hidden text-sm min-w-[210px] max-w-[260px] shadow-sm',
          isSent ? 'rounded-br-none' : 'rounded-bl-none border border-black/5'
        )}
        style={{
          backgroundColor: isSent ? '#E5EFFF' : '#FFFFFF',
          color: 'var(--foreground)',
        }}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-[#0068FF] flex items-center justify-center shrink-0">
            <Phone size={16} className="text-white" />
          </div>
          <div>
            <p className="font-semibold text-[13px] leading-tight">
              {isSent ? 'Cuộc gọi thoại đi' : 'Cuộc gọi thoại đến'}
            </p>
            <p className="text-[12px] opacity-70 flex items-center gap-1 mt-0.5">
              <Phone size={11} />
              {msg.callDuration}
            </p>
          </div>
        </div>
        <div className="border-t px-4 py-2 text-center text-[13px] font-semibold text-[#0068FF] bg-black/[0.02]">
          Gọi lại
        </div>
      </div>
    </div>
  )
}

/* ─── Text Bubble (Tái thiết kế 100% theo mẫu) ────────────────── */
function TextBubble({ 
  msg, 
  showAvatar, 
  isFirstInGroup, 
  isLastInGroup 
}: { 
  msg: Message; 
  showAvatar: boolean;
  isFirstInGroup: boolean;
  isLastInGroup: boolean;
}) {
  const isSent = msg.senderId === 'me'

  return (
    <div className={cn(
      'flex items-start group relative ', 
      isSent ? 'flex-row-reverse' : 'flex-row gap-2',
      isLastInGroup ? 'mb-4' : 'mb-1'
    )}>
      {/* Avatar (Chỉ hiện ở tin ĐẦU TIÊN của nhóm và chỉ cho bên nhận) */}
      {!isSent && (
        <div className="w-9 shrink-0">
          {isFirstInGroup && (
            <Avatar className="w-9 h-9 border border-black/5">
              <AvatarImage src="https://i.pravatar.cc/100?img=12" alt="Other" />
              <AvatarFallback className="text-xs bg-slate-200">D</AvatarFallback>
            </Avatar>
          )}
        </div>
      )}

      <div className={cn(
        'flex flex-col max-w-[70%]', 
        isSent ? 'items-end' : 'items-start'
      )}>
        {/* Bubble */}
        <div
          className={cn(
            'relative px-3.5 py-2.5 shadow-[0_1px_2px_rgba(0,0,0,0.1)] text-[14.5px] leading-[1.45]',
            isSent 
              ? 'bg-[#E5EFFF] text-slate-800' 
              : 'bg-white text-slate-800 border border-black/5',
            // Bo góc thông minh
            isSent 
              ? (isFirstInGroup ? 'rounded-[18px_18px_4px_18px]' : 'rounded-[18px_4px_4px_18px]')
              : (isFirstInGroup ? 'rounded-[18px_18px_18px_4px]' : 'rounded-[4px_18px_18px_18px]'),
            isLastInGroup && (isSent ? 'rounded-br-[18px]' : 'rounded-bl-[18px]')
          )}
        >
          {/* Trích dẫn (Reply) */}
          {msg.replyTo && (
            <div className="mb-2 px-3 py-2 bg-black/5 rounded-lg border-l-4 border-[#0068FF] opacity-80 cursor-pointer hover:bg-black/[0.08] transition-colors">
              <p className="text-[12px] font-bold text-[#0068FF] mb-0.5">{msg.replyTo.senderName}</p>
              <p className="text-[13px] text-slate-500 truncate">{msg.replyTo.content}</p>
            </div>
          )}

          {/* Sticker */}
          {msg.type === 'sticker' ? (
            <div className="relative py-1">
              <StickerImg />
              <div className="absolute top-0 right-0 w-6 h-6 bg-black/20 rounded-full flex items-center justify-center">
                <ChevronDown size={12} className="text-white" />
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{msg.content}</div>
          )}

          {/* Timestamp (Dưới bubble nếu là tin cuối group hoặc là tin duy nhất) */}
          <span className={cn(
            'block text-[10px] text-muted-foreground mt-1',
            isSent ? 'text-right' : 'text-left'
          )}>
            {msg.time}
          </span>
          
          {/* Reactions & Quick React */}
          <div className={cn(
            'absolute -bottom-2.5 flex items-center gap-1',
            isSent ? 'right-2' : 'left-2'
          )}>
            {/* Reaction Badges */}
            {msg.reaction && msg.reaction.length > 0 && (
              <div className="flex items-center h-[22px] bg-white border border-black/10 rounded-full px-1.5 shadow-sm gap-0.5">
                {msg.reaction.map((r, i) => (
                  <span key={i} className="text-[12px] leading-none">{r.emoji}</span>
                ))}
                <span className="text-[10px] text-slate-500 font-bold ml-0.5">
                  {msg.reaction.reduce((acc, curr) => acc + curr.count, 0)}
                </span>
              </div>
            )}
            
            {/* Quick React Button (Thumbs Up) */}
            <button 
              className="w-[22px] h-[22px] rounded-full bg-white border border-black/10 shadow-sm flex items-center justify-center text-slate-400 hover:text-yellow-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 outline-none"
              title="Thích"
            >
              <ThumbsUp size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Hover actions */}
      <div className={cn(
        'absolute top-[10px] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200',
        isSent ? 'right-[calc(100%+8px)] flex-row-reverse' : 'left-[calc(100%+8px)]'
      )}>
        <button className="w-[30px] h-[30px] rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95" title="Trả lời">
          <Reply size={14} strokeWidth={2} />
        </button>
        <button className="w-[30px] h-[30px] rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95" title="Chuyển tiếp">
          <Share2 size={14} strokeWidth={2} />
        </button>
        <button className="w-[30px] h-[30px] rounded-full bg-white hover:bg-slate-50 flex items-center justify-center text-slate-500 shadow-sm border border-slate-100 transition-all hover:scale-110 active:scale-95" title="Thêm">
          <MoreHorizontal size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}

/* ─── Messages Scroll Area (Cập nhật logic nhóm) ──────────────── */
function MessageArea() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showScrollDown, setShowScrollDown] = useState(false)
  
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight

    const handler = () => {
      const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      setShowScrollDown(distFromBottom > 120)
    }
    el.addEventListener('scroll', handler)
    return () => el.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin py-4 relative"
      style={{ backgroundColor: '#F0F2F5' }}
    >
      <div className="px-5 pb-2">
        {MESSAGES.map((msg, idx) => {
          if (msg.type === 'call') return <CallBubble key={msg.id} msg={msg} />

          const prev = MESSAGES[idx - 1]
          const next = MESSAGES[idx + 1]

          const isFirstInGroup = !prev || prev.senderId !== msg.senderId || prev.type === 'call'
          const isLastInGroup = !next || next.senderId !== msg.senderId || next.type === 'call'

          return (
            <div key={msg.id}>
              {/* Ví dụ hiện divider tại m6 */}
              {idx === 5 && <DateDivider label="Hôm nay" />}
              <TextBubble 
                msg={msg} 
                showAvatar={isFirstInGroup}
                isFirstInGroup={isFirstInGroup}
                isLastInGroup={isLastInGroup}
              />
            </div>
          )
        })}
      </div>

      {/* Scroll to bottom button */}
      {showScrollDown && (
        <button
          onClick={() => scrollRef.current?.scrollTo({ top: 99999, behavior: 'smooth' })}
          className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-background shadow-lg flex items-center justify-center hover:bg-muted transition-colors border border-black/5"
          aria-label="Cuộn xuống"
        >
          <ChevronDown size={18} className="text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

/* ─── Chat Header ────────────────────────────────────────────── */
function ChatHeader() {
  return (
    <TooltipProvider delayDuration={200}>
      <div
        className="flex items-center justify-between px-4 h-[56px] shrink-0"
        style={{ backgroundColor: 'var(--bg-chat-window, white)' }}
      >
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://i.pravatar.cc/100?img=47" alt="Em" />
              <AvatarFallback>E</AvatarFallback>
            </Avatar>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background"
              style={{ backgroundColor: 'var(--online-dot, #22C55E)' }}
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold text-foreground leading-tight">Em</p>
              {/* Tag icon (giống Zalo) */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-muted-foreground opacity-60">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="7" y1="7" x2="7.01" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="text-[10px] text-muted-foreground leading-tight">Vừa truy cập</p>
          </div>
        </div>

        {/* Right: Phone, Video, Search, Panel */}
        <div className="flex items-center gap-0.5">
          {[
            { id: 'hdr-phone',  icon: Phone,  label: 'Gọi thoại' },
            { id: 'hdr-video',  icon: Video,  label: 'Gọi video' },
            { id: 'hdr-search', icon: Search, label: 'Tìm kiếm trong hội thoại' },
          ].map(({ id, icon: Icon, label }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  id={id}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
                >
                  <Icon size={19} strokeWidth={1.75} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs">{label}</TooltipContent>
            </Tooltip>
          ))}
          {/* Divider */}
          <div className="w-px h-5 bg-border mx-1" />
          {/* Panel info button */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                id="hdr-panel"
                aria-label="Thông tin hội thoại"
                className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-150"
              >
                {/* 2-panel icon (như Zalo) */}
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <line x1="15" y1="3" x2="15" y2="21"/>
                </svg>
              </button>
            </TooltipTrigger>
            <TooltipContent className="text-xs">Thông tin hội thoại</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

/* ─── Input Toolbar ──────────────────────────────────────────── */

// Toolbar icons chuẩn Zalo (như trong ảnh mẫu)
const TOOLBAR_BTNS = [
  { id: 'tb-sticker', icon: Smile,      label: 'Sticker' },
  { id: 'tb-image',   icon: Image,      label: 'Gửi hình ảnh' },
  { id: 'tb-file',    icon: Paperclip,  label: 'Gửi file' },
  { id: 'tb-contact', icon: UserRound,  label: 'Danh thiếp' },
  { id: 'tb-screen',  icon: Crop,       label: 'Chụp màn hình' },
  { id: 'tb-format',  icon: Type,       label: 'Định dạng tin nhắn' },
  { id: 'tb-quick',   icon: Zap,        label: 'Tin nhắn nhanh' },
  { id: 'tb-card',    icon: CreditCard, label: 'Giao dịch' },
  { id: 'tb-more',    icon: MoreHorizontal, label: 'Thêm' },
] as const

function InputToolbar() {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Giả định trạng thái Group để render menu khác nhau
  // Trong thực tế sẽ lấy từ props hoặc store
  const isGroup = true 

  // Tự động giãn nở chiều cao theo nội dung
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '42px' // Chiều cao cơ bản
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = Math.min(scrollHeight, 180) + 'px'
    }
  }, [value])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (value.trim()) {
        console.log('Sending message:', value)
        setValue('')
      }
    }
  }

  return (
    <div
      className="shrink-0"
      style={{ backgroundColor: 'var(--bg-chat-window, white)' }}
    >
      {/* Toolbar icon row - Có viền rất mờ phía trên và dưới để tách biệt */}
      <TooltipProvider delayDuration={200}>
        <div className="flex items-center gap-0.5 px-3 pt-1.5 pb-0.5 border-t border-border/20 border-b border-border/10">
          {TOOLBAR_BTNS.filter(b => b.id !== 'tb-more').map(({ id, icon: Icon, label }) => (
            <Tooltip key={id}>
              <TooltipTrigger asChild>
                <button
                  id={id}
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
                >
                  <Icon size={19} strokeWidth={1.5} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs">{label}</TooltipContent>
            </Tooltip>
          ))}

          {/* Nút Ba Chấm (Thêm) với DropdownMenu chuẩn Zalo */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <button
                    id="tb-more"
                    className="w-8 h-8 flex items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 outline-none"
                  >
                    <MoreHorizontal size={19} strokeWidth={1.5} />
                  </button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent className="text-xs">Thêm</TooltipContent>
            </Tooltip>

            <DropdownMenuContent side="top" align="start" className="w-64 p-1.5 shadow-2xl rounded-xl border-slate-100">
              {isGroup && (
                <>
                  <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                    <BarChart2 size={18} strokeWidth={1.5} className="mr-3 text-slate-600" />
                    <span className="text-[14px] font-medium text-slate-700">Tạo bình chọn</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                    <AlarmClock size={18} strokeWidth={1.5} className="mr-3 text-slate-600" />
                    <span className="text-[14px] font-medium text-slate-700">Tạo nhắc hẹn</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                    <FileText size={18} strokeWidth={1.5} className="mr-3 text-slate-600" />
                    <span className="text-[14px] font-medium text-slate-700">Tạo ghi chú</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-2 my-1.5 bg-slate-100" />
                </>
              )}

              {!isGroup && (
                <>
                  <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50">
                    <AlarmClock size={18} strokeWidth={1.5} className="mr-3 text-slate-600" />
                    <span className="text-[14px] font-medium text-slate-700">Tạo nhắc hẹn</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="mx-2 my-1.5 bg-slate-100" />
                </>
              )}

              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangle size={18} strokeWidth={1.5} className="mr-3 text-slate-600 font-bold" />
                  <span className="text-[14px] font-medium text-slate-700">Đánh dấu tin quan trọng</span>
                </div>
                <Info size={15} className="text-slate-300 hover:text-slate-500 transition-colors" />
              </DropdownMenuItem>

              <DropdownMenuItem className="py-2.5 px-3 cursor-pointer rounded-lg focus:bg-slate-50 flex items-center justify-between">
                <div className="flex items-center">
                  <BellDot size={18} strokeWidth={1.5} className="mr-3 text-slate-600" />
                  <span className="text-[14px] font-medium text-slate-700">Đánh dấu tin khẩn cấp</span>
                </div>
                <Info size={15} className="text-slate-300 hover:text-slate-500 transition-colors" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Input area - Kiểu Zalo: Không nền, gõ trực tiếp trên nền trắng */}
        <div className="flex gap-2 px-4 py-2 relative min-h-[50px]">
          <textarea
            ref={textareaRef}
            id="chat-message-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Nhập @, tin nhắn tới Em"
            rows={1}
            className="
              flex-1 py-2 pr-[80px]
              bg-transparent text-[14.5px] leading-[22px]
              border-0 focus:ring-0 resize-none
              text-foreground placeholder:text-muted-foreground/50
              overflow-y-auto scrollbar-hide
            "
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          />

          {/* Emoji & Quick actions - Cố định bên phải */}
          <div className="absolute right-4 bottom-3 flex items-center gap-1.5">
            <EmojiPicker
              onSelect={(emoji) => {
                const textarea = textareaRef.current
                if (!textarea) return
                const start = textarea.selectionStart
                const end = textarea.selectionEnd
                const newValue = value.substring(0, start) + emoji + value.substring(end)
                setValue(newValue)
                
                // Đưa con trỏ vào vị trí sau emoji vừa chèn (dùng setTimeout để chờ React render lại)
                setTimeout(() => {
                  textarea.focus()
                  textarea.setSelectionRange(start + emoji.length, start + emoji.length)
                }, 0)
              }}
            >
              <button
                id="chat-emoji-btn"
                type="button"
                aria-label="Biểu cảm"
                className="w-8 h-8 flex items-center justify-center rounded-full text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                <Smile size={23} strokeWidth={1.5} />
              </button>
            </EmojiPicker>

            {value.trim() ? (
              /* Nút Gửi (Xanh dương) khi có chữ */
              <button
                id="chat-send-btn"
                aria-label="Gửi"
                className="w-8 h-8 flex items-center justify-center text-[#0068FF] hover:scale-110 active:scale-95 transition-transform"
                onClick={() => {
                  console.log('Sending message:', value)
                  setValue('')
                }}
              >
                <SendHorizontal size={23} strokeWidth={2} />
              </button>
            ) : (
              /* Nút Thumbs Up (Vàng) khi trống */
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    id="chat-like-btn"
                    aria-label="Thích"
                    className="w-8 h-8 flex items-center justify-center text-[#FFB600] hover:scale-110 active:scale-95 transition-transform"
                  >
                    <ThumbsUp size={23} strokeWidth={1.5} fill="currentColor" fillOpacity={0.1} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="text-xs">Thích</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </TooltipProvider>
    </div>
  )
}

/* ─── ChatWindow ─────────────────────────────────────────────── */
interface ChatWindowProps {
  chatId?: string | null
}

export function ChatWindow({ chatId }: ChatWindowProps) {
  if (!chatId) {
    return <WelcomeSlideshow />
  }

  return (
    <div
      className="flex flex-col flex-1 h-full overflow-hidden"
      style={{ backgroundColor: 'var(--bg-chat-window, white)' }}
    >
      {/* Header */}
      <ChatHeader />

      {/* Message Area */}
      <MessageArea />

      {/* Input Toolbar */}
      <InputToolbar />
    </div>
  )
}
