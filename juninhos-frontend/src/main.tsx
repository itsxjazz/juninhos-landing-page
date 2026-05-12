import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { LoadingProvider } from './context/LoadingContext';
import { ModalProvider } from './context/ModalContext';
import './styles/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

createRoot(rootEl).render(
  <StrictMode>
    <LoadingProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </LoadingProvider>
  </StrictMode>,
);
