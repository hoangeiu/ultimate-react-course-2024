import { TYPES } from "./App";

export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;

  return (
    <>
      <p className="result">
        <span>💯</span>
        You scored <strong>{points}</strong> out of {totalPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: TYPES.RESTART })}
      >
        Restart quiz
      </button>
    </>
  );
}
