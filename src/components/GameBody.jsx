import { useContext, useState } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat } from ".";
import "../styles/GameBody.css";
import PlayersList from "./PlayersList";
import EndOfRound from "./EndOfRound";

export default function GameBody() {
  const [showResult, setShowResult] = useState(false);

  const { playersData, currentPlayer, activePlayer, playersPlaying } =
    useContext(PlayersContext);

  return (
    <div className={[`body ${currentPlayer ? "show" : ""}`]}>
      <PlayersList players={playersData} activePlayer={activePlayer} />
      <div className='center'>
        <EndOfRound showResult={showResult} setShowResult={setShowResult} />
        <span className='playing'>{`${
          playersData?.length < 2 ? "Aguardando jogadores" : ""
        } `}</span>
        {playersPlaying && (
          <ScoreBoard
            playersPlaying={playersPlaying}
            activePlayer={activePlayer}
          />
        )}
        <GameBoard showResult={showResult} />
      </div>
      <Chat />
    </div>
  );
}
