import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PortalPage } from './pages/PortalPage';
import InvestigationPage from './pages/InvestigationPage';
import StoryPage from './pages/StoryPage';
import './styles/portal.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoryPage />} />
        <Route path="/overview" element={<PortalPage />} />
        <Route path="/agencies" element={<PortalPage />} />
        <Route path="/agency/:agencyId" element={<PortalPage />} />
        <Route path="/agency/:agencyId/:programId" element={<PortalPage />} />
        <Route path="/absorption" element={<PortalPage />} />
        <Route path="/augmentations" element={<PortalPage />} />
        <Route path="/year/:yearId" element={<PortalPage />} />
        <Route path="/search" element={<PortalPage />} />
        <Route path="/investigation" element={<InvestigationPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
