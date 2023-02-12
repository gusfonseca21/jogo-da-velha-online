import { useEffect, useState } from "react";
import { LoginModal, GameBody } from "./components";
import "./styles/App.css";
import { socket } from "./socket";

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [showGameBoard, setShowGameBoard] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoginModal(true);
    }, 200);
  }, []);

  socket.on("update_players_list", () => {
    setShowGameBoard(true);
  });

  return (
    <div className='App'>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      {showGameBoard && <GameBody />}
    </div>
  );
}

export default App;
