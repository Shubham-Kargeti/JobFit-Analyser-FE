import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/HomePage.css'

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  return (
    <div className="home-container">
      <h1 className="headline">Analyze Your Resume with AI Precision</h1>
      <p className="tagline">
        Get instant feedback on how well your resume matches a job description.
        Land your dream job faster.
      </p>
      <button className="get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>
      <footer className="site-footer">
        &copy; {new Date().getFullYear()} JobFit Analyzer. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
