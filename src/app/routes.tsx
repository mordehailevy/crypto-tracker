import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppShell } from '../components/layout';
import { HomePage } from '../features/home/HomePage';
import { ReportsPage } from '../features/reports/ReportsPage';
import { AiPage } from '../features/ai/AiPage';
import { AboutPage } from '../features/about/AboutPage';

export const AppRouter: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="ai" element={<AiPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
