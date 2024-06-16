import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { websocketState } from '../atoms';

function useWebSocket() {
  const [webSocketState, setWebSocketState] = useRecoilState(websocketState);

  useEffect(() => {
    const socket = new WebSocket('ws://ec2-54-153-173-231.ap-southeast-2.compute.amazonaws.com:8080/ws');

    socket.onopen = () => {
      console.log('WebSocket connection established');
      // Update Recoil state when WebSocket opens
      setWebSocketState(prevState => ({ ...prevState, socket }));
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    socket.onmessage = (event) => {
      try {
        const messageObj = JSON.parse(event.data);
        console.log('WebSocket message received:', messageObj);
    
        switch (messageObj.event) {
          case 'set':
            // Update Recoil state with received message
            setWebSocketState(prevState => ({
              ...prevState,
              messages: [...prevState.messages, messageObj]
            }));
            break;
          case 'expired':
            // Remove the key from the Recoil state
            setWebSocketState(prevState => ({
              ...prevState,
              messages: prevState.messages.filter(msg => msg.key !== messageObj.key)
            }));
            break;
          case 'del':
            // Remove the key from the Recoil state
            setWebSocketState(prevState => ({
              ...prevState,
              messages: prevState.messages.filter(msg => msg.key !== messageObj.key)
            }));
            break;
          default:
            console.error('Unknown event type:', messageObj.event);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    return () => {
      // Close WebSocket connection when component unmounts
      socket.close();
    };
  }, [setWebSocketState]);

  return webSocketState;
}

export default useWebSocket;