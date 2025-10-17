import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  // New handler for JD
  const handleAnalyzeJD = () => {
    navigate('/jd-upload');
  };

  return (
    <div className="home-container">
      <h1 className="headline">Analyze Your Resume with AI Precision</h1>
      <p className="tagline">
        Get instant feedback on how well your resume matches a job description.
        Land your dream job faster.
      </p>
      <div className="homepage-btn-group">
        <button className="get-started-btn" onClick={handleGetStarted}>
          Analyse Resume-JD
        </button>
        <button className="jd-analyze-btn" onClick={handleAnalyzeJD}>
          Analyze a Job Description
        </button>
      </div>
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} JobFit Analyzer. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
