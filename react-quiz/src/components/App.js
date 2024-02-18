import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import { SECONDS_PER_QUESTION, STATUS } from "../common/constants";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: STATUS.LOADING,
  index: 14,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

export const TYPES = {
  DATA_RECEIVED: "dataReceived",
  DATA_FAILED: "dataFailed",
  START: "start",
  NEW_ANSWER: "newAnswer",
  NEXT_QUESTION: "nextQuestion",
  FINISH: "finish",
  RESTART: "restart",
  TICK: "tick",
};

function reducer(state, action) {
  switch (action.type) {
    case TYPES.DATA_RECEIVED:
      return { ...state, questions: action.payload, status: STATUS.READY };

    case TYPES.DATA_FAILED:
      return { ...state, status: STATUS.ERROR };

    case TYPES.START:
      return {
        ...state,
        status: STATUS.ACTIVE,
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case TYPES.NEW_ANSWER:
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case TYPES.NEXT_QUESTION:
      return { ...state, index: state.index + 1, answer: null };

    case TYPES.FINISH:
      return {
        ...state,
        status: STATUS.FINISHED,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };

    case TYPES.RESTART:
      return {
        ...initialState,
        questions: state.questions,
        status: STATUS.READY,
        highScore: state.highScore,
      };

    case TYPES.TICK: {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? STATUS.FINISHED : state.status,
      };
    }

    default:
      break;
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, currentQuestion) => acc + currentQuestion.points,
    0
  );

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: TYPES.DATA_RECEIVED, payload: data });
      } catch (error) {
        dispatch({ type: TYPES.DATA_FAILED });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === STATUS.LOADING && <Loader />}
        {status === STATUS.ERROR && <Error />}
        {status === STATUS.READY && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === STATUS.ACTIVE && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              />
            </Footer>
          </>
        )}
        {status === STATUS.FINISHED && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
