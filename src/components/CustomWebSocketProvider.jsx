import React, { createContext, useContext, useState } from 'react';

const CustomWebSocketContext = createContext({});

export const CustomWebSocketProvider = ({ children }) => {
  const [sockets, setSockets] = useState({});

  const createSocket = (endpoint) => {
    const newSocket = new WebSocket(endpoint);
    const newSockets = { ...sockets, [endpoint]: newSocket };

    newSocket.onopen = () => {
      console.log('Conexión establecida con el servidor WebSocket cuyo endpoint es ', endpoint);
    };

    newSocket.onerror = (error) => {
      console.error('Error en la conexión WebSocket para el endpoint:', error, endpoint);
    };

    newSocket.onclose = () => {
      console.log('Conexión WebSocket cerrada para el endpoint:', endpoint);
      // Eliminar el socket cerrado del estado
      setSockets((prevSockets) => {
        const { [endpoint]: removedSocket, ...rest } = prevSockets;
        return rest;
      });
    };

    setSockets(newSockets);

    return newSocket;
  };

  const value = { sockets, createSocket };

  return (
    <CustomWebSocketContext.Provider value={value}>
      {children}
    </CustomWebSocketContext.Provider>
  );
};

export const useCustomWebSocket = () => useContext(CustomWebSocketContext);
