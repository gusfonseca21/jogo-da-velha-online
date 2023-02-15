import { useEffect } from "react";
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
  const [playersPlaying, setPlayersPlaying] = useState([]);
  const [playerActive, setPlayerActive] = useState(undefined);
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

  socket.on("update_players_list", (data) => {
    console.log(data);
    if (data.length === 1) setPlayerActive(...data);

    setPlayersData(data);
  });

  socket.on("set_player", (data) => setCurrentPlayer(data));

  useEffect(() => {
    if (playersData.length > 1) {
      setPlayersPlaying([playersData[0], playersData[1]]);
    }
  }, [playersData]);

  const provider = {
    playersData,
    setPlayersData,
    avatars,
    currentPlayer,
    playersPlaying,
    playerActive,
  };

  return (
    <PlayersContext.Provider value={provider}>
      {children}
    </PlayersContext.Provider>
  );
};
