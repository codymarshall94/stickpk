const QuitGame = ({ quitGame }) => {
  return (
    <div className="quit-game">
        <h1>Are you sure you want to quit?</h1>
      <button onClick={quitGame}>Quit Game</button>
    </div>
  );
};