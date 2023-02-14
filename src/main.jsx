import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { PlayersProvider } from "./context/PlayersConxtext";
import { SocketProvider } from "./context/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <PlayersProvider>
        <App />
      </PlayersProvider>
    </SocketProvider>
  </React.StrictMode>
);
