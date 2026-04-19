'use client'

import { useState } from 'react'
import { ChatSidebar } from '@/features/chat/components/ChatSidebar'
import { ChatList }    from '@/features/chat/components/ChatList'
import { ChatWindow }  from '@/features/chat/components/ChatWindow'

export default function ChatPage() {
  const [activeNav, setActiveNav] = useState<'chat' | 'contacts' | 'cloud' | 'todo'>('chat')
  const [activeChat, setActiveChat] = useState<string | null>(null)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Col 1: Sidebar 64px */}
      <ChatSidebar active={activeNav} onNavigate={setActiveNav} />

      {/* Col 2: Chat List 300px */}
      <ChatList activeChatId={activeChat} onSelectChat={setActiveChat} />

      {/* Col 3: Chat Window flex-1 */}
      <ChatWindow chatId={activeChat} />
    </div>
  )
}