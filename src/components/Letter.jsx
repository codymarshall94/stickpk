import "../styles/letter.css";

const Letter = ({ letter, size }) => {
  return (
    <div className={`letter-container ${size}`}>
      <span className="letter">{letter}</span>
    </div>
  );
};

export default Letter;