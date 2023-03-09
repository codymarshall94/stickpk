import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Players from "../../components/Players";
import "./setup.css";

const questions = [
  {
    questionText: "Who's Playing?",
    subText: "Minimum 2 players",
  },
  {
    questionText: "Would you like to play with prompts?",
    subText: "Movements will be suggested to you",
  },
  {
    questionText: "Are you ready to play?",
    subText: "",
  },
];

const forwardVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, x: 0, transition: { timing: 0.5 } },
  exit: { x: "-100vw", transition: { ease: "easeIn" } },
};

const backwardVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, x: 0, transition: { timing: 0.1 } },
  exit: { x: "100vw", transition: { ease: "easeIn" } },
};

const Setup = ({ players, setPlayers, setPrompts }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRadioChecked, setIsRadioChecked] = useState("false");
  const [variants, setVariants] = useState(forwardVariant);
  const [questionChange, setQuestionChange] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 400);
  }, [questionChange]);

  const handlePrompts = (e) => {
    setIsRadioChecked(e.target.value);
    setPrompts(e.target.value);
  };

  const handleQuestionChange = () => {
    setQuestionChange(!questionChange);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      navigate("/game");
      return;
    }
    setVariants(forwardVariant);
    handleQuestionChange();
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    setVariants(backwardVariant);
    handleQuestionChange();
    setTimeout(() => {
      setCurrentQuestion(currentQuestion - 1);
    }, 400);
  };

  return (
    <div className="setup-container">
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            className="setup-question-container"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1>{questions[currentQuestion].questionText}</h1>
            <p>{questions[currentQuestion].subText}</p>
            {currentQuestion === 0 && (
              <Players players={players} setPlayers={setPlayers} />
            )}
            {currentQuestion === 1 && (
              <div className="radio-btn-container">
                <input
                  type="radio"
                  value="true"
                  name="prompt"
                  checked={isRadioChecked === "true"}
                  onChange={handlePrompts}
                />
                <label>Yes</label>
                <input
                  type="radio"
                  value="false"
                  name="prompt"
                  onChange={handlePrompts}
                  checked={isRadioChecked === "false"}
                />
                <label>No</label>
              </div>
            )}
            <div className="setup-btn-container">
              {currentQuestion === 0 && players.length > 1 && (
                <button className="setup-btn" onClick={handleNext}>
                  Next
                </button>
              )}

              {currentQuestion === 1 && (
                <>
                  <button className="setup-btn" onClick={handleBack}>
                    Back
                  </button>
                  <button className="setup-btn" onClick={handleNext}>
                    Next
                  </button>
                </>
              )}
              {currentQuestion === 2 && (
                <>
                  <button className="setup-btn" onClick={handleBack}>
                    Back
                  </button>
                  <button className="setup-btn" onClick={handleNext}>
                    Lets Go
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Setup;
