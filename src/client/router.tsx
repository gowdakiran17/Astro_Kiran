import React, { Suspense } from 'react';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './lib/auth';

// Lazy-loaded pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignupPage = React.lazy(() => import('./pages/SignupPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const LogoutPage = React.lazy(() => import('./pages/LogoutPage'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function GuestRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const redirect = new URLSearchParams(location.search).get('_redirect') || '/';
  if (loading) return <LoadingFallback />;
  if (user) return <Navigate to={redirect} replace />;
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
}

function PrivateRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <LoadingFallback />;
  if (!user) return <Navigate to={`/login?_redirect=${encodeURIComponent(location.pathname)}`} replace />;
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Outlet />
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <GuestRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: '/signup',
    element: <GuestRoute />,
    children: [{ index: true, element: <SignupPage /> }],
  },
  {
    path: '/logout',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LogoutPage />
      </Suspense>
    ),
  },
  {
    element: <PrivateRoute />,
    children: [
      { path: '/', element: <DashboardPage /> },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
]);
