import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import chevronRight from "@iconify/icons-material-symbols/chevron-right";
import chevronLeft from "@iconify/icons-material-symbols/chevron-left";

import "../styles/LoginModal.css";

import { Avatar } from ".";
import { PlayersContext } from "../context/PlayersConxtext";
import { SocketContext } from "../context/SocketContext";
import ReactAudioPlayer from "react-audio-player";

import loginEnter from "../assets/sounds/success.wav";
import avatarBackward from "../assets/sounds/change-avatar-reverse.mp3";
import avatarForward from "../assets/sounds/change-avatar.mp3";

export default function LoginModal({ loginModal, setLoginModal }) {
  const [avatarForwardAudio, setAvatarForwardAudio] = useState(false);
  const [avatarBackwardAudio, setAvatarBackwardAudio] = useState(false);

  const playersCtx = useContext(PlayersContext);
  const avatars = playersCtx.avatars;

  const socket = useContext(SocketContext);

  const [selectedAvatar, setSelectedAvatar] = useState(
    Math.floor(Math.random() * avatars.length)
  );
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [name, setName] = useState("");

  function changeAvatar(direction) {
    let nextPosition;
    if (direction === -1) {
      nextPosition = selectedAvatar - 1;
      if (nextPosition < 0) nextPosition = avatars.length - 1;
    }
    if (direction === 1) {
      nextPosition = selectedAvatar + 1;
      if (nextPosition > avatars.length - 1) nextPosition = 0;
    }
    setAvatarChanged(true);
    setTimeout(() => {
      setSelectedAvatar(nextPosition);
      setAvatarChanged(false);
    }, 400);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("join", { name, selectedAvatar });
    setLoginModal(false);
  };

  return (
    <>
      {!loginModal && (
        <ReactAudioPlayer volume={0.8} src={loginEnter} autoPlay />
      )}
      <div className={`login-form ${!loginModal && "hide"}`}>
        <h2 className='heading'>Faça seu login e comece a jogar!</h2>
        <div className='card'>
          <div className='avatar'>
            <div className='avatar-choice'>
              <div
                className='arrow-buttons'
                onClick={() => {
                  setAvatarBackwardAudio(true);
                  changeAvatar(-1);
                }}
              >
                <Icon icon={chevronLeft} color='silver' height={80} />
                {avatarBackwardAudio && (
                  <ReactAudioPlayer
                    volume={0.8}
                    src={avatarBackward}
                    autoPlay
                    onEnded={() => setAvatarBackwardAudio(false)}
                  />
                )}
              </div>
              <Avatar
                avatarChanged={avatarChanged}
                selectedAvatar={selectedAvatar}
                login
              />
              <div
                className='arrow-buttons'
                onClick={() => {
                  setAvatarForwardAudio(true);
                  changeAvatar(1);
                }}
              >
                {avatarForwardAudio && (
                  <ReactAudioPlayer
                    volume={0.8}
                    src={avatarForward}
                    autoPlay
                    onEnded={() => setAvatarForwardAudio(false)}
                  />
                )}
                <Icon icon={chevronRight} color='silver' height={80} />
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className='form'>
            <div className='form-divs'>
              <label htmlFor='name'>Nome</label>
              <input
                id='name'
                minLength={2}
                maxLength={15}
                type='text'
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <button type='submit'>Começar</button>
          </form>
        </div>
      </div>
      <div className={`modal ${loginModal && "show"}`}></div>
    </>
  );
}
