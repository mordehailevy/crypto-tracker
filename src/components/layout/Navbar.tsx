import React, { useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setSearchQuery } from '../../features/home/homeSlice';
import { selectSearchQuery } from '../../features/home/homeSelectors';
import './Navbar.css';

const IconMarket = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);

const IconLive = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
    <polyline points="7 10 10 7 13 10 17 6"/>
  </svg>
);

const IconAI = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a4 4 0 0 1 4 4v1h1a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3h-1v1a4 4 0 0 1-8 0v-1H7a3 3 0 0 1-3-3v-2a3 3 0 0 1 3-3h1V6a4 4 0 0 1 4-4z"/>
    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>
    <path d="M9 14s1 1 3 1 3-1 3-1"/>
  </svg>
);

const IconAbout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const links = [
  { to: '/', label: 'Market',      Icon: IconMarket },
  { to: '/reports', label: 'Live', Icon: IconLive,  badge: 'LIVE' },
  { to: '/ai', label: 'AI',        Icon: IconAI },
  { to: '/about', label: 'About',  Icon: IconAbout },
];

export const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(selectSearchQuery);

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(e.target.value)),
    [dispatch],
  );

  const clearSearch = useCallback(() => dispatch(setSearchQuery('')), [dispatch]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-brand-logo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="url(#goldRing)" strokeWidth="1.5"/>
            <path d="M9 7h4.5a2.5 2.5 0 0 1 0 5H9m0-5v10m0-5h5a2.5 2.5 0 0 1 0 5H9" stroke="url(#goldStroke)" strokeWidth="1.8" strokeLinecap="round"/>
            <defs>
              <linearGradient id="goldRing" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#f0b90b"/>
                <stop offset="100%" stopColor="#ffd15c"/>
              </linearGradient>
              <linearGradient id="goldStroke" x1="9" y1="7" x2="15" y2="17" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ffd15c"/>
                <stop offset="100%" stopColor="#f0b90b"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="navbar-brand-text">Crypto<span className="accent">Tracker</span></span>
      </div>

      {/* ── Search box inside Navbar ── */}
      <div className="navbar-search">
        <span className="navbar-search-icon">🔍</span>
        <input
          className="navbar-search-input"
          type="text"
          placeholder="Search coin..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {searchQuery && (
          <button className="navbar-search-clear" onClick={clearSearch}>✕</button>
        )}
      </div>

      <ul className="navbar-links">
        {links.map(({ to, label, Icon, badge }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <span className="nav-link-icon"><Icon /></span>
              <span className="nav-link-label">{label}</span>
              {badge && <span className="nav-badge">{badge}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
