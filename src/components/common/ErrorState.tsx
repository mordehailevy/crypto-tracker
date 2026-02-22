import React from 'react';
import './ErrorState.css';

interface Props {
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<Props> = ({ message, onRetry }) => (
  <div className="error-state">
    <span className="error-icon">⚠️</span>
    <p className="error-message">{message}</p>
    {onRetry && (
      <button className="error-retry-btn" onClick={onRetry}>
        Retry
      </button>
    )}
  </div>
);
