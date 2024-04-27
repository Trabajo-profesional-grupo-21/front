import React, { createContext, useContext, useState } from 'react';

const CustomWebSocketContext = createContext({});

export const CustomWebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState({});

  const getSocket = (endpoint) => {
    return socket[endpoint];
  };

  const createSocket = (endpoint) => {
    const newSocket = new WebSocket(endpoint);
    const newSockets = { ...socket, [endpoint]: newSocket };

    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket cuyo enpoint es ', endpoint);
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket para el endpoint:', error, endpoint);
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada para el endpoint:', endpoint);
      // Eliminar el socket cerrado del estado
      setSocket((prevSockets) => {
        const { [endpoint]: removedSocket, ...rest } = prevSockets;
        return rest;
      });
    };

    setSocket(newSockets);

    return newSocket;
  };

  const value = { getSocket, createSocket };

  return (
    <CustomWebSocketContext.Provider value={value}>
      {children}
    </CustomWebSocketContext.Provider>
  );
};

export const useCustomWebSocket = () => useContext(CustomWebSocketContext);
