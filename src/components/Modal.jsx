import { motion } from "framer-motion";
import React from "react";
import "../styles/modal.css";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Backdrop = ({ onClick, children }) => {
  return (
    <motion.div
      className="backdrop"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

const Modal = ({ onClose, closeModal, children, winner, reset }) => {
  return (
    <Backdrop onClick={onClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h1>Scoreboard</h1>
        {children}
        {!winner ? (
          <button className="modal-btn" onClick={() => closeModal()}>
            Close
          </button>
        ) : (
          <button className="modal-btn" onClick={() => reset()}>Play Again</button>
        )}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
