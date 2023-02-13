import "../styles/ScoreBoard.css";
import { Avatar } from ".";

export default function ScoreBoard({ players }) {
  return (
    <div className='score-board'>
      {players.map((player, index) => {
        if (index > 1) return;
        const playerNumber = index + 1;
        return (
          <div key={player.id} className='players-score'>
            <div className='name-avatar'>
              <Avatar selectedAvatar={player.selectedAvatar} scoreboard />
              <span>{`${player.name} (${
                playerNumber === 1 ? "X" : "O"
              })`}</span>
            </div>
            <span>0</span>
          </div>
        );
      })}
    </div>
  );
}
