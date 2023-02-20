import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat } from ".";
import "../styles/GameBody.css";
import PlayersList from "./PlayersList";

export default function GameBody() {
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.playersData;
  const currentPlayer = playersCtx?.currentPlayer;

  const playerActive = playersCtx?.playerActive;

  return (
    <div className={[`body ${currentPlayer ? "show" : ""}`]}>
      <PlayersList players={players} />
      <div className='center'>
        <span className='playing'>{`${
          players.length < 2
            ? "Aguardando jogadores"
            : currentPlayer?.id === playerActive?.id
            ? "Sua vez"
            : "Vez de " + playerActive?.name
        } `}</span>
        <ScoreBoard players={players} />
        <GameBoard />
      </div>
      <Chat />
    </div>
  );
}
