// import React from "react";

export const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#faf6f1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Lora', serif",
    padding: "24px",
  },
  container: {
    width: "100%",
    maxWidth: "480px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#a89880",
  },
  counter: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "12px",
    color: "#a89880",
  },
  progressTrack: {
    height: "5px",
    background: "#ede5da",
    borderRadius: "99px",
    overflow: "hidden",
  },
  card: {
    background: "#ffffff",
    border: "1px solid #ede5da",
    borderRadius: "16px",
    minHeight: "220px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 36px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
  },
  cardContent: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
  },
  questionLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8b8a4",
  },
  questionText: {
    fontSize: "22px",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#2d1f0e",
    letterSpacing: "-0.01em",
  },
  answerLabel: {
    fontFamily: "'DM Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#c8956c",
  },
  answerText: {
    fontSize: "15px",
    lineHeight: 1.7,
    color: "#5a4535",
    fontStyle: "italic",
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "4px",
  },
};

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Mono:wght@400;500&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .card-inner {
    transition: opacity 0.3s ease, transform 0.3s ease;
    width: 100%;
  }
  .card-inner.flipping {
    opacity: 0;
    transform: scale(0.97);
  }
  .progress-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #c8956c, #e8b88a);
    border-radius: 99px;
    transition: width 0.4s ease;
  }
  .nav-btn {
    background: none;
    border: 1px solid #e0d5c8;
    padding: 8px 18px;
    border-radius: 8px;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #7a6a5a;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.01em;
  }
  .nav-btn:hover:not(:disabled) {
    background: #f5ede4;
    border-color: #c8956c;
    color: #c8956c;
  }
  .nav-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  .toggle-btn {
    background: none;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 13px;
    color: #c8956c;
    cursor: pointer;
    letter-spacing: 0.02em;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .toggle-btn:hover {
    color: #a0724a;
  }
`;