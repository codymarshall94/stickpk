import React, { useEffect, useState } from "react";
import Turn from "../../components/Turn";
import "./game.css";
import { AnimatePresence } from "framer-motion";
import Modal from "../../components/Modal";
import Winner from "../../components/Winner";
import PlayerDisplay from "../../components/PlayerDisplay";

const Game = ({ players, setPlayers }) => {
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
  };

  return (
    <div className="game-container">
      <div>
        <Turn players={players} setPlayers={setPlayers} setWinner={setWinner} />
      </div>
      <button
        className="score-btn player-btn primary"
        style={{ margin: "0 auto" }}
        onClick={() => setModalOpen(true)}
      >
        <img src={require("../../icons/icons8-scorecard-24.png")} alt="score" />
      </button>
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
