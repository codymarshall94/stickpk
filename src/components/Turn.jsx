import React, { useEffect, useState } from "react";
import { generatePrompt } from "../utils/generatePrompt";
import Letter from "./Letter";
import "../styles/turn.css";
import Prompt from "./Prompt";
import { motion } from "framer-motion";

const gameLetters = ["S", "T", "I", "C", "K"];

const notifyVariant = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const nextPlayerVariant = {
  hidden: {
    scale: .9,
    color: "#fff",
  },
  visible: {
    scale: 1,
    color: "#fff",
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    scale: 0,
    color: "#fff",
    transition: {
      duration: 0.2,
    },
  },
};

const Turn = ({ players, setPlayers, setWinner, prompts }) => {
  const [challengeSet, setChallengeSet] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [challengeSetter, setChallengeSetter] = useState(true);
  const [challengeAttempts, setChallengeAttemps] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [showPlayer, setShowPlayer] = useState(true);
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  useEffect(() => {
    if (prompts === "true") {
      const newPrompt = generatePrompt();
      setPrompt(newPrompt);
      setShowPrompt(true);
    }
  }, []);

  useEffect(() => {
    if (prompts === "true" && challengeSetter) {
      setPrompt(generatePrompt());
      setShowPrompt(true);
    } else if (prompts === "true" && !challengeSetter) {
      setShowPrompt(false);
      setPrompt("");
    }
  }, [challengeSetter]);

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
    setShowPlayer(false);
    const index = players.findIndex(
      (player) => player.name === currentPlayer.name
    );
    if (index === players.length - 1) {
      setCurrentPlayer(players[0]);
    } else {
      setCurrentPlayer(players[index + 1]);
    }
    setTimeout(() => {
      setShowPlayer(true);
    }, 50);
  };

  const giveLetter = () => {
    setNotify(true);
    setNotifyMessage(`Letter Given to ${currentPlayer.name}`);
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
    setTimeout(() => {
      setNotify(false);
    }, 3000);
    setPlayers(players);
  };

  return (
    <div className="turn-container">
      <motion.div
        className="notify"
        variants={notifyVariant}
        initial="hidden"
        animate={notify ? "visible" : "hidden"}
        exit="exit"
      >
        <p>{notifyMessage}</p>
      </motion.div>
      {showPlayer && (
        <motion.div
          className="turn"
          variants={nextPlayerVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <h1>{currentPlayer.name}'s Turn</h1>
          <div className="turn-letters-container">
            {currentPlayer.letters.map((letter) => (
              <Letter letter={letter} key={letter} size="large" />
            ))}
          </div>
          {showPrompt && <Prompt text={prompt.prompt} />}
          <h2>{challengeSet ? "Attempt" : "Setting Challenge"}</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="turn-btn success"
              onClick={() => handleSuccess(true)}
            >
              <img src={require("../icons/icons8-done-24.png")} alt="yes" />
            </button>
            <button
              className="turn-btn cancel"
              onClick={() => handleSuccess(false)}
            >
              <img src={require("../icons/icons8-close-24.png")} alt="no" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Turn;
