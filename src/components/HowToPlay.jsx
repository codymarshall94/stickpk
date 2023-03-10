const HowToPlay = () => {
  return (
    <div className="how-to-play">
      <h2>How to Play</h2>
      <h3>Objective</h3>
      <p>
        The aim of the game is to successfully execute the most jumps and
        outlast all other players, thereby becoming the last person standing.{" "}
        <br />
      </p>
      <h3>Setup</h3>
      <p>
        Firstly, select the number of players and assign each player a name.{" "}
        <br />
        Prompts may be selected during setup to suggest the movement to do.
      </p>
      <h3>Gameplay</h3>
      <p>
        Each player is designated a role as either the Setter or the Attempter.{" "}
        <br />
        The Setter creates the challenge, and the Attempter must successfully
        complete the challenge to avoid receiving a letter. <br />
      </p>
    </div>
  );
};

export default HowToPlay;
