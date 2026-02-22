import React from 'react';
import './CoinsSearch.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const CoinsSearch: React.FC<Props> = React.memo(({ value, onChange }) => (
  <div className="coins-search">
    <span className="coins-search__icon">🔍</span>
    <input
      className="coins-search__input"
      type="text"
      placeholder="Search a cryptocurrency..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button className="coins-search__clear" onClick={() => onChange('')}>
        ✕
      </button>
    )}
  </div>
));

CoinsSearch.displayName = 'CoinsSearch';
