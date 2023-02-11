import Chat from "./components/Chat";
import GameBoard from "./components/GameBoard";
import LoginModal from "./components/LoginModal";
import "./styles/App.css";

function App() {
  return (
    <div className='App'>
      <LoginModal />
      <GameBoard />
      <Chat />
    </div>
  );
}

export default App;
