import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import UploadForm from './components/UploadForm';
import Result from './components/Result';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<UploadForm />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;