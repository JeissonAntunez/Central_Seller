import { useReducer } from "react";
import  type { QuizStatus, QuestionResult } from "../../types/quiz.types";


interface QuizState {
  status: QuizStatus;
  currentIndex: number;
  selectedId: string | null;
  score: number;
  results: QuestionResult[];
}

const initialState: QuizState = {
  status: "idle",
  currentIndex: 0,
  selectedId: null,
  score: 0,
  results: [],
};

type Action =
  | { type: "START" }
  | { type: "SELECT"; payload: { selectedId: string; correctId: string; question: string; questionId: number } }
  | { type: "TIMEOUT"; payload: { correctId: string; question: string; questionId: number } }
  | { type: "NEXT"; payload: { total: number } }
  | { type: "RESET" };

function reducer(state: QuizState, action: Action): QuizState {
  switch (action.type) {
    case "START":
      return { ...initialState, status: "active" };

    case "SELECT": {
      const { selectedId, correctId, question, questionId } = action.payload;
      const correct = selectedId === correctId;
      return {
        ...state,
        status: "answered",
        selectedId,
        score: correct ? state.score + 1 : state.score,
        results: [...state.results, { questionId, question, selectedId, correctId, correct, timedOut: false }],
      };
    }

    case "TIMEOUT": {
      const { correctId, question, questionId } = action.payload;
      return {
        ...state,
        status: "answered",
        selectedId: null,
        score: Math.max(0, state.score - 1),
        results: [...state.results, { questionId, question, selectedId: null, correctId, correct: false, timedOut: true }],
      };
    }

    case "NEXT": {
      const next = state.currentIndex + 1;
      const done = next >= action.payload.total;
      return {
        ...state,
        status: done ? "finished" : "active",
        currentIndex: done ? state.currentIndex : next,
        selectedId: null,
      };
    }

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function useQuizStore() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    start:      ()                                                              => dispatch({ type: "START" }),
    reset:      ()                                                              => dispatch({ type: "RESET" }),
    select:     (selectedId: string, correctId: string, question: string, questionId: number) =>
                  dispatch({ type: "SELECT", payload: { selectedId, correctId, question, questionId } }),
    timeout:    (correctId: string, question: string, questionId: number)       =>
                  dispatch({ type: "TIMEOUT", payload: { correctId, question, questionId } }),
    next:       (total: number)                                                 => dispatch({ type: "NEXT", payload: { total } }),
  };
}