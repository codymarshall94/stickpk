import React, { useEffect, useState } from "react";
import Letter from "./Letter";
import "../styles/turn.css";

const gameLetters = ["S", "T", "I", "C", "K"];

const Turn = ({ players, setPlayers, setWinner }) => {
  const [challengeSet, setChallengeSet] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [challengeSetter, setChallengeSetter] = useState(true);
  const [challengeAttempts, setChallengeAttemps] = useState(0);

  useEffect(() => {
    if (challengeAttempts === players.length - 1) {
      setChallengeAttemps(0);
      setChallengeSet(false);
      setChallengeSetter(true);
      nextPlayer();
    }
  }, [challengeAttempts]);

  const handleSuccess = (value) => {
    if (challengeSetter && value) {
      setChallengeSet(value);
      setChallengeSetter(false);
    } else if (!challengeSetter) {
      setChallengeAttemps(challengeAttempts + 1);
      if (!value) {
        giveLetter();
      }
    }
    nextPlayer();
  };

  const handlePlayerOut = () => {
    const index = players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    players.splice(index, 1);
    setPlayers(players);
    nextPlayer();

    if (players.length === 1) {
      setWinner(true);
    }
  };

  const nextPlayer = () => {
    const index = players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    if (index === players.length - 1) {
      setCurrentPlayer(players[0]);
    } else {
      setCurrentPlayer(players[index + 1]);
    }
  };

  const giveLetter = () => {
    if (currentPlayer.letters.length === 5) return;
    const currentLetters = currentPlayer.letters;
    switch (currentLetters.length) {
      case 0:
        currentLetters.push(gameLetters[0]);
        break;
      case 1:
        currentLetters.push(gameLetters[1]);
        break;
      case 2:
        currentLetters.push(gameLetters[2]);
        break;
      case 3:
        currentLetters.push(gameLetters[3]);
        break;
      case 4:
        currentLetters.push(gameLetters[4]);
        break;
      default:
        break;
    }
    if (currentLetters.length === 5) {
      handlePlayerOut();
    }
    setPlayers(players);
  };

  return (
    <div className="turn-container">
      <h1>{currentPlayer.name}'s Turn</h1>
      <div className="letters-container">
        {currentPlayer.letters.map((letter) => (
          <Letter letter={letter} key={letter} size="large" />
        ))}
      </div>
      <h2>{challengeSet ? "Attempt" : "Setting Challenge"}</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="player-btn success"
          onClick={() => handleSuccess(true)}
        >
          <img src={require("../icons/icons8-done-24.png")} alt="yes" />
        </button>
        <button
          className="player-btn cancel"
          onClick={() => handleSuccess(false)}
        >
          <img src={require("../icons/icons8-close-24.png")} alt="no" />
        </button>
      </div>
    </div>
  );
};

export default Turn;
