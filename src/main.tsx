import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App.tsx';
import NewsPage from './NewsPage.tsx';
import NewsDetailPage from './NewsDetailPage.tsx';
import UseCasePage from './UseCasePage.tsx';
import UseCaseDetailPage from './UseCaseDetailPage.tsx';
import MultiAgentPlatformPage from './MultiAgentPlatformPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import { AGENT_PAGE_CONFIG, SOLUTION_PAGE_CONFIG } from '@/context/platform/platform-data-test';
import { ProductsProvider } from '@/context/platform/ProductsContext';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProductsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/platform" element={<Navigate to="/platform/agents" replace />} />
          <Route path="/platform/agents" element={<MultiAgentPlatformPage config={AGENT_PAGE_CONFIG} activePage="agents" />} />
          <Route path="/platform/solutions" element={<MultiAgentPlatformPage config={SOLUTION_PAGE_CONFIG} activePage="solutions" />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
          <Route path="/use-cases" element={<UseCasePage />} />
          <Route path="/use-cases/:id" element={<UseCaseDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ProductsProvider>
  </StrictMode>,
);
