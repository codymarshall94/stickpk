import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiDisplay = () => {
  const [confetti, setConfetti] = useState(false);
  const { width, height } = window.screen;

  useEffect(() => {
    setConfetti(true);
  }, []);

  return (
    <>
      {confetti && (
        <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />
      )}
    </>
  );
};

export default ConfettiDisplay;
