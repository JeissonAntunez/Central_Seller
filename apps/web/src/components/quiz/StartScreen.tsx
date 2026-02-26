// import React from "react";
import { startStyles, layoutStyles, tokens } from "../../styles/tokens";

interface Props {
  title: string;
  description: string;
  totalQuestions: number;
  timePerQuestion: number;
  onStart: () => void;
}

export function StartScreen({ title, description, totalQuestions, timePerQuestion, onStart }: Props) {
  const rules = [
    { dot: tokens.color.correct,  text: "Respuesta correcta → +1 punto" },
    { dot: tokens.color.wrong,    text: "Tiempo agotado sin responder → −1 punto" },
    { dot: tokens.color.accent,   text: "Feedback inmediato con explicación tras cada respuesta" },
  ];

  return (
    <div style={layoutStyles.page}>
      <div style={layoutStyles.card}>

        {/* Eyebrow */}
        <div style={startStyles.eyebrow}>
          <span className="tag tag-accent">⚡ Quiz interactivo</span>
        </div>

        {/* Title */}
        <h1 style={startStyles.title}>{title}</h1>
        <p style={startStyles.desc}>{description}</p>

        {/* Stats */}
        <div style={startStyles.statsRow}>
          <div style={startStyles.statItem}>
            <span style={startStyles.statValue}>{totalQuestions}</span>
            <span style={startStyles.statLabel}>Preguntas</span>
          </div>
          <div style={startStyles.statDivider} />
          <div style={startStyles.statItem}>
            <span style={startStyles.statValue}>{timePerQuestion}s</span>
            <span style={startStyles.statLabel}>Por pregunta</span>
          </div>
          <div style={startStyles.statDivider} />
          <div style={startStyles.statItem}>
            <span style={startStyles.statValue}>+1/−1</span>
            <span style={startStyles.statLabel}>Puntuación</span>
          </div>
        </div>

        {/* Rules */}
        <div style={startStyles.rulesList}>
          {rules.map((r, i) => (
            <div key={i} style={startStyles.ruleItem}>
              <span style={{ ...startStyles.ruleDot, background: r.dot }} />
              {r.text}
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={onStart}>
          Comenzar ahora
          <span style={{ fontSize: "18px" }}>→</span>
        </button>
      </div>
    </div>
  );
}

