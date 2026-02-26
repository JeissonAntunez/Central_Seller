export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
  correctId: string;
  explanation: string;
}

export type QuizStatus = "idle" | "active" | "answered" | "finished";

export interface QuestionResult {
  questionId: number;
  question: string;
  selectedId: string | null;
  correctId: string;
  correct: boolean;
  timedOut: boolean;
}