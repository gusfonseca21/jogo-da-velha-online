import Avatar from "./Avatar";
import "../styles/PlayersList.css";
import crowIcon from "../assets/icons/crown.svg";

export default function PlayersList({ players }) {
  return (
    <div className='players-list'>
      {players?.map((player) => (
        <div key={player.id} className='player-list'>
          <Avatar list selectedAvatar={player.selectedAvatar} />
          <div className='name-div-list'>
            <span className='player-name'>{player.name}</span>
            {[...Array(player.gameScore)].map((_, index) => (
              <img key={index} src={crowIcon} width={30} alt='Coroa' />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
