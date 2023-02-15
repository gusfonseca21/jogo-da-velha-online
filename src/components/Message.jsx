import "../styles/Message.css";
import Avatar from "./Avatar";
import { format } from "date-fns";

export default function Message({ message, currentPlayer }) {
  if (message.sender.id !== currentPlayer.id) {
    return (
      <div className='other-players-message'>
        <div className='meassage-header'>
          <Avatar chat selectedAvatar={message.sender.selectedAvatar} />
          <p>{message.sender.name}</p>
        </div>
        <div className='other-players-message-body'>
          <p>{message.message}</p>
        </div>
        <span className='date'>
          {format(new Date(message.date), "HH:mm:ss")}
        </span>
      </div>
    );
  }
  return (
    <div className='your-message'>
      <p>{message.message}</p>
      <div className='arrow' />
      <span className='date'>{format(new Date(message.date), "HH:mm:ss")}</span>
    </div>
  );
}
