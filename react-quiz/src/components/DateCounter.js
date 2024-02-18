import { useReducer, useState } from "react";

const TYPES = {
  DECREASE: "DECREASE",
  INCREASE: "INCREASE",
  SET_COUNT: "SET_COUNT",
  SET_STEP: "SET_STEP",
  RESET: "RESET",
};

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case TYPES.INCREASE:
      return { ...state, count: state.count + state.step };

    case TYPES.DECREASE:
      return { ...state, count: state.count - state.step };

    case TYPES.SET_COUNT:
      return { ...state, count: action.payload };

    case TYPES.SET_STEP:
      return { ...state, step: action.payload };

    case TYPES.RESET:
      return initialState;

    default:
      return state;
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: TYPES.DECREASE });
  };

  const inc = function () {
    dispatch({ type: TYPES.INCREASE });
  };

  const defineCount = function (e) {
    dispatch({ type: TYPES.SET_COUNT, payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: TYPES.SET_STEP, payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: TYPES.RESET });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
