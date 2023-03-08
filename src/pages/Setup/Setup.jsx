import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Players from "../../components/Players";
import "./setup.css";

const questions = [
  {
    questionText: "Who's Playing?",
  },
  {
    questionText: "Would you like to play with prompts?",
  },
  {
    questionText: "Are you ready to play?",
  },
];

const Setup = ({ players, setPlayers, setPrompts }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRadioChecked, setIsRadioChecked] = useState("false");
  const navigate = useNavigate();

  const handlePrompts = (e) => {
    setIsRadioChecked(e.target.value);
    setPrompts(e.target.value);
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      navigate("/game");
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = () => {
    if (currentQuestion === 0) return;
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className="setup-container">
      <h1>{questions[currentQuestion].questionText}</h1>
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
    </div>
  );
};

export default Setup;
