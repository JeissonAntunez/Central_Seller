// import type React, type { CSSProperties } from "react";
import type { CSSProperties } from "react";

import type { QuizQuestion } from "../../types/quiz.types";
import { useTimer } from "../../hooks/useTimer";
import { questionStyles, layoutStyles, tokens } from "../../styles/tokens";

interface Props {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  score: number;
  selectedId: string | null;
  answered: boolean;
  timePerQuestion: number;
  onSelect: (id: string) => void;
  onTimeout: () => void;
  onNext: () => void;
}

type OptionState = "default" | "correct" | "wrong" | "dim";

export function QuestionCard({
  question, questionNumber, total, score,
  selectedId, answered, timePerQuestion,
  onSelect, onTimeout, onNext,
}: Props) {
  const { timeLeft, percentage, isUrgent } = useTimer({
    duration: timePerQuestion,
    active: !answered,
    onExpire: onTimeout,
  });

  const getState = (id: string): OptionState => {
    if (!answered) return "default";
    if (id === question.correctId) return "correct";
    if (id === selectedId) return "wrong";
    return "dim";
  };

  const timerColor = isUrgent
    ? tokens.color.wrong
    : percentage > 50
    ? tokens.color.correct
    : tokens.color.accent;

  const isCorrect = selectedId === question.correctId;
  const isTimeout = answered && selectedId === null;

  const feedbackStyle: CSSProperties = {
    ...questionStyles.feedbackBox,
    background: isCorrect ? tokens.color.correctBg : tokens.color.wrongBg,
    border: `1px solid ${isCorrect ? tokens.color.correctBorder : tokens.color.wrongBorder}`,
  };

  const feedbackTitleColor = isCorrect ? tokens.color.correct : tokens.color.wrong;

  return (
    <div style={layoutStyles.page}>
      <div style={layoutStyles.card}>

        {/* Header */}
        <div style={questionStyles.header}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
            <span style={{
              fontFamily: tokens.font.display,
              fontSize: "22px",
              fontWeight: 800,
              color: tokens.color.accent,
            }}>
              {questionNumber}
            </span>
            <span style={{
              fontFamily: tokens.font.mono,
              fontSize: "13px",
              color: tokens.color.textDim,
            }}>
              /{total}
            </span>
          </div>

          <div className="tag tag-muted">
            ⭐ {score} pts
          </div>
        </div>

        {/* Quiz progress bar */}
        <div style={questionStyles.progressWrap}>
          <div style={questionStyles.progressTrack}>
            <div style={{
              ...questionStyles.progressFill,
              width: `${(questionNumber / total) * 100}%`,
            }} />
          </div>
        </div>

        {/* Timer */}
        <div style={{
          ...questionStyles.timerWrap,
          ...(isUrgent ? {
            borderColor: tokens.color.wrongBorder,
            animation: "pulse-ring 1s ease infinite",
          } : {}),
        }}>
          <span style={{
            fontFamily: tokens.font.mono,
            fontSize: "12px",
            color: isUrgent ? tokens.color.wrong : tokens.color.textMuted,
            minWidth: "30px",
            fontWeight: isUrgent ? 600 : 400,
          }}>
            {answered ? "—" : `${timeLeft}s`}
          </span>
          <div style={questionStyles.timerTrack}>
            <div
              className="timer-fill"
              style={{ width: `${percentage}%`, backgroundColor: timerColor }}
            />
          </div>
        </div>

        {/* Question */}
        <div style={questionStyles.questionBox}>
          <p style={questionStyles.questionNum}>Pregunta {questionNumber}</p>
          <p style={questionStyles.questionText}>{question.question}</p>
        </div>

        {/* Options */}
        <div style={questionStyles.optionsGrid}>
          {question.options.map((opt, i) => {
            const state = getState(opt.id);
            const delay = `${i * 0.06}s`;
            return (
              <button
                key={opt.id}
                className={`opt-btn ${state !== "default" ? state : ""}`}
                style={{ animationDelay: delay }}
                disabled={answered}
                onClick={() => onSelect(opt.id)}
              >
                <span className="opt-key">{opt.id.toUpperCase()}</span>
                <span style={questionStyles.optText}>{opt.text}</span>
                {answered && state === "correct" && (
                  <span className="opt-badge" style={{ color: tokens.color.correct, fontSize: "16px" }}>✓</span>
                )}
                {answered && state === "wrong" && (
                  <span className="opt-badge" style={{ color: tokens.color.wrong, fontSize: "16px" }}>✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {answered && (
          <div style={feedbackStyle}>
            <p style={{ ...questionStyles.feedbackTitle, color: feedbackTitleColor }}>
              {isTimeout
                ? "⏰ Tiempo agotado — −1 punto"
                : isCorrect
                ? "✓ Correcto — +1 punto"
                : "✗ Incorrecto"}
            </p>
            <p style={questionStyles.feedbackExpl}>{question.explanation}</p>
          </div>
        )}

        {/* Next */}
        {answered && (
          <button className="btn-ghost" onClick={onNext}>
            {questionNumber === total ? "Ver resultados finales" : "Siguiente pregunta"}
            <span style={{ fontSize: "16px" }}>→</span>
          </button>
        )}
      </div>
    </div>
  );
}