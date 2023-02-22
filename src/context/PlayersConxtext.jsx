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
  const [playersPlaying, setPlayersPlaying] = useState(null);
  const [activePlayer, setActivePlayer] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  console.log(playersPlaying);
  console.log(playersData);

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

  useEffect(() => {
    socket.on("update_players_list", (serverPlayers) => {
      setPlayersData(serverPlayers);
    });
    socket.on("set_active_player", (player) => {
      setActivePlayer(player);
    });

    socket.on("set_players_playing", (serverPlayersPlaying) => {
      if (serverPlayersPlaying.length === 0) setPlayersPlaying(null);
      else setPlayersPlaying(serverPlayersPlaying);
    });
    socket.on("set_player", (player) => {
      setCurrentPlayer(player);
    });
    return function cleanup() {
      socket.removeListener("update_players_list");
      socket.removeListener("set_player");
      socket.removeListener("set_players_playing");
      socket.removeListener("set_active_player");
    };
  }, [socket]);

  const provider = {
    playersData,
    setPlayersData,
    avatars,
    currentPlayer,
    playersPlaying,
    activePlayer,
  };

  return (
    <PlayersContext.Provider value={provider}>
      {children}
    </PlayersContext.Provider>
  );
};
