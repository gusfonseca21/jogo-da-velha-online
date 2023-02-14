import { useEffect, useState } from "react";
import { LoginModal, GameBody } from "./components";
import "./styles/App.css";

function App() {
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoginModal(true);
    }, 200);
  }, []);

  return (
    <div className='App'>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <GameBody />
    </div>
  );
}

export default App;
