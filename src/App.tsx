import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const uploadFile = async (endpoint: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post(`http://localhost:8000/${endpoint}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  };

  const handleProcess = async () => {
    if (!jdFile || !resumeFile) {
      alert('Please upload both JD and Resume!');
      return;
    }
    setLoading(true);
    setResult('');
    try {
      // await uploadFile('upload-jd/', jdFile);
      // await uploadFile('upload-resume/', resumeFile);
      await uploadFile('jd/upload/', jdFile);
      await uploadFile('resume/upload/', resumeFile);

      //const response = await axios.get('http://localhost:8000/process');
      const response = await axios.get('http://localhost:8000/process/process/');

      setResult(response.data.combined_text);
    } catch (error: any) {
      setResult(error.response?.data?.error || 'Error processing files.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-bg">
      <header className="site-header">
        <h1 className="brand-logo">JobFit <span>Analyzer</span></h1>
        <p className="tagline">AI-powered Resume and JD Matching</p>
      </header>

      <div className="main-card">
        <div className="file-uploader">
          <label>Upload Job Description (PDF/DOCX):</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setJdFile(e.target.files?.[0] || null)}
          />
        </div>

        <div className="file-uploader">
          <label>Upload Resume (PDF/DOCX):</label>
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
          />
        </div>

        <button className="btn" onClick={handleProcess} disabled={loading}>
          {loading ? 'Processing...' : 'Check Compatibility'}
        </button>

        {result && (
          <div className="compatibility-report">
            <h3>Compatibility Report:</h3>
            <textarea value={result} rows={15} readOnly />
          </div>
        )}
      </div>

      <footer className="site-footer">
        &copy; {new Date().getFullYear()} JobFit Analyzer &nbsp;|&nbsp; Powered by AI Comparison
      </footer>
    </div>
  );
}

export default App;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [jdFile, setJdFile] = useState<File | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [result, setResult] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const uploadFile = async (endpoint: string, file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return axios.post(`http://localhost:8000/${endpoint}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   };

//   const handleProcess = async () => {
//     if (!jdFile || !resumeFile) {
//       alert('Please upload both JD and Resume!');
//       return;
//     }
//     setLoading(true);
//     setResult('');
//     try {
//       await uploadFile('upload-jd/', jdFile);
//       await uploadFile('upload-resume/', resumeFile);
//       const response = await axios.get('http://localhost:8000/process');
//       setResult(response.data.combined_text);
//     } catch (error: any) {
//       setResult(error.response?.data?.error || 'Error processing files.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="main-card">
//       <h1>JobFit Analyzer</h1>
      
//       <div className="file-uploader">
//         <label>Upload Job Description (PDF/DOCX):</label>
//         <input type="file" accept=".pdf,.docx" onChange={e => setJdFile(e.target.files?.[0] || null)} />
//       </div>
      
//       <div className="file-uploader">
//         <label>Upload Resume (PDF/DOCX):</label>
//         <input type="file" accept=".pdf,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
//       </div>
      
//       <button className="btn" onClick={handleProcess} disabled={loading}>
//         {loading ? 'Processing...' : 'Check Compatibility'}
//       </button>
      
//       {result && (
//         <div className="compatibility-report">
//           <h3>Compatibility Report:</h3>
//           <textarea value={result} rows={15} readOnly />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [jdFile, setJdFile] = useState<File | null>(null);
//   const [resumeFile, setResumeFile] = useState<File | null>(null);
//   const [result, setResult] = useState<string>('');
//   const [loading, setLoading] = useState(false);

//   const uploadFile = async (endpoint: string, file: File) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     return axios.post(`http://localhost:8000/${endpoint}`, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     });
//   };

//   const handleProcess = async () => {
//     if (!jdFile || !resumeFile) {
//       alert('Please upload both JD and Resume!');
//       return;
//     }
//     setLoading(true);
//     setResult('');
//     try {
//       await uploadFile('upload-jd/', jdFile);
//       await uploadFile('upload-resume/', resumeFile);
//       const response = await axios.get('http://localhost:8000/process');
//       setResult(response.data.combined_text);
//     } catch (error: any) {
//       setResult(error.response?.data?.error || 'Error processing files.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
//       <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>JobFit Analyzer</h1>

//       <div className="file-uploader">
//         <label>Upload Job Description (PDF/DOCX):</label>
//         <input type="file" accept=".pdf,.docx" onChange={e => setJdFile(e.target.files?.[0] || null)} />
//       </div>

//       <div className="file-uploader">
//         <label>Upload Resume (PDF/DOCX):</label>
//         <input type="file" accept=".pdf,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} />
//       </div>

//       <button className="btn" onClick={handleProcess} disabled={loading}>
//         {loading ? 'Processing...' : 'Check Compatibility'}
//       </button>

//       {result && (
//         <div className="compatibility-report" style={{ marginTop: 30 }}>
//           <h3>Compatibility Report:</h3>
//           <textarea value={result} rows={15} readOnly />
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
