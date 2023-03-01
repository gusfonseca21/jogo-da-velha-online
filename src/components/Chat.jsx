import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import "../styles/Chat.css";
import { PlayersContext } from "../context/PlayersConxtext";
import TextareaAutosize from "react-textarea-autosize";
import ReactAudioPlayer from "react-audio-player";
import Message from "./Message";
import { SocketContext } from "../context/SocketContext";

import bing from "../assets/sounds/bing.wav";
import pop from "../assets/sounds/pop.wav";
import metronome from "../assets/sounds/metronome.flac";

export default function Chat() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [connectedPlayerAudio, setConnectedPlayerAudio] = useState(false);
  const [disconnectedPlayerAudio, setDisconnectedPlayerAudio] = useState(false);
  const [newMessageAudio, setNewMessageAudio] = useState(false);

  const playersCtx = useContext(PlayersContext);

  const currentPlayer = playersCtx.currentPlayer;

  const socket = useContext(SocketContext);

  const submitNewMessage = (message, senderObj, date = new Date()) => {
    if (message.trim() === "") return;
    setNewMessageAudio(true);
    setMessages((prevState) => [
      { message, sender: senderObj, date },
      ...prevState,
    ]);
    socket.emit("message_sent", {
      sender: senderObj,
      message,
      date,
    });
    setNewMessage("");
  };

  useEffect(() => {
    socket.on("message_received", (serverMessages) => {
      if (serverMessages.message.includes("se conectou")) {
        setConnectedPlayerAudio(true);
      }
      if (serverMessages.message.includes("desconectou")) {
        setDisconnectedPlayerAudio(true);
      }
      if (
        serverMessages.id !== "1" &&
        !serverMessages.message.includes("se conectou") &&
        !serverMessages.message.includes("desconectou")
      )
        setNewMessageAudio(true);

      setMessages((prevState) => [serverMessages, ...prevState]);
    });
    return function cleanup() {
      socket.removeListener("message_received");
    };
  }, [socket]);

  return (
    <div className='chat'>
      {connectedPlayerAudio && (
        <ReactAudioPlayer
          volume={0.5}
          src={bing}
          autoPlay
          onEnded={() => setConnectedPlayerAudio(false)}
        />
      )}
      {disconnectedPlayerAudio && (
        <ReactAudioPlayer
          src={pop}
          volume={0.5}
          autoPlay
          onEnded={() => setDisconnectedPlayerAudio(false)}
        />
      )}
      {/* {newMessageAudio && (
        <ReactAudioPlayer
          volume={0.5}
          src={metronome}
          autoPlay
          onEnded={() => setNewMessageAudio(false)}
        />
      )} */}
      <div className='messages'>
        {messages.map((message) => (
          <Message
            key={Math.random()}
            message={message}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
      <form onSubmit={() => submitNewMessage(newMessage, currentPlayer)}>
        <div className='chat-input'>
          <TextareaAutosize
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                submitNewMessage(newMessage, currentPlayer);
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
            onClick={() => submitNewMessage(newMessage, currentPlayer)}
          />
        </div>
      </form>
    </div>
  );
}
