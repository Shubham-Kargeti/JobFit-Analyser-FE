import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadElementAsPDF } from '../utils/downloadPdf';
import './css/Result.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultRef = useRef<HTMLDivElement>(null);
  const [showTechnical, setShowTechnical] = useState(false);

  const resultData = location.state?.resultData;

  useEffect(() => {
    console.log("Result Data:", resultData);
  }, [resultData]);

  const handleBackToUpload = () => navigate('/upload');
  const handleDownloadPDF = () => {
    if (resultRef.current) {
      downloadElementAsPDF(resultRef.current, 'analysis-result.pdf');
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

  const parseScore = (scoreStr: string) => {
    if (!scoreStr) return 0;
    const match = scoreStr.match(/^(\d+(\.\d+)?)/);
    return match ? parseFloat(match[1]) : 0;
  };
  const rawScore = parseScore(resultData.JD_MatchScore);
  const scorePercent = Math.min(100, Math.max(0, Math.round((rawScore / 10) * 100)));
  let ringColor = '#f87171';
  let label = 'Low Compatibility';
  if (rawScore >= 7.5) {
    ringColor = '#22c55e';
    label = 'High Compatibility';
  } else if (rawScore >= 5) {
    ringColor = '#facc15';
    label = 'Moderate Compatibility';
  }

  const gapsDetected = Array.isArray(resultData.Key_Gaps) && resultData.Key_Gaps.length > 0;
  const gapsPercent = gapsDetected ? 100 : 0;
  const gapsColor = gapsDetected ? '#f59e42' : '#22c55e';
  const gapsLabel = gapsDetected ? 'Key Gaps Detected!' : 'No Key Gaps';

  const grammarDetected =
    (Array.isArray(resultData.Grammatical_Errors) && resultData.Grammatical_Errors.length > 0) ||
    (Array.isArray(resultData.Spelling_Mistakes) && resultData.Spelling_Mistakes.length > 0);
  const grammarPercent = grammarDetected ? 100 : 0;
  const grammarColor = grammarDetected ? '#e11d48' : '#22c55e';
  const grammarLabel = grammarDetected ? 'Grammar Error!' : 'No Grammar Error';

  return (
    <div className="result-container">
      <div className="result-card" ref={resultRef} style={{ overflowWrap: 'break-word' }}>
        <div className="result-header">
          <h2 className="analysis-title">
            <span role="img" aria-label="analytics" style={{
              fontSize: "2.1rem",
              verticalAlign: "middle",
              marginRight: "0.7rem"
            }}>📊</span>
            <span className="gradient-text">Analysis Results</span>
          </h2>
        </div>

        {/* Circles row */}
        <div
          className="score-circles-row"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: '2.5rem', marginBottom: '2.1rem' }}
        >
          <div style={{ width: 210, height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgressbar
              value={scorePercent}
              text={`${rawScore}/10`}
              styles={buildStyles({
                textColor: "#1e293b",
                pathColor: ringColor,
                trailColor: "#e0e6ed",
                textSize: '1.9rem',
                pathTransitionDuration: 0.7
              })}
              strokeWidth={18}
            />
            <div style={{ textAlign: "center", marginTop: '0.45rem', color: ringColor, fontWeight: 600, fontSize: '1.04rem' }}>
              {label}
            </div>
          </div>

          <div style={{ width: 165, height: 165, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgressbar
              value={gapsPercent}
              text={gapsDetected ? "!" : "✓"}
              styles={buildStyles({
                textColor: "#1e293b",
                pathColor: gapsColor,
                trailColor: "#e0e6ed",
                textSize: '1.5rem'
              })}
              strokeWidth={10}
            />
            <div style={{ textAlign: "center", marginTop: '0.45rem', color: gapsColor, fontWeight: 600, fontSize: '1.04rem' }}>
              {gapsLabel}
            </div>
          </div>

          <div style={{ width: 165, height: 165, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgressbar
              value={grammarPercent}
              text={grammarDetected ? "!" : "✓"}
              styles={buildStyles({
                textColor: "#1e293b",
                pathColor: grammarColor,
                trailColor: "#e0e6ed",
                textSize: '1.5rem'
              })}
              strokeWidth={10}
            />
            <div style={{ textAlign: "center", marginTop: '0.45rem', color: grammarColor, fontWeight: 600, fontSize: '1.04rem' }}>
              {grammarLabel}
            </div>
          </div>
        </div>

        <p style={{textAlign: "center", fontSize: "0.98rem", marginTop: "0.13rem", marginBottom: "2rem", color: "#6b7280" }}>
          The compatibility score reflects the alignment of values, goals, and working styles.
        </p>

        <div className="summary-block">
          <h3>Score Explanation</h3>
          <div style={{ marginBottom: '0.5rem' }}>
            {resultData.Score_Explanation_NonTechnical || 'No non-technical explanation available.'}
          </div>
          <button
            style={{
              fontSize: '0.85rem',
              color: '#2563eb',
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              padding: 0
            }}
            onClick={() => setShowTechnical(!showTechnical)}
            aria-expanded={showTechnical}
            aria-label="Toggle more technical explanation"
          >
            {showTechnical ? 'Hide Details ▲' : 'Technical Details ▼'}
          </button>
          {showTechnical && (
            <div style={{ marginTop: '0.5rem', color: '#475569', whiteSpace: 'pre-wrap' }}>
              {resultData.Score_Explanation_Technical || 'No technical explanation available.'}
            </div>
          )}
        </div>

        <div className="matches-gaps-row">
          <div className="matches-block">
            <h3>Key Matches</h3>
            {Array.isArray(resultData.Key_Matches) && resultData.Key_Matches.length ? (
              <ul>
                {resultData.Key_Matches.map((m: string, idx: number) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            ) : (
              <p>No strong matches detected.</p>
            )}
          </div>

          <div className="gaps-block">
            <h3>Key Gaps</h3>
            {Array.isArray(resultData.Key_Gaps) && resultData.Key_Gaps.length ? (
              <ul>
                {resultData.Key_Gaps.map((g: string, idx: number) => (
                  <li key={idx}>{g}</li>
                ))}
              </ul>
            ) : (
              <p>No major gaps detected.</p>
            )}
          </div>
        </div>

        <div className="recommendations-block">
          <h3>Recommendations</h3>
          {Array.isArray(resultData.Recommendations) && resultData.Recommendations.length ? (
            <ul>
              {resultData.Recommendations.map((r: string, idx: number) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations needed.</p>
          )}
        </div>

        <div className="matches-block">
          <h3>Suggested Interview Questions</h3>
          {Array.isArray(resultData.Suggested_Questions) && resultData.Suggested_Questions.length ? (
            <ul>
              {resultData.Suggested_Questions.map((q: any, idx: number) => (
                <li key={idx}>
                  {q.question}{' '}
                  <small style={{ color: '#888' }}>
                    ({q.score?.toFixed(2)})
                  </small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions found.</p>
          )}
        </div>

        <div className="matches-block">
          <h3>Grammatical Errors</h3>
          {Array.isArray(resultData.Grammatical_Errors) && resultData.Grammatical_Errors.length ? (
            <table className="result-table single-column">
              <thead>
                <tr>
                  <th>Context</th>
                </tr>
              </thead>
              <tbody>
                {resultData.Grammatical_Errors.map((error: string, idx: number) => (
                  <tr key={idx}>
                    <td>{error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No grammatical errors detected.</p>
          )}
        </div>

        <div className="matches-block">
          <h3>Spelling Mistakes</h3>
          {Array.isArray(resultData.Spelling_Mistakes) && resultData.Spelling_Mistakes.length ? (
            <table className="result-table single-column">
              <thead>
                <tr>
                  <th>Mistakes</th>
                </tr>
              </thead>
              <tbody>
                {resultData.Spelling_Mistakes.map((mistake: string, idx: number) => (
                  <tr key={idx}>
                    <td>{mistake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No spelling mistakes detected.</p>
          )}
        </div>

        <div className="matches-block">
          <h3>Client Name Detection</h3>
          {Array.isArray(resultData.Client_Names) && resultData.Client_Names.length ? (
            <table className="result-table single-column">
              <thead>
                <tr>
                  <th>Client/Organization Names</th>
                </tr>
              </thead>
              <tbody>
                {resultData.Client_Names.map((name: string, idx: number) => (
                  <tr key={idx}>
                    <td>{name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No confidential client names detected.</p>
          )}
        </div>
      </div>
      <div className="action-buttons">
        <button className="primary-btn" onClick={handleDownloadPDF}>
          Download as PDF
        </button>
        <button className="secondary-btn" onClick={handleBackToUpload}>
          Analyze Another Pair
        </button>
      </div>
    </div>
  );
};

export default Result;
