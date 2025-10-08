import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Result.css';

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result || 'No result available';

  const handleBackToUpload = () => {
    navigate('/upload');
  };

  return (
    <div className="result-container">
      <div className="result-card">
        <h2 className="analysis-title">Analysis Results</h2>
        <textarea
          rows={15}
          readOnly
          value={result}
          style={{ width: '100%', padding: '0.8rem', fontSize: '1rem', borderRadius: '8px', border: '1px solid #d1d5db', resize: 'vertical' }}
        />
        <button className="another-btn" onClick={handleBackToUpload}>
          Analyze Another Pair
        </button>
      </div>
    </div>
  );
};

export default Result;
