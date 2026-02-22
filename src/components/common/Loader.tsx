import React from 'react';
import './Loader.css';

export const Loader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="loader-container">
    <div className="loader-spinner" />
    <p className="loader-text">{text}</p>
  </div>
);
