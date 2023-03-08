import Confetti from "./Confetti";

const Winner = ({ players }) => {
  const winner = players[0];
  return (
    <div className="winner">
      <Confetti />
      <h1>{winner.name} Wins</h1>
    </div>
  );
};

export default Winner;
