export default function ActivePlayerSpan({
  players,
  currentPlayer,
  playerActive,
}) {
  return (
    <span className='playing'>{`${
      players.length < 2
        ? "Aguardando jogadores"
        : currentPlayer?.id === playerActive?.id
        ? "Sua vez"
        : "Vez de " + playerActive?.name
    } `}</span>
  );
}
