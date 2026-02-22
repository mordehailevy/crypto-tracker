import React from 'react';
import { useLiveReports } from './hooks/useLiveReports';
import { ReportsChart } from './components/ReportsChart';
import { EmptyState, ErrorState } from '../../components/common';
import './ReportsPage.css';

export const ReportsPage: React.FC = () => {
  const { history, isPolling, error, selectedSymbols } = useLiveReports();

  if (selectedSymbols.length === 0) {
    return (
      <div className="reports-page">
        <div className="reports-header">
          <div className="reports-header-left">
            <h1 className="reports-title">📊 Live Reports</h1>
            <p className="reports-subtitle">Live price charts</p>
          </div>
        </div>
        <div className="reports-empty">
          <div className="reports-empty-icon">📊</div>
          <EmptyState text="Select cryptocurrencies on the Market page to view their chart here." />
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page">
      <div className="reports-header">
        <div className="reports-header-left">
          <h1 className="reports-title">📊 Live Reports</h1>
          <p className="reports-subtitle">{selectedSymbols.length} coin(s) tracked</p>
        </div>
        <div className="reports-live-badge">
          <span className="reports-live-dot" />
          {isPolling ? 'LIVE' : 'PAUSED'}
        </div>
      </div>

      {error && <ErrorState message={error} />}

      <ReportsChart history={history} coinSymbols={selectedSymbols} />
    </div>
  );
};
