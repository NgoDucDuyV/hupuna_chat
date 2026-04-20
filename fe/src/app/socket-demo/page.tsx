'use client';

import { useEffect, useState } from 'react';
import { useSocketStore } from '@/store/useSocketStore';

export default function SocketDemoPage() {
  const { isConnected, messages, connect, disconnect, sendMessage } = useSocketStore();
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-zinc-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Socket.io Demo
            <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Status: {isConnected ? 'Connected' : 'Disconnected'}
          </p>
        </div>
        
        <div className="p-6 h-80 overflow-y-auto bg-gray-50 dark:bg-zinc-900/50 flex flex-col gap-2">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-10">No messages yet.</div>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-lg w-fit max-w-[80%]">
                {msg}
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-zinc-800 border-t border-gray-200 dark:border-zinc-700 flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-600 bg-transparent text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            disabled={!isConnected || !inputMessage.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
