import { useState } from "react";
import X from "../assets/images/X.svg";
import O from "../assets/images/O.svg";
import "../styles/GameBoard.css";
import { useContext } from "react";
import { PlayersContext } from "../context/PlayersConxtext";

export default function GameBoard() {
  const [areaInput, setAreaInput] = useState({
    area1: undefined,
    area2: undefined,
    area3: undefined,
    area4: undefined,
    area5: undefined,
    area6: undefined,
    area7: undefined,
    area8: undefined,
    area9: undefined,
  });

  const [areaInputHover, setAreaInputHover] = useState({
    area1: undefined,
    area2: undefined,
    area3: undefined,
    area4: undefined,
    area5: undefined,
    area6: undefined,
    area7: undefined,
    area8: undefined,
    area9: undefined,
  });

  const playersCtx = useContext(PlayersContext);

  const playersPlaying = playersCtx.playersPlaying;
  const playerActive = playersCtx.playerActive;
  const currentPlayerIsPlaying =
    playersCtx.currentPlayer?.id === playerActive?.id;

  const clickOnGridHandler = (gridClassName) => {
    if (!playerActive) return;
    if (!currentPlayerIsPlaying) return;

    let element = gridClassName.target;

    if (element.className.split(" ")[0] === "input-image") {
      while (element && !element.className?.includes("area")) {
        element = element.parentNode;
      }
      updateAreaInput(element.className);
    } else {
      updateAreaInput(element.className);
    }
  };

  const updateAreaInput = (gridClassName, hover) => {
    console.log(gridClassName);

    const grid = gridClassName.replace(/-/g, "");
    if (hover) {
      if (playerActive.id === playersPlaying[0].id)
        setAreaInputHover((prevState) => ({
          ...prevState,
          [grid]: X,
        }));
      if (playerActive.id === playersPlaying[1].id)
        setAreaInputHover((prevState) => ({
          ...prevState,
          [grid]: O,
        }));
    } else {
      if (playerActive.id === playersPlaying[0].id)
        setAreaInput((prevState) => ({
          ...prevState,
          [grid]: X,
        }));
      if (playerActive.id === playersPlaying[1].id)
        setAreaInput((prevState) => ({
          ...prevState,
          [grid]: O,
        }));
    }
  };

  const removeHoverImage = (gridClassName) => {
    const grid = gridClassName.replace(/-/g, "");

    setAreaInputHover((prevState) => ({
      ...prevState,
      [grid]: undefined,
    }));
  };

  return (
    <div className='game-board'>
      <div className='board'>
        <div
          className={`grid-container ${
            !currentPlayerIsPlaying ? "denied" : ""
          }`}
        >
          <div
            className='area-7'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area7) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area7 && areaInputHover.area7 ? "hovering" : ""
              }`}
              src={areaInput.area7 || areaInputHover.area7}
            />
          </div>
          <div
            className='area-8'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area8) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area8 && areaInputHover.area8 ? "hovering" : ""
              }`}
              src={areaInput.area8 || areaInputHover.area8}
            />
          </div>
          <div
            className='area-9'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area9) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area9 && areaInputHover.area9 ? "hovering" : ""
              }`}
              src={areaInput.area9 || areaInputHover.area9}
            />
          </div>
          <div
            className='area-4'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area4) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area4 && areaInputHover.area4 ? "hovering" : ""
              }`}
              src={areaInput.area4 || areaInputHover.area4}
            />
          </div>
          <div
            className='area-5'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area5) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area5 && areaInputHover.area5 ? "hovering" : ""
              }`}
              src={areaInput.area5 || areaInputHover.area5}
            />
          </div>
          <div
            className='area-6'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area6) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area6 && areaInputHover.area6 ? "hovering" : ""
              }`}
              src={areaInput.area6 || areaInputHover.area6}
            />
          </div>
          <div
            className='area-1'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area1) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area1 && areaInputHover.area1 ? "hovering" : ""
              }`}
              src={areaInput.area1 || areaInputHover.area1}
            />
          </div>
          <div
            className='area-2'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area2) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area2 && areaInputHover.area2 ? "hovering" : ""
              }`}
              src={areaInput.area2 || areaInputHover.area2}
            />
          </div>
          <div
            className='area-3'
            onClick={(event) => clickOnGridHandler(event)}
            onMouseEnter={(event) => {
              if (!playerActive && !areaInput.area3) return;
              if (currentPlayerIsPlaying)
                updateAreaInput(event.target.className, true);
            }}
            onMouseLeave={(event) => removeHoverImage(event.target.className)}
          >
            <img
              className={`input-image ${
                !areaInput.area3 && areaInputHover.area3 ? "hovering" : ""
              }`}
              src={areaInput.area3 || areaInputHover.area3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
