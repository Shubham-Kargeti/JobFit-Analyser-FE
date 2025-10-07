import React from 'react';

interface LoadingButtonProps {
  loading: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading, onClick, children }) => (
  <button disabled={loading} onClick={onClick} className={`btn ${loading ? 'loading' : ''}`}>
    {loading ? 'Processing...' : children}
  </button>
);

export default LoadingButton;
