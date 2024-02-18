import { TYPES } from "./App";

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} question to test your React master</h3>
      <button className="btn" onClick={() => dispatch({ type: TYPES.START })}>
        Let's start
      </button>
    </div>
  );
}
