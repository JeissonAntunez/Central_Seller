import { cards } from "../../data/cards.data";
import { useFlashCards } from "../../hooks/useFlashCards";
import { styles, globalStyles } from "./FlashCards.styles";

export function FlashCards() {
  const {
    current,
    currentIndex,
    total,
    progress,
    showAnswer,
    flipping,
    toggleAnswer,
    goNext,
    goPrev,
    canGoNext,
    canGoPrev,
  } = useFlashCards({ cards });

  return (
    <div style={styles.page}>
      <style>{globalStyles}</style>

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.label}>Flash Cards</span>
          <span style={styles.counter}>
            {currentIndex + 1} / {total}
          </span>
        </div>

        {/* Progress bar */}
        <div style={styles.progressTrack}>
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Card */}
        <div
          className={`card-inner ${flipping ? "flipping" : ""}`}
          style={styles.card}
        >
          <div style={styles.cardContent}>
            {!showAnswer ? (
              <>
                <p style={styles.questionLabel}>Pregunta</p>
                <p style={styles.questionText}>{current.question}</p>
              </>
            ) : (
              <>
                <p style={styles.answerLabel}>Respuesta</p>
                <p style={styles.answerText}>{current.answer}</p>
              </>
            )}
          </div>
        </div>

        {/* Controls */}
        <div style={styles.controls}>
          <button className="nav-btn" onClick={goPrev} disabled={!canGoPrev}>
            ← Anterior
          </button>
          <button className="toggle-btn" onClick={toggleAnswer}>
            {showAnswer ? "Ocultar respuesta" : "Mostrar respuesta"}
          </button>
          <button className="nav-btn" onClick={goNext} disabled={!canGoNext}>
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}