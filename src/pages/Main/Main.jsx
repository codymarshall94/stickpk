import { Link } from "react-router-dom";
import "./main.css";

const Main = () => {
  return (
    <div className="main-container">
      <h1 className="main-title">Stick</h1>
      <Link className="main-link" to="/setup">Start Game</Link>
    </div>
  );
};

export default Main;
