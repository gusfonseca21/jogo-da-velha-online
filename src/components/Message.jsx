import "../styles/Message.css";

export default function Message({ message, currentPlayer }) {
  if (message.sender.id !== currentPlayer.id) {
    return (
      <div style={{ backgroundColor: "grey" }}>
        <h4 color='white'>{message.sender.name}</h4>
        <span color='white'>{message.message}</span>
      </div>
    );
  }
  return (
    <div className='your-message'>
      <span>{message.message}</span>
      <div className='arrow' />
    </div>
  );
}
