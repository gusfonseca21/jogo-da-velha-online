import { useEffect, useState } from "react";
import X from "../assets/images/X.svg";
import O from "../assets/images/O.svg";
import "../styles/GameBoard.css";
import { useContext } from "react";
import ReactAudioPlayer from "react-audio-player";
import { PlayersContext } from "../context/PlayersConxtext";
import { SocketContext } from "../context/SocketContext";

import userInputX from "../assets/sounds/click.wav";
import userInputO from "../assets/sounds/metronome.flac";

const compareTiles = (oldTiles, newTiles) => {
  const diff = [];

  for (const key in oldTiles) {
    if (oldTiles[key] !== newTiles[key]) {
      diff.push(newTiles[key]);
    }
  }

  return diff.length > 0 ? diff[0]?.toString() : null;
};

export default function GameBoard({ showResult }) {
  const [tiles, setTiles] = useState({
    area1: null,
    area2: null,
    area3: null,
    area4: null,
    area5: null,
    area6: null,
    area7: null,
    area8: null,
    area9: null,
  });
  const [inputAudio, setInputAudio] = useState(false);
  const [inputtedAudio, setInputtedAudio] = useState(userInputX);

  const { playersPlaying, activePlayer, currentPlayer } =
    useContext(PlayersContext);

  const socket = useContext(SocketContext);

  const currentPlayerIsPlaying = activePlayer?.id === currentPlayer?.id;

  const onClickTileHandler = (tileKey) => {
    const updatedTiles = { ...tiles };
    const updatedTile = { [tileKey]: currentPlayer.id };

    if (updatedTiles[tileKey]) return;
    updatedTiles[tileKey] = currentPlayer.id;

    if (currentPlayer.id === playersPlaying[0].id) setInputtedAudio(userInputX);
    if (currentPlayer.id === playersPlaying[1].id) setInputtedAudio(userInputO);

    setInputAudio(true);
    setTiles(updatedTiles);

    socket.emit("player_input", updatedTile);
  };

  const onMouseEnterLeaveHandler = (event, handler) => {
    let className;
    if (handler === "enter") {
      if (event.target.children.length) {
        className = `${event.target.children[0].className} hover`;
      }
    }
    if (handler === "leave") {
      className = "input-image";
    }
    if (event.target.children.length) {
      if (event.target.children[0]?.className === "input-image clicked") return;
      event.target.children[0].className = className;
    } else {
      if (event.target.className === "input-image clicked") return;
      event.target.className = className;
    }
  };

  useEffect(() => {
    socket.on("update_tiles", (serverTiles) => {
      const updatedTile = compareTiles(tiles, serverTiles);

      if (updatedTile === playersPlaying[0].id) setInputtedAudio(userInputX);
      if (updatedTile === playersPlaying[1].id) setInputtedAudio(userInputO);

      setInputAudio(true);
      setTiles(serverTiles);
    });
    return function cleanup() {
      socket.removeListener("update_tiles");
    };
  }, [socket, tiles]);

  return (
    <div className='game-board'>
      {inputAudio && (
        <ReactAudioPlayer
          volume={1}
          src={inputtedAudio}
          autoPlay
          onEnded={() => setInputAudio(false)}
        />
      )}
      {currentPlayer && (
        <div className='board'>
          <div
            className={`grid-container ${
              !currentPlayerIsPlaying || !playersPlaying || showResult
                ? "denied"
                : ""
            }`}
          >
            {Object.keys(tiles).map((tileKey) => {
              return (
                <div
                  style={{ height: "10.35rem", width: "10.35rem" }}
                  key={tileKey}
                  className={tileKey}
                  onClick={() => onClickTileHandler(tileKey)}
                  onMouseEnter={(event) =>
                    onMouseEnterLeaveHandler(event, "enter")
                  }
                  onMouseLeave={(event) =>
                    onMouseEnterLeaveHandler(event, "leave")
                  }
                >
                  {playersPlaying && (
                    <img
                      style={{
                        position: "absolute",
                        height: "8rem",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                      className={`input-image ${
                        tiles[tileKey] ? "clicked" : ""
                      }`}
                      src={
                        tiles[tileKey]
                          ? tiles[tileKey] === playersPlaying[0].id
                            ? X
                            : O
                          : activePlayer.id === currentPlayer.id
                          ? currentPlayer.id === playersPlaying[0].id
                            ? X
                            : O
                          : null
                      }
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
