import "../styles/letter.css";

const Letter = ({ letter, size }) => {
  return (
    <div className={`letter-container ${size}`}>
      <h1 className="letter">{letter}</h1>
    </div>
  );
};

export default Letter;