import React, { createContext, useContext, useState, useEffect } from 'react';

const CustomWebSocketContext = createContext(null);

export const CustomWebSocketProvider = ({ endpoint, children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(endpoint);

    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket cuyo enpoint es ', endpoint);
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket para el endpoint:', error, endpoint);
    };
    newSocket.onmessage = (event) => {
        console.log('Mensaje recibido del enpoint :', endpoint, event.data);
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada para el endpoint ', endpoint);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [endpoint]);

  return (
    <CustomWebSocketContext.Provider value={socket}>
      {children}
    </CustomWebSocketContext.Provider>
  );
};

export const useCustomWebSocket = () => useContext(CustomWebSocketContext);