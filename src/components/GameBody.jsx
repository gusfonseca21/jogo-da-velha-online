import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat } from ".";
import "../styles/GameBody.css";
import PlayersList from "./PlayersList";
import ActivePlayerSpan from "./ActivePlayerSpan";
import EndOfRound from "./EndOfRound";

export default function GameBody() {
  const { playersData, currentPlayer, activePlayer, playersPlaying } =
    useContext(PlayersContext);

  return (
    <div className={[`body ${currentPlayer ? "show" : ""}`]}>
      <PlayersList players={playersData} />
      <div className='center'>
        <EndOfRound />
        <ActivePlayerSpan
          players={playersData}
          playerActive={activePlayer}
          currentPlayer={currentPlayer}
        />
        {playersPlaying && <ScoreBoard playersPlaying={playersPlaying} />}
        <GameBoard />
      </div>
      <Chat />
    </div>
  );
}
