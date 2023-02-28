import "../styles/ScoreBoard.css";
import { Avatar } from ".";

export default function ScoreBoard({ playersPlaying, activePlayer }) {
  return (
    <div className='score-board'>
      {playersPlaying.map((playerPlaying, index) => {
        const playerNumber = index + 1;
        return (
          <div key={playerPlaying.id} className='players-score'>
            <div className='name-avatar'>
              <Avatar
                selectedAvatar={playerPlaying.selectedAvatar}
                scoreboard
              />
              <div className='name-div'>
                <span
                  className={`active-player-dot ${
                    activePlayer.id === playerPlaying.id ? "show" : ""
                  }`}
                >
                  &#x2022;
                </span>
                <span>
                  {`${playerPlaying.name} (${playerNumber === 1 ? "X" : "O"})`}
                </span>
              </div>
            </div>
            <span>{`Pontos: ${playerPlaying.roundScore}`}</span>
          </div>
        );
      })}
    </div>
  );
}
