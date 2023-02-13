import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat } from ".";
import "../styles/GameBody.css";
import PlayersList from "./PlayersList";

export default function GameBody() {
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.playersData;

  return (
    <div className='body'>
      <PlayersList players={players} />
      <div className='center'>
        <ScoreBoard players={players} />
        <GameBoard />
      </div>
      <Chat />
    </div>
  );
}
