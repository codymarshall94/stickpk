import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/players.css";

const EditablePlayer = ({ player, onEdit, deletePlayer }) => {
  const [name, setName] = useState(player.name);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const newPlayer = { ...player, name: name };
    setIsEditing(false);
    onEdit(newPlayer);
    console.log(newPlayer);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(player.name);
  };

  return (
    <motion.div
      className="player-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isEditing ? (
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="player-input"
          maxLength={10}
        />
      ) : (
        <p className="player-name">{name}</p>
      )}
      <div className="btn-container">
        {isEditing ? (
          <button className="player-btn success" onClick={() => handleSave()}>
            <img src={require("../icons/icons8-done-24.png")} alt="save" />
          </button>
        ) : (
          <>
            <button className="player-btn edit" onClick={handleEdit}>
              <img src={require("../icons/icons8-edit-24.png")} alt="edit" />
            </button>
            <button
              className="player-btn cancel"
              onClick={() => deletePlayer(player)}
            >
              <img src={require("../icons/icons8-close-24.png")} alt="delete" />
            </button>
          </>
        )}
        {isEditing && (
          <button className="player-btn cancel" onClick={handleCancel}>
            <img src={require("../icons/icons8-close-24.png")} alt="cancel" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Players = ({ setPlayers, players }) => {
  const handleDelete = (player) => {
    const newPlayers = players.filter((p) => p.id !== player.id);
    setPlayers(newPlayers);
  };

  const handleAdd = () => {
    const newPlayer = {
      id: players.length + 1,
      name: "Player " + (players.length + 1),
      letters: [],
    };
    setPlayers([...players, newPlayer]);
  };

  const handleEdit = (player) => {
    const newPlayers = players.map((p) => {
      if (p.id === player.id) {
        return player;
      }
      return p;
    });
    setPlayers(newPlayers);
  };

  return (
    <>
      <div className="game-player-container">
        {players.length !== 0 && (
          <AnimatePresence>
            {players.map((player) => (
              <EditablePlayer
                key={player.id}
                player={player}
                onEdit={handleEdit}
                players={players}
                deletePlayer={handleDelete}
              />
            ))}
          </AnimatePresence>
        )}
      </div>
      <button className="add-player-btn" onClick={() => handleAdd()}>
        Add Player +
      </button>
    </>
  );
};

export default Players;
