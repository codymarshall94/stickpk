const HowToPlay = () => {
  return (
    <div className="how-to-play">
      <h2>How to Play</h2>
      <h3>Objective</h3>
      <p>
        The aim of the game is to successfully execute the most stuck jumps and
        outlast all other players.{" "}
        <br />
      </p>
      <h3>Setup</h3>
      <p>
       Select the number of players and assign each player a name.{" "}
        <br />
        Prompts may be selected during setup to suggest the movement to to be
        done before the jump is stuck.{" "}
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
