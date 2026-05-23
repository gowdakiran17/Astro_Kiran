import './index.css';
import React from 'react';
import { renderApp } from 'modelence/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

renderApp({
  loadingElement: (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
  routesElement: <RouterProvider router={router} />,
});
