import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { GameBoard, ScoreBoard, Chat, Avatar } from ".";
import "../styles/GameBody.css";

export default function GameBody() {
  const playersCtx = useContext(PlayersContext);
  const players = playersCtx.playersData;
  console.log(players);
  return (
    <div className='body'>
      <div className='players-list'>
        {players.map((player) => (
          <div key={player.id} className='player'>
            <Avatar list selectedAvatar={player.selectedAvatar} />
            <span>{player.name}</span>
          </div>
        ))}
      </div>
      <div className='center'>
        <ScoreBoard players={players} />
        <GameBoard />
      </div>
      <Chat />
    </div>
  );
}
