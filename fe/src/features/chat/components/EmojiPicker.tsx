'use client'

import * as React from 'react'
import { Smile, X, Ghost, Image as ImageIcon, Clock, Search as SearchIcon, Heart, ThumbsUp, ThumbsDown, PartyPopper, Frown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Đảm bảo chỉ import ở phía client khi component được tải
if (typeof window !== 'undefined') {
  import('emoji-picker-element')
}

// Định nghĩa bí danh để tránh lỗi TypeScript JSX IntrinsicElements
const EmojiPickerTag = 'emoji-picker' as any

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  children: React.ReactNode
}

export function EmojiPicker({ onSelect, children }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<'emoji' | 'stickers' | 'gifs'>('emoji')
  const containerRef = React.useRef<HTMLDivElement>(null)
  const onSelectRef = React.useRef(onSelect)

  // Cập nhật ref khi onSelect thay đổi
  React.useEffect(() => {
    onSelectRef.current = onSelect
  }, [onSelect])

  // Đóng khi click ra ngoài
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Sử dụng Callback Ref để xử lý khi bảng hiện lên
  const pickerRefCallback = React.useCallback((node: any) => {
    if (node) {
      const handleEmojiClick = (event: any) => {
        const emoji = event.detail.unicode || event.detail.emoji?.unicode
        if (emoji) {
          onSelectRef.current(emoji)
        }
      }
      node.addEventListener('emoji-click', handleEmojiClick)
    }
  }, []) 

  return (
    <div className="relative inline-block" ref={containerRef}>
      {/* Nút trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>
        {children}
      </div>

      {/* Bảng chọn Emoji Premium - White Background */}
      {isOpen && (
        <div 
          className={cn(
            "absolute bottom-full right-0 mb-3 z-50",
            "w-[360px] bg-white rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col",
            "animate-in fade-in slide-in-from-bottom-3 duration-200"
          )}
        >
          {/* Top Tabs: Emoji | Stickers | GIFs */}
          <div className="flex items-center justify-around h-12 border-b border-slate-100 px-4">
            {[
              { id: 'emoji', label: 'Emoji' },
              { id: 'stickers', label: 'Stickers' },
              { id: 'gifs', label: 'GIFs' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "relative h-full px-4 text-[14px] font-bold transition-colors",
                  activeTab === tab.id ? "text-[#0068FF]" : "text-slate-400 hover:text-slate-600"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0068FF] rounded-t-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex flex-col h-[480px] bg-white">
            {activeTab === 'emoji' ? (
              <div className="flex-1 overflow-hidden relative">
                {/* Main Picker */}
                 <EmojiPickerTag 
                    ref={pickerRefCallback} 
                    class="light h-full w-full"
                    style={{
                      '--num-columns': '9',
                      '--emoji-size': '1.6rem',
                      '--outline-color': '#0068FF',
                      '--indicator-color': '#0068FF',
                      '--background': '#ffffff',
                      'width': '100%',
                      'height': '100%',
                      'border': 'none'
                    }}
                 />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 italic text-[13px] bg-slate-50/30">
                Tính năng {activeTab} đang được phát triển...
              </div>
            )}

            {/* Bottom Category Bar chuẩn ảnh mẫu */}
            <div className="h-12 bg-slate-50/80 border-t border-slate-100 flex items-center px-3 gap-1 overflow-x-auto scrollbar-none shrink-0">
               <button className="p-2 text-[#0068FF] hover:bg-slate-200/50 rounded-lg transition-colors"><Clock size={18} strokeWidth={2.5}/></button>
               <button className="p-2 text-slate-400 hover:bg-slate-200/50 rounded-lg transition-colors"><Smile size={18} /></button>
               <button className="p-2 text-slate-400 hover:bg-slate-200/50 rounded-lg transition-colors"><Heart size={18} /></button>
               <div className="w-px h-5 bg-slate-200 mx-1" />
               <div className="flex items-center gap-1">
                  {/* Mock Sticker Pack Icons */}
                  <div className="w-8 h-8 rounded-lg bg-yellow-100 flex items-center justify-center text-lg">🦁</div>
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-lg">🐳</div>
                  <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-lg">🐷</div>
                  <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-lg">🐸</div>
                  <button className="w-8 h-8 rounded-lg border border-dashed border-slate-300 flex items-center justify-center text-slate-400">+</button>
               </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{ __html: `
            emoji-picker {
              border: none !important;
              --background: #ffffff;
              --border-color: #f1f5f9;
              --indicator-color: #0068FF;
            }
            emoji-picker::part(nav) {
              display: none; /* Ẩn nav mặc định để dùng nav custom của mình */
            }
            emoji-picker::part(search-row) {
              padding: 12px 12px 8px;
            }
            emoji-picker::part(search) {
              background: #f8fafc;
              border: 1px solid #f1f5f9;
              border-radius: 8px;
              padding: 8px 12px;
              font-size: 14px;
            }
            emoji-picker::part(category-tabs) {
              border-bottom: 1px solid #f1f5f9;
            }
          ` }} />
        </div>
      )}
    </div>
  )
}
