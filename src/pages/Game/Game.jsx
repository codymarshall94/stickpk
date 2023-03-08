import React, { useEffect, useState } from "react";
import Turn from "../../components/Turn";
import "./game.css";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import Winner from "../../components/Winner";
import PlayerDisplay from "../../components/PlayerDisplay";
import { Link } from "react-router-dom";

const Game = ({ players, setPlayers, prompts, setPrompts }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [winner, setWinner] = useState(false);

  useEffect(() => {
    if (winner) setModalOpen(true);
  }, [winner]);

  const resetGame = () => {
    const localPlayers = JSON.parse(localStorage.getItem("players"));
    localPlayers.forEach((player) => {
      player.letters = [];
    });
    setPlayers(localPlayers);
    setModalOpen(false);
    setWinner(false);
    setPrompts(false);
  };

  return (
    <div className="game-container">
      <div>
        <Turn
          players={players}
          setPlayers={setPlayers}
          setWinner={setWinner}
          prompts={prompts}
        />
      </div>
      <div className="game-btn-container">
        <button
          className="game-btn player-btn primary"
          onClick={() => setModalOpen(true)}
        >
          <img
            src={require("../../icons/icons8-scorecard-24.png")}
            alt="score"
          />
        </button>
        <Link
          to="/"
          className="game-btn player-btn cancel"
          onClick={() => resetGame()}
        >
          <img
            src={require("../../icons/icons8-logout-rounded-left-24.png")}
            alt="exit game"
          />
        </Link>
      </div>
      <AnimatePresence initial={false} mode="out-in">
        {modalOpen && (
          <Modal
            key="modal"
            closeModal={() => setModalOpen(false)}
            players={players}
            setPlayers={setPlayers}
            winner={winner}
            reset={resetGame}
            children={
              winner ? (
                <Winner players={players} />
              ) : (
                <PlayerDisplay players={players} />
              )
            }
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Game;
