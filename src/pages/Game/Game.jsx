import React, { useEffect, useState } from "react";
import Turn from "../../components/Turn";
import "./game.css";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../../components/Modal";
import Winner from "../../components/Winner";
import PlayerDisplay from "../../components/PlayerDisplay";
import { Link, useNavigate } from "react-router-dom";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
};

const Game = ({ players, setPlayers, prompts, setPrompts, loading }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [winner, setWinner] = useState(false);
  const navigate = useNavigate();

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
    navigate("/");
  };

  if (loading) return <h1>Loading...</h1>;
  return (
    <AnimatePresence mode="out-in">
      <motion.div
        className="game-container"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div>
          <Turn
            players={players}
            setPlayers={setPlayers}
            setWinner={setWinner}
            prompts={prompts}
          />
        </div>
        <div className="game-btn-container">
          <Link to="/" className="game-btn cancel" onClick={() => resetGame()}>
            <img
              src={require("../../icons/icons8-logout-rounded-left-24.png")}
              alt="exit game"
            />
          </Link>
          <button
            className="game-btn primary"
            onClick={() => setModalOpen(true)}
          >
            <img
              src={require("../../icons/icons8-scorecard-24.png")}
              alt="score"
            />
          </button>
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Game;
