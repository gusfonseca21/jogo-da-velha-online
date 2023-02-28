import { useEffect, useState } from "react";
import X from "../assets/images/X.svg";
import O from "../assets/images/O.svg";
import "../styles/GameBoard.css";
import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { SocketContext } from "../context/SocketContext";

// CONTINUAR COM AS CONDIÇÕES DE SAÍDA DE JOGADORES DA PARTIDA

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

  const { playersPlaying, activePlayer, currentPlayer } =
    useContext(PlayersContext);

  const socket = useContext(SocketContext);

  const currentPlayerIsPlaying = activePlayer?.id === currentPlayer?.id;

  const onClickTileHandler = (tileKey) => {
    const updatedTiles = { ...tiles };
    const updatedTile = { [tileKey]: currentPlayer.id };

    if (updatedTiles[tileKey]) return;

    updatedTiles[tileKey] = currentPlayer.id;
    setTiles(updatedTiles);

    socket.emit("player_input", updatedTile);
  };

  const onMouseEnterLeaveHandler = (event, handler) => {
    let className;
    if (handler === "enter") {
      className = `${event.target.children[0]?.className} hover`;
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
      setTiles(serverTiles);
    });
    return function cleanup() {
      socket.removeListener("update_tiles");
    };
  }, [socket]);

  return (
    <div className='game-board'>
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
