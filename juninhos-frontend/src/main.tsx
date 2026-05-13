import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import { ModalProvider } from './context/ModalContext';
import { LoginPage } from './pages/LoginPage';
import { PortalPage } from './pages/PortalPage';
import { PortalPreviewPage } from './pages/PortalPreviewPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import './styles/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LoadingProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="/portal"
                element={
                  <ProtectedRoute>
                    <PortalPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/portal/preview" element={<PortalPreviewPage />} />
            </Routes>
          </ModalProvider>
        </LoadingProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
