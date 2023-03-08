import Letter from "./Letter";

const PlayerDisplay = ({ players }) => {
  return (
    <>
      {players.map((player) => (
        <div className="player-container" key={player.id}>
          <p className="player-name">{player.name}</p>
          <div className="letters-container">
            {player.letters.map((letter) => (
              <Letter key={letter.id} letter={letter} size="small" />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PlayerDisplay;
