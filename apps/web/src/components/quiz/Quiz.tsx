import { quizData } from "../../data/quiz.data";
import { useQuizStore } from "../store/useQuizStore";
import { StartScreen } from "./StartScreen";
import { QuestionCard } from "./QuestionCard";
import { ResultsScreen } from "./ResultsScreen";
import { globalCSS } from "../../styles/tokens";

export function Quiz() {
  const { state, start, reset, select, timeout, next } = useQuizStore();
  const { status, currentIndex, selectedId, score, results } = state;
  const { questions, title, description, totalTime } = quizData;
  const current = questions[currentIndex];

  return (
    <>
      <style>{globalCSS}</style>

      {status === "idle" && (
        <StartScreen
          title={title}
          description={description}
          totalQuestions={questions.length}
          timePerQuestion={totalTime}
          onStart={start}
        />
      )}

      {(status === "active" || status === "answered") && (
        <QuestionCard
          key={current.id}
          question={current}
          questionNumber={currentIndex + 1}
          total={questions.length}
          score={score}
          selectedId={selectedId}
          answered={status === "answered"}
          timePerQuestion={totalTime}
          onSelect={(id) => select(id, current.correctId, current.question, current.id)}
          onTimeout={() => timeout(current.correctId, current.question, current.id)}
          onNext={() => next(questions.length)}
        />
      )}

      {status === "finished" && (
        <ResultsScreen
          score={score}
          total={questions.length}
          results={results}
          onReset={reset}
        />
      )}
    </>
  );
}