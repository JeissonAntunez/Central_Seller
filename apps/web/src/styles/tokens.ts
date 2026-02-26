import type { CSSProperties } from "react";

// ─── Tokens ───────────────────────────────────────────────────────────────────

export const tokens = {
  color: {
    bg:           "#080810",
    bgGlow:       "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,88,235,0.18) 0%, transparent 70%)",
    surface:      "#10101c",
    surfaceHover: "#14142a",
    border:       "rgba(255,255,255,0.07)",
    borderHover:  "rgba(99,88,235,0.5)",
    accent:       "#6358eb",
    accentLight:  "rgba(99,88,235,0.15)",
    accentGlow:   "0 0 40px rgba(99,88,235,0.3)",
    correct:      "#00d68f",
    correctBg:    "rgba(0,214,143,0.08)",
    correctBorder:"rgba(0,214,143,0.25)",
    wrong:        "#ff4d6d",
    wrongBg:      "rgba(255,77,109,0.08)",
    wrongBorder:  "rgba(255,77,109,0.25)",
    text:         "#f4f3ff",
    textMuted:    "rgba(244,243,255,0.45)",
    textDim:      "rgba(244,243,255,0.2)",
  },
  font: {
    display: "'Clash Display', 'Syne', sans-serif",
    body:    "'DM Sans', sans-serif",
    mono:    "'JetBrains Mono', monospace",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "18px",
    xl: "24px",
    full: "999px",
  },
  shadow: {
    card:   "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px rgba(0,0,0,0.5)",
    accent: "0 0 0 1px rgba(99,88,235,0.4), 0 8px 32px rgba(99,88,235,0.25)",
    glow:   "0 0 60px rgba(99,88,235,0.2)",
  },
} as const;

// ─── Base styles ──────────────────────────────────────────────────────────────

export const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    min-height: 100vh;
    background: ${tokens.color.bg};
    color: ${tokens.color.text};
    font-family: ${tokens.font.body};
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-image: ${tokens.color.bgGlow};
    background-attachment: fixed;
  }

  ::selection {
    background: rgba(99,88,235,0.3);
    color: ${tokens.color.text};
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  @keyframes pulse-ring {
    0%   { box-shadow: 0 0 0 0 rgba(255,77,109,0.4); }
    70%  { box-shadow: 0 0 0 8px rgba(255,77,109,0); }
    100% { box-shadow: 0 0 0 0 rgba(255,77,109,0); }
  }

  @keyframes shimmer {
    from { background-position: -200% center; }
    to   { background-position: 200% center; }
  }

  .timer-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s linear, background-color 0.4s ease;
  }

  .opt-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    background: ${tokens.color.surface};
    border: 1px solid ${tokens.color.border};
    border-radius: ${tokens.radius.md};
    padding: 15px 18px;
    cursor: pointer;
    text-align: left;
    color: ${tokens.color.text};
    font-family: ${tokens.font.body};
    font-size: 14.5px;
    line-height: 1.45;
    transition: border-color 0.18s, background 0.18s, transform 0.18s;
    animation: slideIn 0.3s ease both;
  }

  .opt-btn:not([disabled]):hover {
    border-color: ${tokens.color.borderHover};
    background: ${tokens.color.accentLight};
    transform: translateX(5px);
  }

  .opt-btn:disabled { cursor: default; }

  .opt-btn.correct {
    border-color: ${tokens.color.correctBorder} !important;
    background: ${tokens.color.correctBg} !important;
  }
  .opt-btn.wrong {
    border-color: ${tokens.color.wrongBorder} !important;
    background: ${tokens.color.wrongBg} !important;
  }
  .opt-btn.dim { opacity: 0.28; }

  .opt-key {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    border: 1px solid ${tokens.color.border};
    background: rgba(255,255,255,0.04);
    font-family: ${tokens.font.mono};
    font-size: 11px;
    font-weight: 500;
    color: ${tokens.color.textMuted};
    transition: all 0.18s;
  }

  .opt-btn.correct .opt-key {
    background: ${tokens.color.correct};
    border-color: ${tokens.color.correct};
    color: #080810;
    font-weight: 700;
  }
  .opt-btn.wrong .opt-key {
    background: ${tokens.color.wrong};
    border-color: ${tokens.color.wrong};
    color: white;
    font-weight: 700;
  }

  .btn-primary {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: ${tokens.color.accent};
    color: white;
    border: none;
    padding: 16px 28px;
    border-radius: ${tokens.radius.md};
    font-family: ${tokens.font.display};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: filter 0.2s, transform 0.2s, box-shadow 0.2s;
    box-shadow: ${tokens.shadow.accent};
  }

  .btn-primary:hover {
    filter: brightness(1.12);
    transform: translateY(-2px);
    box-shadow: ${tokens.shadow.glow}, ${tokens.shadow.accent};
  }

  .btn-ghost {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: transparent;
    color: ${tokens.color.textMuted};
    border: 1px solid ${tokens.color.border};
    padding: 15px 28px;
    border-radius: ${tokens.radius.md};
    font-family: ${tokens.font.body};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn-ghost:hover {
    border-color: ${tokens.color.accent};
    color: ${tokens.color.text};
    background: ${tokens.color.accentLight};
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 12px;
    border-radius: ${tokens.radius.full};
    font-family: ${tokens.font.mono};
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .tag-accent {
    background: ${tokens.color.accentLight};
    border: 1px solid rgba(99,88,235,0.3);
    color: #a89ef5;
  }

  .tag-muted {
    background: rgba(255,255,255,0.04);
    border: 1px solid ${tokens.color.border};
    color: ${tokens.color.textMuted};
  }

  .divider {
    height: 1px;
    background: ${tokens.color.border};
  }
`;

// ─── Typed style objects ──────────────────────────────────────────────────────

type S = Record<string, CSSProperties>;

export const layoutStyles: S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 20px",
  },
  card: {
    width: "100%",
    maxWidth: "580px",
    background: tokens.color.surface,
    border: `1px solid ${tokens.color.border}`,
    borderRadius: tokens.radius.xl,
    padding: "36px",
    boxShadow: tokens.shadow.card,
    animation: "fadeUp 0.45s cubic-bezier(0.22,1,0.36,1) both",
  },
};

export const startStyles: S = {
  eyebrow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
  },
  title: {
    fontFamily: tokens.font.display,
    fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 800,
    letterSpacing: "-0.03em",
    lineHeight: 1.1,
    marginBottom: "12px",
    background: "linear-gradient(135deg, #f4f3ff 40%, rgba(99,88,235,0.9))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  desc: {
    fontSize: "15px",
    color: tokens.color.textMuted,
    lineHeight: 1.65,
    marginBottom: "28px",
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${tokens.color.border}`,
    borderRadius: tokens.radius.lg,
    padding: "20px",
    marginBottom: "20px",
    gap: "0",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    padding: "0 12px",
  },
  statValue: {
    fontFamily: tokens.font.display,
    fontSize: "22px",
    fontWeight: 800,
    color: tokens.color.text,
  },
  statLabel: {
    fontFamily: tokens.font.mono,
    fontSize: "10px",
    color: tokens.color.textMuted,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },
  statDivider: {
    width: "1px",
    background: tokens.color.border,
    alignSelf: "stretch",
  },
  rulesList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "28px",
  },
  ruleItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    background: "rgba(255,255,255,0.025)",
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.color.border}`,
    fontFamily: tokens.font.mono,
    fontSize: "12.5px",
    color: tokens.color.textMuted,
    lineHeight: 1.4,
  },
  ruleDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    flexShrink: 0,
  },
};

export const questionStyles: S = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  progressWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  progressTrack: {
    flex: 1,
    height: "3px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    background: tokens.color.accent,
    borderRadius: "999px",
    transition: "width 0.5s cubic-bezier(0.22,1,0.36,1)",
  },
  timerWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "24px",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.03)",
    borderRadius: tokens.radius.md,
    border: `1px solid ${tokens.color.border}`,
  },
  timerTrack: {
    flex: 1,
    height: "4px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "999px",
    overflow: "hidden",
  },
  questionBox: {
    padding: "24px",
    background: "rgba(255,255,255,0.025)",
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.color.border}`,
    marginBottom: "16px",
  },
  questionNum: {
    fontFamily: tokens.font.mono,
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase" as const,
    color: tokens.color.textDim,
    marginBottom: "10px",
  },
  questionText: {
    fontFamily: tokens.font.display,
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: 1.45,
    letterSpacing: "-0.01em",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "16px",
  },
  optText: {
    flex: 1,
  },
  optBadge: {
    flexShrink: 0,
    fontSize: "16px",
  },
  feedbackBox: {
    borderRadius: tokens.radius.md,
    padding: "16px 18px",
    marginBottom: "16px",
    animation: "fadeUp 0.3s ease both",
  },
  feedbackTitle: {
    fontFamily: tokens.font.display,
    fontSize: "14px",
    fontWeight: 700,
    marginBottom: "6px",
  },
  feedbackExpl: {
    fontFamily: tokens.font.mono,
    fontSize: "12px",
    lineHeight: 1.6,
    color: tokens.color.textMuted,
  },
};

export const resultsStyles: S = {
  hero: {
    textAlign: "center",
    paddingBottom: "28px",
    marginBottom: "24px",
    borderBottom: `1px solid ${tokens.color.border}`,
  },
  emoji: {
    fontSize: "52px",
    marginBottom: "12px",
    display: "block",
  },
  rank: {
    fontFamily: tokens.font.mono,
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    marginBottom: "6px",
  },
  scoreRow: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    gap: "3px",
    marginBottom: "6px",
  },
  scoreBig: {
    fontFamily: tokens.font.display,
    fontSize: "72px",
    fontWeight: 800,
    letterSpacing: "-0.05em",
    lineHeight: 1,
  },
  scoreDenom: {
    fontFamily: tokens.font.display,
    fontSize: "28px",
    fontWeight: 700,
    color: tokens.color.textMuted,
  },
  scorePercent: {
    fontFamily: tokens.font.mono,
    fontSize: "13px",
    color: tokens.color.textMuted,
  },
  listTitle: {
    fontFamily: tokens.font.mono,
    fontSize: "10px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: tokens.color.textDim,
    marginBottom: "10px",
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginBottom: "24px",
  },
  resultItem: {
    borderRadius: tokens.radius.md,
    padding: "14px 16px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  resultItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resultNum: {
    fontFamily: tokens.font.mono,
    fontSize: "10px",
    color: tokens.color.textDim,
  },
  resultStatus: {
    fontFamily: tokens.font.mono,
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.04em",
  },
  resultQ: {
    fontSize: "13px",
    lineHeight: 1.45,
    color: tokens.color.text,
  },
  resultHint: {
    fontFamily: tokens.font.mono,
    fontSize: "11px",
    color: tokens.color.textMuted,
  },
};