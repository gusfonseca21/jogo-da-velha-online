import Avatar from "./Avatar";

export default function PlayersList({ players }) {
  return (
    <div className='players-list'>
      {players.map((player) => (
        <div key={player.id} className='player'>
          <Avatar list selectedAvatar={player.selectedAvatar} />
          <span>{player.name}</span>
        </div>
      ))}
    </div>
  );
}
