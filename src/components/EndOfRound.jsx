import { useContext, useEffect, useState } from "react";
import "../styles/EndOfRound.css";
import { SocketContext } from "../context/SocketContext";
import { PlayersContext } from "../context/PlayersConxtext";

export default function EndOfRound() {
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const socket = useContext(SocketContext);

  const { playersPlaying } = useContext(PlayersContext);

  const displayWinner = () => {
    if (result) {
      if (result.isDraw) return "EMPATE";
      else {
        const winner = playersPlaying.filter(
          (playerPlaying) => playerPlaying.id === result.winner
        )[0];

        const victoryString = `${winner.name} venceu a rodada!`;
        return victoryString;
      }
    }
  };

  useEffect(() => {
    socket.on("end_of_round", (serverResult) => {
      setResult(serverResult);
      setShowResult(true);

      setTimeout(() => {
        setShowResult(false);
      }, 3000);

      setTimeout(() => {
        setResult(null);
      }, 10000);
    });
    return function cleanup() {
      socket.removeListener("end_of_round");
    };
  }, []);

  return (
    <>
      <div className={`end-of-round-div ${showResult ? "show" : ""}`}>
        <span className='result'>{displayWinner()}</span>
      </div>
    </>
  );
}
