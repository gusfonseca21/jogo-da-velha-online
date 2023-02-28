import { createContext } from "react";
import io from "socket.io-client";

const socket = io.connect(
  "https://glitch.com/edit/#!/rolezeiros-jogo-da-velha-server"
);

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
