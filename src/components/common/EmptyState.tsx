import React from 'react';

interface Props {
  text?: string;
}

export const EmptyState: React.FC<Props> = ({ text = 'No results.' }) => (
  <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
    <span style={{ fontSize: '2.5rem' }}>📭</span>
    <p style={{ marginTop: '0.5rem' }}>{text}</p>
  </div>
);
