import { useEffect, useState } from "react";
import chevronRight from "../assets/icons/chevron-right.png";
import chevronLeft from "../assets/icons/chevron-left.png";
import { mao, stalin, ho, kim, khaled, rosa } from "../assets/images/avatars";

import "../styles/LoginModal.css";

import { socket } from "../socket";

const avatars = [mao, stalin, ho, kim, khaled, rosa];

export default function LoginModal() {
  const [loginModal, setLoginModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(
    Math.floor(Math.random() * avatars.length)
  );
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLoginModal(true);
    }, 200);
  }, []);

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
      <div className={`login-form ${loginModal && "show"}`}>
        <h2 className='heading'>Faça seu login e comece a jogar!</h2>
        <div className='card'>
          <div className='avatar'>
            <div className='avatar-choice'>
              <div className='arrow-buttons' onClick={() => changeAvatar(-1)}>
                <img src={chevronLeft} height={80} width={80} />
              </div>
              <div className='avatar-image-div'>
                <img
                  className={`avatar-image  ${avatarChanged && "transition"}`}
                  src={avatars[selectedAvatar]}
                />
              </div>
              <div className='arrow-buttons' onClick={() => changeAvatar(1)}>
                <img src={chevronRight} height={80} width={80} />
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
