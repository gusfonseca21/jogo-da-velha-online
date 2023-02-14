import "../styles/Message.css";
import Avatar from "./Avatar";

export default function Message({ message, currentPlayer }) {
  console.log(message);
  if (message.sender.id !== currentPlayer.id) {
    return (
      <div className='other-players-message'>
        <div className='meassage-header'>
          <Avatar chat selectedAvatar={message.sender.selectedAvatar} />
          <p>{message.sender.name}</p>
        </div>
        <div className='other-message-body'>
          <p>{message.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className='your-message'>
      <p>{message.message}</p>
      <div className='arrow' />
    </div>
  );
}
