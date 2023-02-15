import { useContext, useState } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat } from ".";
import "../styles/GameBody.css";
import PlayersList from "./PlayersList";
import { SocketContext } from "../context/SocketContext";

export default function GameBody() {
  const [showGameBoard, setShowGameBoard] = useState(false);

  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.playersData;
  const currentPlayer = playersCtx.currentPlayer;

  const playerActive = playersCtx.playerActive;

  const socket = useContext(SocketContext);

  socket.on("set_player", () => {
    setShowGameBoard(true);
  });

  return (
    <div className={[`body ${showGameBoard ? "show" : ""}`]}>
      <PlayersList players={players} />
      <div className='center'>
        <span className='playing'>{`${
          players.length < 2
            ? "Aguardando jogadores"
            : currentPlayer.id === playerActive.id
            ? "Sua vez"
            : "Vez de " + playerActive.name
        } `}</span>
        <ScoreBoard players={players} />
        <GameBoard />
      </div>
      <Chat />
    </div>
  );
}
