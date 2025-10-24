import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/upload');
  };

  const handleAnalyzeJD = () => {
    navigate('/jd-upload');
  };

  return (
    <div className="home-container">
      <h1 className="headline">Analyze Your Resume and Job Matches with AI</h1>
      <p className="tagline">Get instant, intelligent feedback and improve your chances of landing your dream project.</p>

      {/* Features Boxes */}
      <div className="features-wrapper">
        {/* Box 1 */}
        <div className="feature-box">
          <h2 className="box-title">Resume & JD Analysis</h2>
          <p className="box-desc">
            Upload your resume and job description to get detailed proficiency matchmaking and areas to improve.
          </p>
          <button className="action-btn" onClick={handleGetStarted}>Analyze Now</button>
        </div>
        {/* Box 2 */}
        <div className="feature-box">
          <h2 className="box-title">Job Description Insights</h2>
          <p className="box-desc">
            Extract critical skills, responsibilities, and requirements from any JD with AI assistance.
          </p>
          <button className="action-btn" onClick={handleAnalyzeJD}>Upload JD</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer">&copy; {new Date().getFullYear()} JobFit Analyzer. All rights reserved.</footer>
    </div>
  );
};

export default HomePage;
