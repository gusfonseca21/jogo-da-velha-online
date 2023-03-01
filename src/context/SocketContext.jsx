import { createContext } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");
// const socket = io.connect("https://rolezeiros-jogo-da-velha-server.glitch.me");

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
