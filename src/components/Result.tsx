
import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { downloadElementAsPDF } from '../utils/downloadPdf';
import './css/Result.css';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resultData = location.state?.resultData;
  const resultRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="result-container">
      <div
        className="result-card"
        ref={resultRef}
        style={{ overflowWrap: 'break-word' }}
      >
        <h2 className="analysis-title">Analysis Results</h2>

        <div className="score-circle" style={{ marginBottom: '1.5rem' }}>
          <span className="score-value">{resultData.JD_MatchScore}</span>
          <span className="score-label">Compatibility Score</span>
        </div>

        <div className="summary-block">
          <h3>Score Explanation</h3>
          <div>{resultData.Score_Explanation}</div>
        </div>

        <div className="matches-block">
          <h3>Key Matches</h3>
          {resultData.Key_Matches?.length ? (
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
          {resultData.Key_Gaps?.length ? (
            <ul>
              {resultData.Key_Gaps.map((g: string, idx: number) => (
                <li key={idx}>{g}</li>
              ))}
            </ul>
          ) : (
            <p>No major gaps detected.</p>
          )}
        </div>

        <div className="recommendations-block">
          <h3>Recommendations</h3>
          {resultData.Recommendations?.length ? (
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
          {resultData.Suggested_Questions?.length ? (
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
          {resultData.Grammatical_Errors?.length ? (
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
          {resultData.Spelling_Mistakes?.length ? (
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
          {resultData.Client_Names?.length ? (
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

      {/* New attractive button layout */}
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
