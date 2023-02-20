import { useState } from "react";
import { LoginModal, GameBody } from "./components";
import "./styles/App.css";

function App() {
  const [loginModal, setLoginModal] = useState(true);

  return (
    <div className='App'>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      {!loginModal && <GameBody />}
    </div>
  );
}

export default App;
