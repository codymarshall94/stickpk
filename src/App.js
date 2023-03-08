import Main from "./pages/Main/Main";
import Setup from "./pages/Setup/Setup";
import { Routes, Route } from "react-router-dom";
import Game from "./pages/Game/Game";
import { useEffect, useState } from "react";

function App() {
  const [players, setPlayers] = useState([]);
  const [prompts, setPrompts] = useState(false);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  useEffect(() => {
    const localPlayers = JSON.parse(localStorage.getItem("players"));
    if (localPlayers) {
      setPlayers(localPlayers);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/setup"
          element={
            <Setup
              players={players}
              setPlayers={setPlayers}
              setPrompts={setPrompts}
            />
          }
        />
        <Route
          path="/game"
          element={
            <Game players={players} setPlayers={setPlayers} prompts={prompts} setPrompts={setPrompts}/>
          }
        />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;
