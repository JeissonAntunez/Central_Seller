// import React from "react";
import type { QuestionResult } from "../../types/quiz.types";
import { resultsStyles, layoutStyles, tokens } from "../../styles/tokens";

interface Props {
  score: number;
  total: number;
  results: QuestionResult[];
  onReset: () => void;
}

interface Rank {
  label: string;
  emoji: string;
  color: string;
}

function getRank(percentage: number): Rank {
  if (percentage >= 90) return { label: "Experto",            emoji: "🏆", color: "#f5c842" };
  if (percentage >= 75) return { label: "Avanzado",           emoji: "🥈", color: "#c0cfe0" };
  if (percentage >= 50) return { label: "Intermedio",         emoji: "🥉", color: "#d4956a" };
                        return { label: "Sigue practicando",  emoji: "📚", color: tokens.color.textMuted };
}

export function ResultsScreen({ score, total, results, onReset }: Props) {
  const percentage = Math.round((score / total) * 100);
  const rank = getRank(percentage);

  return (
    <div style={layoutStyles.page}>
      <div style={layoutStyles.card}>

        {/* Hero */}
        <div style={resultsStyles.hero}>
          <span style={resultsStyles.emoji}>{rank.emoji}</span>
          <p style={{ ...resultsStyles.rank, color: rank.color }}>{rank.label}</p>

          <div style={resultsStyles.scoreRow}>
            <span style={{ ...resultsStyles.scoreBig, color: rank.color }}>{score}</span>
            <span style={resultsStyles.scoreDenom}>/{total}</span>
          </div>

          <p style={resultsStyles.scorePercent}>{percentage}% de acierto</p>
        </div>

        {/* Results list */}
        <p style={resultsStyles.listTitle}>Detalle de respuestas</p>
        <div style={resultsStyles.resultsList}>
          {results.map((r, i) => {
            const isOk = r.correct;
            return (
              <div
                key={r.questionId}
                style={{
                  ...resultsStyles.resultItem,
                  background: isOk ? tokens.color.correctBg : tokens.color.wrongBg,
                  border: `1px solid ${isOk ? tokens.color.correctBorder : tokens.color.wrongBorder}`,
                }}
              >
                <div style={resultsStyles.resultItemHeader}>
                  <span style={resultsStyles.resultNum}>#{i + 1}</span>
                  <span style={{
                    ...resultsStyles.resultStatus,
                    color: isOk ? tokens.color.correct : tokens.color.wrong,
                  }}>
                    {r.timedOut ? "⏰ Tiempo agotado" : isOk ? "✓ Correcto" : "✗ Incorrecto"}
                  </span>
                </div>
                <p style={resultsStyles.resultQ}>{r.question}</p>
                {!isOk && (
                  <p style={resultsStyles.resultHint}>
                    Correcta: opción <strong style={{ color: tokens.color.text }}>{r.correctId.toUpperCase()}</strong>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <button className="btn-primary" onClick={onReset}>
          Intentar de nuevo
          <span style={{ fontSize: "18px" }}>↩</span>
        </button>
      </div>
    </div>
  );
}