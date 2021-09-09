import React, { createContext } from "react";
import { useSocket } from "../hooks/useSocket";

export const SocketContext = createContext();

//URL
const { socket, online } = useSocket("http://localhost:8080");

//provider
export const SocketProvider = ({ children }) => {
  return (
    <SocketProvider.Provider value={{ socket, online }}>
      {children}
    </SocketProvider.Provider>
  );
};
