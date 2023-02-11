import { useContext } from "react";
import "../styles/GameBoard.css";
import { PlayersContext } from "../context/PlayersConxtext";

export default function GameBoard() {
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.playersData;

  return (
    <div className='game-board'>
      <div className='score'>
        {players.map((player, index) => {
          if (index > 1) return;
          return (
            <div key={player.id} className='players-score'>
              <h3>{`${player.name} - ${index + 1 === 1 ? "X" : "O"}`}</h3>
              <h3>0</h3>
            </div>
          );
        })}
      </div>
      <div className='board'>
        <div className='grid-container'>
          <div className='area-1'></div>
          <div className='area-2'></div>
          <div className='area-3'></div>
          <div className='area-4'></div>
          <div className='area-5'></div>
          <div className='area-6'></div>
          <div className='area-7'></div>
          <div className='area-8'></div>
          <div className='area-9'></div>
        </div>
      </div>
    </div>
  );
}
