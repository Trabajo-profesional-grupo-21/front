import React, { createContext, useContext, useState, useEffect } from 'react';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8000/video_entire');

    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket');
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket:', error);
    };
    newSocket.onmessage = (event) => {
        console.log('Mensaje recibido:', event.data);
      };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada');
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);