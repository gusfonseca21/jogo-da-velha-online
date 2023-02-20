import { useEffect, useState } from "react";
import X from "../assets/images/X.svg";
import O from "../assets/images/O.svg";
import "../styles/GameBoard.css";
import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";
import { SocketContext } from "../context/SocketContext";

export default function GameBoard() {
  const [tiles, setTiles] = useState([
    { className: "area1", player: null, hovering: null },
    { className: "area2", player: null, hovering: null },
    { className: "area3", player: null, hovering: null },
    { className: "area4", player: null, hovering: null },
    { className: "area5", player: null, hovering: null },
    { className: "area6", player: null, hovering: null },
    { className: "area7", player: null, hovering: null },
    { className: "area8", player: null, hovering: null },
    { className: "area9", player: null, hovering: null },
  ]);

  const { playersPlaying, playerActive, currentPlayer } =
    useContext(PlayersContext);

  console.log(playerActive);

  const socket = useContext(SocketContext);

  const currentPlayerIsPlaying = playerActive?.id === currentPlayer?.id;

  const onClickTileHandler = (event) => {
    let clickedTile = event.target.className;

    if (clickedTile === "input-image hovering") {
      clickedTile = event.target.parentElement.className;
    }

    setTiles((prevState) => {
      return prevState.map((tile) => {
        if (tile.className === clickedTile) {
          return {
            ...tile,
            player: currentPlayer.id,
          };
        } else {
          return tile;
        }
      });
    });

    socket.emit("player_input", {
      player: currentPlayer.id,
      area: clickedTile,
    });
  };

  const onMouseEnterHandler = (event) => {
    if (playersPlaying && playerActive.id === currentPlayer.id) {
      const hoveredTile = event.target.className;

      const playerInput = currentPlayer.id === playersPlaying[0].id ? X : O;

      setTiles((prevState) => {
        return prevState.map((tile) => {
          if (tile.className === hoveredTile) {
            return {
              ...tile,
              hovering: playerInput,
            };
          } else {
            return tile;
          }
        });
      });
    }
  };

  const onMouseLeaveHandler = () => {
    if (playerActive?.id === currentPlayer?.id) {
      setTiles((prevState) => {
        return prevState.map((tile) => {
          return {
            ...tile,
            hovering: null,
          };
        });
      });
    }
  };

  useEffect(() => {
    socket.on("update_tiles", (serverTiles) => {
      const transformedServerTiles = serverTiles.map((serverTile) => {
        return {
          className: serverTile.area,
          player: serverTile.player,
        };
      });
      setTiles((prevState) => {
        return transformedServerTiles.map((serverTile) => {
          const prevStateTiles = prevState.find(
            (tile) => tile.className === serverTile.className
          );
          return { ...serverTile, prevStateTiles };
        });
      });
    });
    return function cleanup() {
      socket.removeListener("update_tiles");
    };
  }, [socket]);

  return (
    <div className='game-board'>
      <div className='board'>
        <div
          className={`grid-container ${
            !currentPlayerIsPlaying || !playersPlaying ? "denied" : ""
          }`}
        >
          {tiles.map((tile) => {
            return (
              <div
                key={tile.className}
                className={tile.className}
                onClick={(event) => onClickTileHandler(event)}
                onMouseEnter={(event) => onMouseEnterHandler(event)}
                onMouseLeave={onMouseLeaveHandler}
              >
                {tile.player && (
                  <img
                    className={`input-image`}
                    src={tile.player === playersPlaying[0].id ? X : O}
                  />
                )}
                {!tile.player && (
                  <img className='input-image hovering' src={tile.hovering} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
