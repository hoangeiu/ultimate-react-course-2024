import { useEffect } from "react";
import { TYPES } from "./App";

export default function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const invervalId = setInterval(() => {
      dispatch({ type: TYPES.TICK });
    }, 1000);
    return () => clearInterval(invervalId);
  }, [dispatch]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}
