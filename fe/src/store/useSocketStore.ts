import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  messages: string[];
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string) => void;
  addMessage: (message: string) => void;
}

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:5000';

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  isConnected: false,
  messages: [],
  
  connect: () => {
    const { socket } = get();
    if (socket?.connected) return;

    const newSocket = io(SOCKET_URL);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
      set({ isConnected: true });
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
      set({ isConnected: false });
    });

    newSocket.on('test_event', (data) => {
      console.log('Received test_event:', data);
      get().addMessage(data.message);
    });

    set({ socket: newSocket });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  sendMessage: (message: string) => {
    const { socket } = get();
    if (socket && socket.connected) {
      socket.emit('test_event', { message });
    } else {
      console.warn('Socket not connected');
    }
  },

  addMessage: (message: string) => {
    set((state) => ({ messages: [...state.messages, message] }));
  },
}));
