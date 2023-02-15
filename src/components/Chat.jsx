import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import "../styles/Chat.css";
import { PlayersContext } from "../context/PlayersConxtext";
import TextareaAutosize from "react-textarea-autosize";
import Message from "./Message";
import { SocketContext } from "../context/SocketContext";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const playersCtx = useContext(PlayersContext);

  const currentPlayer = playersCtx.currentPlayer;

  const socket = useContext(SocketContext);

  const submitNewMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages((prevState) => [
      { message: newMessage, sender: currentPlayer, date: new Date() },
      ...prevState,
    ]);
    socket.emit("message_sent", {
      sender: currentPlayer,
      message: newMessage,
      date: new Date(),
    });
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("message_received", (serverMessages) => {
      setMessages((prevState) => [serverMessages, ...prevState]);
    });
    return function cleanup() {
      socket.removeListener("message_received");
    };
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
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitNewMessage();
              }
            }}
            minRows={1}
            maxRows={3}
            className='input'
            placeholder='Mensagem'
            type='text'
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <FontAwesomeIcon
            icon={faPaperPlane}
            className='send-icon'
            onClick={submitNewMessage}
          />
        </div>
      </form>
    </div>
  );
}
