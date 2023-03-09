import "./main.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const topDropVariants = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 2,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    opacity: 0,
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
  exit: {
    opacity: 0,
  },
};

const Main = () => {
  return (
    <div className="main-container">
      <motion.h1
        variants={topDropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="main-title"
      >
        Stick
      </motion.h1>
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="main-subtitle"
      >
        <Link className="main-link" to="/setup">
          Start Game
        </Link>
      </motion.div>
    </div>
  );
};

export default Main;
