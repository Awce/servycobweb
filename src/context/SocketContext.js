import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

//provider
export const SocketProvider = ({ children }) => {
  const { socket, online } = useSocket("http://localhost:9990");

  return (
    <SocketProvider.Provider value={{ socket, online }}>
      {children}
    </SocketProvider.Provider>
  );
};
