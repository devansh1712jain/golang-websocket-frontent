import { atom } from 'recoil';

interface WebSocketState {
  socket: WebSocket | null;
  messages: any[]; // Adjust the type of messages as needed
}

export const websocketState = atom<WebSocketState>({
  key: 'websocketState',
  default: {
    socket: null,
    messages: [],
  },
});