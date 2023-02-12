import "../styles/GameBoard.css";

export default function GameBoard() {
  return (
    <div className='game-board'>
      <div className='board'>
        <div className='grid-container'>
          <div className='area-1'></div>
          <div className='area-2'></div>
          <div className='area-3'></div>
          <div className='area-4'></div>
          <div className='area-5'></div>
          <div className='area-6'></div>
          <div className='area-7'></div>
          <div className='area-8'></div>
          <div className='area-9'></div>
        </div>
      </div>
    </div>
  );
}
