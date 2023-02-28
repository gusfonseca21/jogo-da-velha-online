import { useContext, useEffect, useState } from "react";
import "../styles/EndOfRound.css";
import { SocketContext } from "../context/SocketContext";
import { PlayersContext } from "../context/PlayersConxtext";

export default function EndOfRound({ showResult, setShowResult }) {
  const [result, setResult] = useState(null);

  const socket = useContext(SocketContext);

  const { playersPlaying, currentPlayer } = useContext(PlayersContext);

  const displayWinner = () => {
    if (result) {
      if (result.isDraw) return "EMPATE";
      else {
        const winner = playersPlaying.filter(
          (playerPlaying) => playerPlaying.id === result.winner
        )[0];

        let victoryString;

        if (result.gameWinner) {
          if (winner.id !== currentPlayer.id)
            victoryString = `${winner.name} venceu o jogo!`;
          if (winner.id === currentPlayer.id)
            victoryString = "Você venceu o jogo!";
        } else {
          if (winner.id !== currentPlayer.id)
            victoryString = `${winner.name} venceu a rodada!`;
          if (winner.id === currentPlayer.id)
            victoryString = "Você venceu a rodada!";
        }

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
