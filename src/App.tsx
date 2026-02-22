import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { AppRouter } from './app/routes';
import { ErrorBoundary } from './components/common';

export const App: React.FC = () => (
  <ErrorBoundary>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </ErrorBoundary>
);
