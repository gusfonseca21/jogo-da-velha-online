import "../styles/ScoreBoard.css";
import { Avatar } from ".";

export default function ScoreBoard({ playersPlaying }) {
  return (
    <div className='score-board'>
      {playersPlaying.map((playerPlaying, index) => {
        console.log(playerPlaying);
        const playerNumber = index + 1;
        return (
          <div key={playerPlaying.id} className='players-score'>
            <div className='name-avatar'>
              <Avatar
                selectedAvatar={playerPlaying.selectedAvatar}
                scoreboard
              />
              <span>{`${playerPlaying.name} (${
                playerNumber === 1 ? "X" : "O"
              })`}</span>
            </div>
            <span>{playerPlaying.roundScore}</span>
          </div>
        );
      })}
    </div>
  );
}
