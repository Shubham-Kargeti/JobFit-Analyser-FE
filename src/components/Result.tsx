import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadElementAsPDF } from "../utils/downloadPdf";
import "./css/Result.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type InfoCardProps = {
  icon: React.ReactNode;
  title: string;
  color?: string;
  children: React.ReactNode;
};

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, color, children }) => (
  <div className="info-card" style={color ? { borderLeft: `5px solid ${color}` } : {}}>
    <div className="info-card-title">
      <span className="icon">{icon}</span>
      <span>{title}</span>
    </div>
    {children}
  </div>
);

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  const resultData = location.state?.resultData || {};

  useEffect(() => {
    console.log("Result Data:", resultData);
  }, [resultData]);

  const handleBackToUpload = () => navigate("/upload");
  const handleDownloadPDF = () => {
    if (resultRef.current) {
      downloadElementAsPDF(resultRef.current, "analysis-result.pdf");
    }
  };

  if (!resultData) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h2 className="analysis-title">No Results Available</h2>
          <div className="action-buttons">
            <button className="secondary-btn" onClick={handleBackToUpload}>
              Analyze Another Pair
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Circles/score
  const parseScore = (scoreStr: string) => {
    if (!scoreStr) return 0;
    const match = scoreStr.match(/^(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };
  const rawScore = parseScore(resultData.JD_MatchScore);
  const scorePercent = Math.min(100, Math.max(0, Math.round((rawScore / 10) * 100)));
  let ringColor = "#f87171";
  let label = "Low Compatibility";
  if (rawScore >= 7.5) {
    ringColor = "#22c55e";
    label = "High Compatibility";
  } else if (rawScore >= 5) {
    ringColor = "#facc15";
    label = "Moderate Compatibility";
  }

  const gapsDetected = Array.isArray(resultData.Key_Gaps) && resultData.Key_Gaps.length > 0;
  const gapsPercent = gapsDetected ? 100 : 0;
  const gapsColor = "#ffbd2f";
  const gapsLabel = gapsDetected ? "Key Gaps Detected!" : "No Key Gaps";

  const grammarDetected =
    (Array.isArray(resultData.Grammatical_Errors) && resultData.Grammatical_Errors.length > 0) ||
    (Array.isArray(resultData.Spelling_Mistakes) && resultData.Spelling_Mistakes.length > 0);

  const grammarPercent = grammarDetected ? 100 : 0;
  const grammarColor = grammarDetected ? "#e43838" : "#38e44c";
  const grammarLabel = grammarDetected ? "Grammar Error!" : "No Grammar Error";

  // Remove all content between ** and **, including the markers themselves
  const suggestedQuestionsTextRaw = resultData.Suggested_Questions || "";
  const suggestedQuestionsText = suggestedQuestionsTextRaw.replace(/\*\*([^*]+)\*\*/g, "");

  const suggestedQuestions = suggestedQuestionsText
    .split('\n')
    .map((q: string) => q.trim())
    .filter((q: string) =>
      q.startsWith('- ') ||
      q.startsWith('*') ||
      /^\d+\./.test(q)
    )
    .map((q: string) =>
      q.replace(/^(-|\*)\s*/, '')   // remove leading bullet or asterisk
       .replace(/^\d+\.\s*/, '')    // remove leading numbered list
       .replace(/[*_]+/g, '')       // remove stray markdown
       .replace(/^\u201c?/, '')     // remove leading curly quote
       .replace(/\u201d?"?$/, '')   // remove closing curly/straight quote
       .trim()
    )
    .filter((q: string) => q.length > 0);

  return (
    <div className="result-container">
      <div className="result-card-wide" ref={resultRef}>
        {/* Header and subtitle */}
        <div className="result-top-header">
          <div className="analysis-title">Analysis Results</div>
          <div className="analysis-subtitle">
            Review the compatibility of your resume with the job description.
          </div>
        </div>

        {/* 1. Summary Circles Row */}
        <div className="grid-summary-row">
          <InfoCard icon="💼" title="Compatibility Score" color="#2196f3">
            <div className="circle-summary">
              <CircularProgressbar
                value={scorePercent}
                text={`${rawScore}/10`}
                styles={buildStyles({
                  textColor: "#1e293b",
                  pathColor: ringColor,
                  trailColor: "#e0e6ed",
                  textSize: "2rem",
                  pathTransitionDuration: 0.7,
                })}
                strokeWidth={17}
              />
              <div className="score-label" style={{ color: ringColor, fontWeight: 600 }}>
                {label}
              </div>
            </div>
          </InfoCard>
          <InfoCard icon="🛑" title="Gaps" color="#ffbd2f">
            <div className="circle-summary">
              <CircularProgressbar
                value={gapsPercent}
                text={gapsDetected ? "!" : "✓"}
                styles={buildStyles({
                  textColor: "#1e293b",
                  pathColor: gapsColor,
                  trailColor: "#e0e6ed",
                  textSize: "2rem",
                  pathTransitionDuration: 0.7,
                })}
                strokeWidth={11}
              />
              <div className="score-label" style={{ color: "#b38113", fontWeight: 600 }}>
                {gapsLabel}
              </div>
            </div>
          </InfoCard>
          <InfoCard icon="✅" title="Grammar" color={grammarColor}>
            <div className="circle-summary">
              <CircularProgressbar
                value={grammarPercent}
                text={grammarDetected ? "!" : "✓"}
                styles={buildStyles({
                  textColor: "#1e293b",
                  pathColor: grammarColor,
                  trailColor: "#e0e6ed",
                  textSize: "2rem",
                  pathTransitionDuration: 0.7,
                })}
                strokeWidth={11}
              />
              <div className="score-label" style={{ color: grammarColor, fontWeight: 600 }}>
                {grammarLabel}
              </div>
            </div>
          </InfoCard>
        </div>

        {/* 2. Score Explanation */}
        <InfoCard icon="📝" title="Score Explanation" color="#1e90ff">
          <div style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {resultData.Score_Explanation_NonTechnical || 'No non-technical explanation available.'}
          </div>
          <button
            className="show-details-btn"
            onClick={() => setShowTechnical(!showTechnical)}
            aria-expanded={showTechnical}
            aria-label="Toggle technical explanation"
          >
            {showTechnical ? "Hide Details ▲" : "Technical Details ▼"}
          </button>
          {showTechnical && (
            <div style={{ marginTop: "0.5rem", color: "#475569", whiteSpace: "pre-wrap" }}>
              {resultData.Score_Explanation_Technical || "No technical explanation available."}
            </div>
          )}
        </InfoCard>

        {/* 3. Main Content Grid */}
        <div className="main-grid-ui">
          {/* Left Column */}
          <div>
            {/* Key Matches */}
            <InfoCard icon="🔑" title="Key Matches" color="#22c55e">
              {Array.isArray(resultData.Key_Matches) && resultData.Key_Matches.length ? (
                <ul className="details-list success">
                  {resultData.Key_Matches.map((m: string, idx: number) => (
                    <li key={idx}>
                      <span className="match-icon">✔️</span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No strong matches detected.</p>
              )}
            </InfoCard>

            {/* Grammar */}
            <InfoCard icon="🔡" title="Grammar Check" color="#38e44c">
              {Array.isArray(resultData.Grammatical_Errors) && resultData.Grammatical_Errors.length ? (
                <ul className="details-list warning">
                  {resultData.Grammatical_Errors.map((e: string, i: number) => (
                    <li key={i}>
                      <span className="warn-icon">⚠️</span> {e}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No grammatical errors detected.</p>
              )}
            </InfoCard>

            {/* Spelling */}
            <InfoCard icon="📝" title="Spelling Mistakes" color="#38e44c">
              {Array.isArray(resultData.Spelling_Mistakes) && resultData.Spelling_Mistakes.length ? (
                <ul className="details-list warning">
                  {resultData.Spelling_Mistakes.map((e: string, i: number) => (
                    <li key={i}>
                      <span className="warn-icon">⚠️</span> {e}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No spelling mistakes detected.</p>
              )}
            </InfoCard>
            {/* Client Names */}
            <InfoCard icon="🏢" title="Client/Organization Names" color="#5778f8">
              {Array.isArray(resultData.Client_Names) && resultData.Client_Names.length ? (
                <ul className="details-list neutral">
                  {resultData.Client_Names.map((e: string, i: number) => (
                    <li key={i}><span className="info-icon">🏢</span> {e}</li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No confidential client names detected.</p>
              )}
            </InfoCard>
          </div>
          {/* Right Column */}
          <div>
            {/* Key Gaps */}
            <InfoCard icon="⚠️" title="Key Gaps" color="#ffbd2f">
              {Array.isArray(resultData.Key_Gaps) && resultData.Key_Gaps.length ? (
                <ul className="details-list warning">
                  {resultData.Key_Gaps.map((g: string, idx: number) => (
                    <li key={idx}>
                      <span className="warn-icon">⚠️</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No major gaps detected.</p>
              )}
            </InfoCard>

            {/* Recommendations */}
            <InfoCard icon="💡" title="Recommendations" color="#209ffc">
              {Array.isArray(resultData.Recommendations) && resultData.Recommendations.length ? (
                <ul className="details-list info">
                  {resultData.Recommendations.map((r: string, idx: number) => (
                    <li key={idx}>
                      <span className="info-icon">ℹ️</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-state">No recommendations needed.</p>
              )}
            </InfoCard>
          </div>
        </div>

        {/* Full-width suggested questions below grid */}
        <div className="suggested-questions-wide" style={{ marginTop: "2rem" }}>
          <InfoCard icon="🎤" title="Suggested Interview Questions" color="#5f76ff">
            {suggestedQuestions.length ? (
              <ul className="details-list">
                {suggestedQuestions.map((q: string, idx: number) => (
                  <li key={idx}>
                    <span style={{ marginRight: 7 }}>❓</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">No questions found.</p>
            )}
          </InfoCard>
        </div>

        <div className="action-buttons" style={{ marginTop: 32 }}>
          <button className="primary-btn" onClick={handleDownloadPDF}>
            Download as PDF
          </button>
          <button className="secondary-btn" onClick={handleBackToUpload}>
            Analyze Another Pair
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
