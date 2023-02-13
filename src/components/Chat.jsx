import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import "../styles/Chat.css";
import { socket } from "../socket";
import { PlayersContext } from "../context/PlayersConxtext";
import TextareaAutosize from "react-textarea-autosize";
import Message from "./Message";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const playersCtx = useContext(PlayersContext);

  const currentPlayer = playersCtx.currentPlayer;

  const submitNewMessage = (event) => {
    event.preventDefault();
    setMessages((prevState) => [
      ...prevState,
      { message: newMessage, sender: currentPlayer },
    ]);
    socket.emit("message_sent", { sender: currentPlayer, message: newMessage });
    setNewMessage("");
  };

  useState(() => {
    socket.on("message_received", (serverMessages) => {
      setMessages((prevState) => [...prevState, serverMessages]);
    });
  }, [socket]);

  return (
    <div className='chat'>
      <div className='messages'>
        {messages.map((message) => (
          <Message
            key={Math.random()}
            message={message}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
      <form onSubmit={submitNewMessage}>
        <div className='chat-input'>
          <TextareaAutosize
            minRows={1}
            maxRows={3}
            className='input'
            placeholder='Mensagem'
            type='text'
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <FontAwesomeIcon icon={faPaperPlane} className='send-icon' />
        </div>
      </form>
    </div>
  );
}
