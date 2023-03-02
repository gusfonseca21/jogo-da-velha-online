import { createContext } from "react";
import io from "socket.io-client";

const socket = io.connect("https://jogo-da-velha-server.glitch.me");

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
