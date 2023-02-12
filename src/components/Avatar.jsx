import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import "../styles/Avatar.css";

export default function Avatar({
  avatarChanged,
  selectedAvatar,
  login,
  scoreboard,
  list,
}) {
  const playersCtx = useContext(PlayersContext);
  const { avatars } = playersCtx;

  return (
    <div
      className={`avatar-image-div ${login && "login"} ${
        scoreboard && "scoreboard"
      }  ${list && "list"} `}
    >
      <img
        className={`avatar-image ${avatarChanged && "transition"}`}
        src={avatars[selectedAvatar]}
      />
    </div>
  );
}
