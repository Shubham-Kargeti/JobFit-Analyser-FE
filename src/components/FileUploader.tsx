import React from 'react';

interface FileUploaderProps {
  label: string;
  accept: string;
  onFileChange: (file: File | null) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ label, accept, onFileChange }) => (
  <div className="file-uploader">
    <label>{label}</label>
    <input type="file" accept={accept} onChange={(e) => onFileChange(e.target.files?.[0] || null)} />
  </div>
);

export default FileUploader;
