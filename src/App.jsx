import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import FeaturesPage from '@/pages/FeaturesPage';
import PricingPage from '@/pages/PricingPage';
import EnterprisePage from '@/pages/EnterprisePage';
import ResourcesPage from '@/pages/ResourcesPage';
import SignInPage from '@/pages/SignInPage';
import SignUpPage from '@/pages/SignUpPage';

import Layout from '@/components/Layout';
import DashboardLayout from '@/components/DashboardLayout'; 
import ProtectedRoute from '@/components/ProtectedRoute';

import DashboardOverviewPage from '@/pages/dashboard/DashboardOverviewPage';
import VideosPage from '@/pages/dashboard/VideosPage';
import CalendarPage from '@/pages/dashboard/CalendarPage';
import InvitationsPage from '@/pages/dashboard/InvitationsPage';
import ChatSupportPage from '@/pages/dashboard/ChatSupportPage';
import UploadPage from '@/pages/dashboard/UploadPage';
import DownloadsPage from '@/pages/dashboard/DownloadsPage';
import SettingsPage from '@/pages/dashboard/SettingsPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="enterprise" element={<EnterprisePage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverviewPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="invitations" element={<InvitationsPage />} />
          <Route path="chat" element={<ChatSupportPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;