import { createContext, useContext, useState } from "react";
import {
  africanWoman,
  dave,
  indianWoman,
  lenin,
  malcolm,
  robo2,
  robo3,
  stalin,
  trinity,
} from "../assets/images/avatars";
import { SocketContext } from "./SocketContext";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [playersData, setPlayersData] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(undefined);

  const socket = useContext(SocketContext);

  const avatars = [
    africanWoman,
    dave,
    indianWoman,
    lenin,
    malcolm,
    robo2,
    robo3,
    stalin,
    trinity,
  ];

  socket.on("update_players_list", (data) => setPlayersData(data));

  socket.on("set_player", (data) => setCurrentPlayer(data));

  const provider = {
    playersData,
    setPlayersData,
    avatars,
    currentPlayer,
  };

  return (
    <PlayersContext.Provider value={provider}>
      {children}
    </PlayersContext.Provider>
  );
};
