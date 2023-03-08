import "../styles/prompt.css";

const Prompt = ({ text }) => {
  return (
    <div className="prompt-container">
      <h4>{text}</h4>
    </div>
  );
};

export default Prompt;
