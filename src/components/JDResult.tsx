import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Result.css';

const JDResult: React.FC = () => {
  const locationHook = useLocation();
  const navigate = useNavigate();
  // Assumes data is passed via React Router navigate state
  const resultData = locationHook.state?.resultData || {};

  return (
    <div className="result-container">
      <div className="result-card-wide">
        <div className="result-top-header">
          <div className="analysis-title">JD Analysis Result</div>
          <div className="analysis-subtitle">
            Key insights extracted from your job description.
          </div>
        </div>

        <div className="info-card" style={{ borderLeft: "5px solid #209ffc" }}>
          <div className="info-card-title">
            <span>📝</span> Sanitized Job Description
          </div>
          <div style={{ color: "#3e4251", whiteSpace: 'pre-line' }}>
            {resultData.sanitized_jd || "No content extracted."}
          </div>
        </div>

        <div className="main-grid-ui">
          <div>
            <div className="info-card" style={{ borderLeft: "5px solid #22c55e" }}>
              <div className="info-card-title">
                <span>✅</span> Must-have Skills
              </div>
              <ul className="details-list success">
                {(resultData.must_have_skills || []).map((skill: string, idx: number) => (
                  <li key={idx}><span className="match-icon">✔️</span> {skill}</li>
                ))}
              </ul>
            </div>
            <div className="info-card" style={{ borderLeft: "5px solid #feb247" }}>
              <div className="info-card-title">
                <span>⭐</span> Good-to-have Skills
              </div>
              <ul className="details-list warning">
                {(resultData.good_to_have_skills || []).map((skill: string, idx: number) => (
                  <li key={idx}><span className="warn-icon">⭐</span> {skill}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <div className="info-card" style={{ borderLeft: "5px solid #5778f8" }}>
              <div className="info-card-title">
                <span>📍</span> Location
              </div>
              <div style={{ fontSize: '1.0rem', color: "#3850c1" }}>
                {resultData.location || "Not specified"}
              </div>
            </div>
            <div className="info-card" style={{ borderLeft: "5px solid #c1a855" }}>
              <div className="info-card-title">
                <span>⏳</span> Duration
              </div>
              <div style={{ fontSize: '1.0rem' }}>
                {resultData.duration || "No duration specified"}
              </div>
            </div>
          </div>
        </div>
        <div className="action-buttons" style={{ marginTop: 32 }}>
          <button className="primary-btn" onClick={() => navigate("/")}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default JDResult;
