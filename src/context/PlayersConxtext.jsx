import { createContext, useState } from "react";
import { socket } from "../socket";
import PropTypes from "prop-types";

export const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [playersData, setPlayersData] = useState([]);

  socket.on("update_players_list", (data) => setPlayersData(data));

  const provider = {
    playersData,
    setPlayersData,
  };

  return (
    <PlayersContext.Provider value={provider}>
      {children}
    </PlayersContext.Provider>
  );
};

PlayersProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
